/**
 * Geospatial Utility Functions for Love Ledger
 *
 * This module provides helper functions for geospatial calculations and
 * Supabase RPC calls to PostGIS-powered database functions.
 *
 * ## Architecture Overview
 *
 * The geospatial system uses PostGIS extensions in Supabase/PostgreSQL to enable
 * efficient proximity-based location queries. Key components:
 *
 * 1. **Database Layer**: PostgreSQL functions using ST_DWithin for spatial queries
 *    - `get_nearby_locations`: Returns all locations within a radius
 *    - `get_locations_with_active_posts`: Returns locations with active posts
 *
 * 2. **TypeScript Layer** (this module):
 *    - Validation functions for coordinates and radius
 *    - RPC wrappers with proper error handling
 *    - Distance conversion utilities
 *
 * 3. **React Hooks Layer**: See `hooks/useNearbyLocations.ts`
 *
 * ## Performance Characteristics
 *
 * The database uses a GIST spatial index (`locations_geo_idx`) which provides:
 * - **O(log n)** query complexity instead of O(n) for bounding box queries
 * - Efficient radius-based searches using ST_DWithin
 * - Accurate meter-based distance calculations using geography type
 *
 * The index expression: `GIST (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326))`
 *
 * ## Coordinate System
 *
 * All coordinates use **SRID 4326 (WGS 84)**, the standard GPS coordinate system:
 * - Latitude: -90 to +90 (degrees, positive = North)
 * - Longitude: -180 to +180 (degrees, positive = East)
 *
 * ## Usage Example
 *
 * ```typescript
 * import { createClient } from '@/lib/supabase/client'
 * import { fetchNearbyLocations, fetchLocationsWithActivePosts } from '@/lib/utils/geo'
 *
 * const supabase = createClient()
 *
 * // Fetch all locations within 5km
 * const allNearby = await fetchNearbyLocations(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: 5000,
 *   max_results: 50
 * })
 *
 * // Fetch only locations with active posts (for map markers)
 * const withPosts = await fetchLocationsWithActivePosts(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: 5000,
 *   min_post_count: 1,
 *   max_results: 50
 * })
 * ```
 *
 * @module lib/utils/geo
 * @see {@link hooks/useNearbyLocations} React hook for component integration
 * @see {@link supabase/migrations/003_geospatial_functions.sql} Database functions
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Coordinates,
  LocationWithDistance,
  LocationWithActivePosts,
  NearbyLocationParams,
  LocationsWithActivePostsParams,
} from '@/types/database'

// ============================================================================
// Constants
// ============================================================================

/**
 * Default search radius in meters (5km).
 *
 * This value balances between showing enough nearby locations for user
 * convenience while maintaining query performance. Can be overridden
 * per-query via the radius_meters parameter.
 *
 * @constant {number}
 */
export const DEFAULT_RADIUS_METERS = 5000

/**
 * Default maximum number of results returned by geospatial queries.
 *
 * Limits prevent memory issues when querying dense urban areas.
 * Results are always ordered by distance (closest first).
 *
 * @constant {number}
 */
export const DEFAULT_MAX_RESULTS = 50

/**
 * Default minimum post count for active posts query.
 *
 * When fetching locations for map markers, only locations with at least
 * this many active posts will be included in results.
 *
 * @constant {number}
 */
export const DEFAULT_MIN_POST_COUNT = 1

/**
 * Valid latitude range for WGS 84 coordinate system.
 *
 * Latitude measures north-south position:
 * - +90° is the North Pole
 * - 0° is the Equator
 * - -90° is the South Pole
 *
 * @constant {{ min: -90, max: 90 }}
 */
export const LATITUDE_RANGE = { min: -90, max: 90 } as const

/**
 * Valid longitude range for WGS 84 coordinate system.
 *
 * Longitude measures east-west position:
 * - +180° is the International Date Line (east approach)
 * - 0° is the Prime Meridian (Greenwich, UK)
 * - -180° is the International Date Line (west approach)
 *
 * @constant {{ min: -180, max: 180 }}
 */
