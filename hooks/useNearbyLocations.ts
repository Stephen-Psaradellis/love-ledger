/**
 * React hook for fetching nearby locations using PostGIS geospatial queries.
 *
 * This hook provides a convenient way to fetch locations near a given coordinate
 * with automatic loading states, error handling, and debouncing for map pan events.
 *
 * @module hooks/useNearbyLocations
 */

'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  fetchNearbyLocations,
  fetchLocationsWithActivePosts,
  DEFAULT_RADIUS_METERS,
  GeoError,
  isValidCoordinates,
} from '@/lib/utils/geo'
import type {
  Coordinates,
  LocationWithDistance,
  LocationWithActivePosts,
} from '@/types/database'

// ============================================================================
// Constants
// ============================================================================

/** Default debounce delay in milliseconds for coordinate updates */
const DEFAULT_DEBOUNCE_MS = 300

// ============================================================================
// Types
// ============================================================================

/**
 * Options for the useNearbyLocations hook
 */
export interface UseNearbyLocationsOptions {
  /** Search radius in meters (default: 5000 = 5km) */
  radiusMeters?: number
  /** Maximum number of results to return (default: 50) */
  maxResults?: number
  /** Debounce delay in milliseconds for coordinate updates (default: 300ms) */
  debounceMs?: number
  /** Whether to fetch automatically when coordinates change (default: true) */
  enabled?: boolean
  /** Only fetch locations with active posts (default: false) */
  withActivePosts?: boolean
  /** Minimum post count when withActivePosts is true (default: 1) */
  minPostCount?: number
}

/**
 * Result type for locations without active posts filter
 */
export interface UseNearbyLocationsResult<T = LocationWithDistance> {
  /** Array of nearby locations with distance information */
  locations: T[]
  /** Whether a fetch is currently in progress */
  isLoading: boolean
  /** Error object if the fetch failed */
  error: GeoError | null
  /** Function to manually trigger a refetch */
  refetch: () => Promise<void>
  /** Timestamp of the last successful fetch */
  lastFetchedAt: number | null
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * React hook for fetching nearby locations with geospatial queries.
 *
 * Features:
 * - Automatic fetching when coordinates change
 * - Debouncing for map pan events to prevent excessive API calls
 * - Loading and error states
 * - Manual refetch capability
 * - Support for filtering by active posts
 *
 * @param coordinates - User's current coordinates, or null if not available
 * @param options - Configuration options for the hook
 * @returns Object containing locations, loading state, error, and refetch function
 *
 * @example
 * // Basic usage
 * const { locations, isLoading, error } = useNearbyLocations({
 *   latitude: 37.7749,
 *   longitude: -122.4194
 * })
 *
 * @example
 * // With custom radius and active posts filter
 * const { locations, refetch } = useNearbyLocations(
 *   { latitude: 37.7749, longitude: -122.4194 },
 *   { radiusMeters: 10000, withActivePosts: true, minPostCount: 2 }
 * )
 */
export function useNearbyLocations(
  coordinates: Coordinates | null,
  options: UseNearbyLocationsOptions & { withActivePosts: true }
): UseNearbyLocationsResult<LocationWithActivePosts>

export function useNearbyLocations(
  coordinates: Coordinates | null,
  options?: UseNearbyLocationsOptions & { withActivePosts?: false }
): UseNearbyLocationsResult<LocationWithDistance>

export function useNearbyLocations(
  coordinates: Coordinates | null,
  options: UseNearbyLocationsOptions = {}
): UseNearbyLocationsResult<LocationWithDistance | LocationWithActivePosts> {
  const {
    radiusMeters = DEFAULT_RADIUS_METERS,
    maxResults = 50,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    enabled = true,
    withActivePosts = false,
    minPostCount = 1,
  } = options

  // State
  const [locations, setLocations] = useState<
    (LocationWithDistance | LocationWithActivePosts)[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<GeoError | null>(null)
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null)

  // Refs for cleanup and debouncing
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const supabaseRef = useRef(createClient())

  // Memoize the coordinate values to prevent unnecessary effect triggers
  const memoizedCoordinates = useMemo(() => {
    if (!coordinates) return null
    if (!isValidCoordinates(coordinates)) return null
    return {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    }
  }, [coordinates?.latitude, coordinates?.longitude])

  /**
   * Core fetch function that calls the geospatial API
   */
  const fetchLocations = useCallback(async () => {
    if (!memoizedCoordinates) {
      setLocations([])
      return
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      const params = {
        user_lat: memoizedCoordinates.latitude,
        user_lon: memoizedCoordinates.longitude,
        radius_meters: radiusMeters,
        max_results: maxResults,
      }

      let result: (LocationWithDistance | LocationWithActivePosts)[]

      if (withActivePosts) {
        result = await fetchLocationsWithActivePosts(supabaseRef.current, {
          ...params,
          min_post_count: minPostCount,
        })
      } else {
        result = await fetchNearbyLocations(supabaseRef.current, params)
      }

      // Only update state if this request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setLocations(result)
        setLastFetchedAt(Date.now())
      }
    } catch (err) {
      // Don't update state if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (err instanceof GeoError) {
        setError(err)
      } else {
        setError(
          new GeoError(
            'NETWORK_ERROR',
            err instanceof Error ? err.message : 'An unknown error occurred',
            err
          )
        )
      }
      setLocations([])
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [
    memoizedCoordinates,
    radiusMeters,
    maxResults,
    withActivePosts,
    minPostCount,
  ])

  /**
   * Debounced fetch handler - waits for coordinate changes to settle
   * before triggering a fetch (useful for map pan events)
   */
  const debouncedFetch = useCallback(() => {
    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set a new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      fetchLocations()
    }, debounceMs)
  }, [fetchLocations, debounceMs])

  /**
   * Manual refetch function - bypasses debouncing
   */
  const refetch = useCallback(async () => {
    // Clear any pending debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    await fetchLocations()
  }, [fetchLocations])

  // Effect: Fetch when coordinates or options change (debounced)
  useEffect(() => {
    if (!enabled) {
      return
    }

    if (!memoizedCoordinates) {
      setLocations([])
      setError(null)
      return
    }

    debouncedFetch()

    // Cleanup: cancel debounce timer and abort any in-flight request
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [memoizedCoordinates, enabled, debouncedFetch])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    locations,
    isLoading,
    error,
    refetch,
    lastFetchedAt,
  }
}

export default useNearbyLocations