export const LONGITUDE_RANGE = { min: -180, max: 180 } as const

// ============================================================================
// Error Types
// ============================================================================

/**
 * Error codes for geospatial operations.
 *
 * These codes allow calling code to handle specific error types appropriately:
 *
 * - `INVALID_COORDINATES`: Latitude or longitude values are out of range
 * - `INVALID_RADIUS`: Radius is not a positive finite number
 * - `DATABASE_ERROR`: PostGIS function call failed (check details for Supabase error)
 * - `NETWORK_ERROR`: Network request failed (connection issues, timeouts)
 *
 * @example
 * ```typescript
 * try {
 *   const locations = await fetchNearbyLocations(supabase, params)
 * } catch (error) {
 *   if (error instanceof GeoError) {
 *     switch (error.code) {
 *       case 'INVALID_COORDINATES':
 *         console.error('Bad coordinates:', error.message)
 *         break
 *       case 'DATABASE_ERROR':
 *         console.error('Database error:', error.details)
 *         break
 *     }
 *   }
 * }
 * ```
 */
export type GeoErrorCode =
  | 'INVALID_COORDINATES'
  | 'INVALID_RADIUS'
  | 'DATABASE_ERROR'
  | 'NETWORK_ERROR'

/**
 * Custom error class for geospatial operations.
 *
 * Extends the standard Error class with:
 * - `code`: Typed error code for programmatic handling
 * - `details`: Optional additional information (e.g., Supabase error object)
 *
 * @example
 * ```typescript
 * throw new GeoError(
 *   'INVALID_COORDINATES',
 *   'Latitude must be between -90 and 90',
 *   { latitude: 95 }
 * )
 * ```
 */
export class GeoError extends Error {
  /** Typed error code for programmatic error handling */
  readonly code: GeoErrorCode

  /** Additional error details (e.g., original database error) */
  readonly details?: unknown

  constructor(code: GeoErrorCode, message: string, details?: unknown) {
    super(message)
    this.name = 'GeoError'
    this.code = code
    this.details = details
    Object.setPrototypeOf(this, GeoError.prototype)
  }
}

// ============================================================================
// Validation Functions
// ============================================================================
//
// These functions validate geographic coordinates and query parameters before
// making database calls. They prevent invalid queries and provide clear error
// messages for debugging.
//
// Public validators return boolean (for conditional checks).
// Private validators throw GeoError (for fail-fast behavior).
// ============================================================================

/**
 * Validates a latitude value.
 *
 * @param latitude - The latitude value to validate
 * @returns true if valid, false otherwise
 *
 * @example
 * isValidLatitude(37.7749)  // true
 * isValidLatitude(-91)      // false
 * isValidLatitude(NaN)      // false
 */
export function isValidLatitude(latitude: number): boolean {
  return (
    typeof latitude === 'number' &&
    !Number.isNaN(latitude) &&
    latitude >= LATITUDE_RANGE.min &&
    latitude <= LATITUDE_RANGE.max
  )
}

/**
 * Validates a longitude value.
 *
 * @param longitude - The longitude value to validate
 * @returns true if valid, false otherwise
 *
 * @example
 * isValidLongitude(-122.4194)  // true
 * isValidLongitude(181)        // false
 * isValidLongitude(NaN)        // false
 */
export function isValidLongitude(longitude: number): boolean {
  return (
    typeof longitude === 'number' &&
    !Number.isNaN(longitude) &&
    longitude >= LONGITUDE_RANGE.min &&
    longitude <= LONGITUDE_RANGE.max
  )
}

/**
 * Validates coordinate values.
 *
 * @param coordinates - The coordinates to validate
 * @returns true if both latitude and longitude are valid
 *
 * @example
 * isValidCoordinates({ latitude: 37.7749, longitude: -122.4194 })  // true
 * isValidCoordinates({ latitude: 91, longitude: -122.4194 })       // false
 */
export function isValidCoordinates(coordinates: Coordinates): boolean {
  return (
    isValidLatitude(coordinates.latitude) &&
    isValidLongitude(coordinates.longitude)
  )
}

/**
 * Validates a radius value in meters.
 *
 * @param radius - The radius value to validate
 * @returns true if radius is a positive finite number
 *
 * @example
 * isValidRadius(5000)  // true
 * isValidRadius(-100)  // false
 * isValidRadius(0)     // false
 */
export function isValidRadius(radius: number): boolean {
  return (
    typeof radius === 'number' &&
    !Number.isNaN(radius) &&
    Number.isFinite(radius) &&
    radius > 0
  )
}

/**
 * Validates and throws if coordinates are invalid.
 *
 * @param coordinates - The coordinates to validate
 * @throws {GeoError} If coordinates are invalid
 */
function assertValidCoordinates(coordinates: Coordinates): void {
  if (!isValidLatitude(coordinates.latitude)) {
    throw new GeoError(
      'INVALID_COORDINATES',
      `Invalid latitude: ${coordinates.latitude}. Must be between ${LATITUDE_RANGE.min} and ${LATITUDE_RANGE.max}.`
    )
  }
  if (!isValidLongitude(coordinates.longitude)) {
    throw new GeoError(
      'INVALID_COORDINATES',
      `Invalid longitude: ${coordinates.longitude}. Must be between ${LONGITUDE_RANGE.min} and ${LONGITUDE_RANGE.max}.`
    )
  }
}

/**
 * Validates and throws if radius is invalid.
 *
 * @param radius - The radius to validate
 * @throws {GeoError} If radius is invalid
 */
function assertValidRadius(radius: number): void {
  if (!isValidRadius(radius)) {
    throw new GeoError(
      'INVALID_RADIUS',
      `Invalid radius: ${radius}. Must be a positive number.`
    )
  }
}

// ============================================================================
// Supabase RPC Functions
// ============================================================================

/**
 * Fetches nearby locations using the PostGIS-powered database function.
 *
 * ## Performance
 *
 * This function calls the `get_nearby_locations` PostgreSQL function which:
 * - Uses **ST_DWithin** with geography type for accurate meter-based radius queries
 * - Leverages the **GIST spatial index** for O(log n) query complexity
 * - Returns results ordered by distance (closest first)
 *
 * Typical query times:
 * - < 10ms for 1,000 locations
 * - < 50ms for 100,000 locations
 *
 * ## Database Function
 *
 * Calls: `get_nearby_locations(user_lat, user_lon, radius_meters, max_results)`
 *
 * The database function creates a geography point and uses ST_DWithin to find
 * all locations within the specified radius, then calculates exact distances
 * using ST_Distance for ordering.
 *
 * @param supabase - Supabase client instance (from createClient())
 * @param params - Query parameters
 * @param params.user_lat - User's latitude (-90 to 90)
 * @param params.user_lon - User's longitude (-180 to 180)
 * @param params.radius_meters - Search radius in meters (default: 5000)
 * @param params.max_results - Maximum results to return (default: 50)
 * @returns Promise resolving to array of locations with distance_meters field
 * @throws {GeoError} INVALID_COORDINATES if lat/lon are out of range
 * @throws {GeoError} INVALID_RADIUS if radius is not positive
 * @throws {GeoError} DATABASE_ERROR if Supabase RPC call fails
 *
 * @example
 * ```typescript
 * import { createClient } from '@/lib/supabase/client'
 * import { fetchNearbyLocations } from '@/lib/utils/geo'
 *
 * const supabase = createClient()
 *
 * // Basic usage - find locations within 5km
 * const locations = await fetchNearbyLocations(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 * })
 *
 * // Custom radius and limit
 * const nearestThree = await fetchNearbyLocations(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: 1000,  // 1km radius
 *   max_results: 3        // Only top 3
 * })
 *
 * // Access distance information
 * locations.forEach(loc => {
 *   console.log(`${loc.name}: ${loc.distance_meters.toFixed(0)}m away`)
 * })
 * ```
 *
 * @see {@link fetchLocationsWithActivePosts} For map marker display (only locations with posts)
 * @see {@link hooks/useNearbyLocations} React hook for component integration
 */
export async function fetchNearbyLocations(
  supabase: SupabaseClient,
  params: NearbyLocationParams
): Promise<LocationWithDistance[]> {
  // Validate inputs
  assertValidCoordinates({
    latitude: params.user_lat,
    longitude: params.user_lon,
  })

  const radiusMeters = params.radius_meters ?? DEFAULT_RADIUS_METERS
  assertValidRadius(radiusMeters)

  const maxResults = params.max_results ?? DEFAULT_MAX_RESULTS

  // Call the PostGIS function via RPC
  const { data, error } = await supabase.rpc('get_nearby_locations', {
    user_lat: params.user_lat,
    user_lon: params.user_lon,
    radius_meters: radiusMeters,
    max_results: maxResults,
  })

  if (error) {
    throw new GeoError(
      'DATABASE_ERROR',
      `Failed to fetch nearby locations: ${error.message}`,
      error
    )
  }

  return (data ?? []) as LocationWithDistance[]
}

/**
 * Fetches nearby locations that have active posts, optimized for map marker display.
 *
 * This function is ideal for rendering map markers as it only returns locations
 * that have content worth displaying, reducing map clutter and improving UX.
 *
 * ## Performance
 *
 * This function calls the `get_locations_with_active_posts` PostgreSQL function which:
 * - Uses **ST_DWithin** with geography type for accurate meter-based radius queries
 * - Leverages the **GIST spatial index** for O(log n) query complexity
 * - Joins with the `posts` table to filter and count active posts
 * - Returns results ordered by distance (closest first)
 *
 * The query is slightly slower than `fetchNearbyLocations` due to the posts join,
 * but still efficient due to proper indexing.
 *
 * ## Active Post Definition
 *
 * A post is considered "active" when:
 * - `is_active = TRUE`
 * - `expires_at > NOW()` (not expired)
 *
 * ## Database Function
 *
 * Calls: `get_locations_with_active_posts(user_lat, user_lon, radius_meters, min_post_count, max_results)`
 *
 * @param supabase - Supabase client instance (from createClient())
 * @param params - Query parameters
 * @param params.user_lat - User's latitude (-90 to 90)
 * @param params.user_lon - User's longitude (-180 to 180)
 * @param params.radius_meters - Search radius in meters (default: 5000)
 * @param params.min_post_count - Minimum active posts required (default: 1)
 * @param params.max_results - Maximum results to return (default: 50)
 * @returns Promise resolving to array of locations with active_post_count and distance_meters
 * @throws {GeoError} INVALID_COORDINATES if lat/lon are out of range
 * @throws {GeoError} INVALID_RADIUS if radius is not positive
 * @throws {GeoError} DATABASE_ERROR if Supabase RPC call fails
 *
 * @example
 * ```typescript
 * import { createClient } from '@/lib/supabase/client'
 * import { fetchLocationsWithActivePosts, formatDistance } from '@/lib/utils/geo'
 *
 * const supabase = createClient()
 *
 * // Fetch locations with at least 1 active post
 * const markers = await fetchLocationsWithActivePosts(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: 5000,
 * })
 *
 * // Render map markers with post count badges
 * markers.forEach(loc => {
 *   renderMarker({
 *     lat: loc.latitude,
 *     lng: loc.longitude,
 *     title: loc.name,
 *     badge: loc.active_post_count,
 *     subtitle: formatDistance(loc.distance_meters)
 *   })
 * })
 *
 * // Only show "hot" locations (3+ posts)
 * const hotSpots = await fetchLocationsWithActivePosts(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: 10000,  // Wider search
 *   min_post_count: 3      // At least 3 active posts
 * })
 * ```
 *
 * @see {@link fetchNearbyLocations} For fetching all locations regardless of posts
 * @see {@link hooks/useNearbyLocations} React hook with `withActivePosts: true` option
 */
export async function fetchLocationsWithActivePosts(
  supabase: SupabaseClient,
  params: LocationsWithActivePostsParams
): Promise<LocationWithActivePosts[]> {
  // Validate inputs
  assertValidCoordinates({
    latitude: params.user_lat,
    longitude: params.user_lon,
  })

  const radiusMeters = params.radius_meters ?? DEFAULT_RADIUS_METERS
  assertValidRadius(radiusMeters)

  const minPostCount = params.min_post_count ?? DEFAULT_MIN_POST_COUNT
  const maxResults = params.max_results ?? DEFAULT_MAX_RESULTS

  // Call the PostGIS function via RPC
  const { data, error } = await supabase.rpc('get_locations_with_active_posts', {
    user_lat: params.user_lat,
    user_lon: params.user_lon,
    radius_meters: radiusMeters,
    min_post_count: minPostCount,
    max_results: maxResults,
  })

  if (error) {
    throw new GeoError(
      'DATABASE_ERROR',
      `Failed to fetch locations with active posts: ${error.message}`,
      error
    )
  }

  return (data ?? []) as LocationWithActivePosts[]
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Converts kilometers to meters.
 *
 * Useful when users input distance in km but the API requires meters.
 *
 * @param km - Distance in kilometers
 * @returns Distance in meters
 *
 * @example
 * ```typescript
 * import { fetchNearbyLocations, kmToMeters } from '@/lib/utils/geo'
 *
 * // User wants 10km radius
 * const userRadiusKm = 10
 * const locations = await fetchNearbyLocations(supabase, {
 *   user_lat: 37.7749,
 *   user_lon: -122.4194,
 *   radius_meters: kmToMeters(userRadiusKm)  // 10000
 * })
 * ```
 */
export function kmToMeters(km: number): number {
  return km * 1000
}

/**
 * Converts meters to kilometers.
 *
 * Useful when displaying distances to users in a more readable format.
 *
 * @param meters - Distance in meters
 * @returns Distance in kilometers
 *
 * @example
 * ```typescript
 * const location = locations[0]
 * console.log(`Distance: ${metersToKm(location.distance_meters)} km`)
 * // Distance: 2.5 km
 * ```
 */
export function metersToKm(meters: number): number {
  return meters / 1000
}

/**
 * Formats a distance value for user-friendly display.
 *
 * Automatically chooses the best unit:
 * - Distances < 1000m are shown in meters (rounded to whole numbers)
 * - Distances >= 1000m are shown in kilometers (1 decimal place)
 *
 * @param meters - Distance in meters (typically from distance_meters field)
 * @returns Formatted string with unit suffix (e.g., "500m" or "2.5km")
 *
 * @example
 * ```typescript
 * import { formatDistance } from '@/lib/utils/geo'
 *
 * // In a React component
 * function LocationCard({ location }: { location: LocationWithDistance }) {
 *   return (
 *     <div>
 *       <h3>{location.name}</h3>
 *       <span className="text-muted">
 *         {formatDistance(location.distance_meters)} away
 *       </span>
 *     </div>
 *   )
 * }
 *
 * // Output examples:
 * formatDistance(150)    // "150m"
 * formatDistance(500)    // "500m"
 * formatDistance(999)    // "999m"
 * formatDistance(1000)   // "1.0km"
 * formatDistance(2500)   // "2.5km"
 * formatDistance(10750)  // "10.8km"
 * ```
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  const km = meters / 1000
  // Show 1 decimal place for km
  return `${km.toFixed(1)}km`
}
