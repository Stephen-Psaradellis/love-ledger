/**
 * Unit tests for geospatial utility functions
 *
 * These tests cover:
 * - Coordinate validation functions
 * - Radius validation
 * - Distance conversion utilities
 * - Supabase RPC wrapper functions (with mocks)
 * - Error handling scenarios
 *
 * To run tests:
 * 1. Install dependencies: npm install -D vitest @vitejs/plugin-react
 * 2. Add to package.json scripts: "test": "vitest", "test:run": "vitest run"
 * 3. Run: npm test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  // Constants
  DEFAULT_RADIUS_METERS,
  DEFAULT_MAX_RESULTS,
  DEFAULT_MIN_POST_COUNT,
  LATITUDE_RANGE,
  LONGITUDE_RANGE,
  // Validation functions
  isValidLatitude,
  isValidLongitude,
  isValidCoordinates,
  isValidRadius,
  // RPC functions
  fetchNearbyLocations,
  fetchLocationsWithActivePosts,
  // Utility functions
  kmToMeters,
  metersToKm,
  formatDistance,
  // Error class
  GeoError,
} from '@/lib/utils/geo'
import type { LocationWithDistance, LocationWithActivePosts } from '@/types/database'

// ============================================================================
// Mock Data
// ============================================================================

const mockLocationWithDistance: LocationWithDistance = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  name: 'Test Location',
  address: '123 Test St',
  latitude: 37.7879,
  longitude: -122.4074,
  place_types: ['restaurant', 'food'],
  post_count: 5,
  created_at: '2024-01-01T00:00:00.000Z',
  distance_meters: 500,
}

const mockLocationWithActivePosts: LocationWithActivePosts = {
  id: '123e4567-e89b-12d3-a456-426614174001',
  google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY5',
  name: 'Active Posts Location',
  address: '456 Test Ave',
  latitude: 37.7880,
  longitude: -122.4075,
  place_types: ['cafe', 'food'],
  post_count: 3,
  created_at: '2024-01-01T00:00:00.000Z',
  distance_meters: 750,
  active_post_count: 3,
}

// ============================================================================
// Constants Tests
// ============================================================================

describe('Constants', () => {
  it('should have correct default values', () => {
    expect(DEFAULT_RADIUS_METERS).toBe(5000)
    expect(DEFAULT_MAX_RESULTS).toBe(50)
    expect(DEFAULT_MIN_POST_COUNT).toBe(1)
  })

  it('should have correct latitude range', () => {
    expect(LATITUDE_RANGE.min).toBe(-90)
    expect(LATITUDE_RANGE.max).toBe(90)
  })

  it('should have correct longitude range', () => {
    expect(LONGITUDE_RANGE.min).toBe(-180)
    expect(LONGITUDE_RANGE.max).toBe(180)
  })
})

// ============================================================================
// Validation Functions Tests
// ============================================================================

describe('isValidLatitude', () => {
  it('should return true for valid latitudes', () => {
    expect(isValidLatitude(0)).toBe(true)
    expect(isValidLatitude(37.7749)).toBe(true)
    expect(isValidLatitude(-33.8688)).toBe(true)
    expect(isValidLatitude(90)).toBe(true)
    expect(isValidLatitude(-90)).toBe(true)
  })

  it('should return false for latitudes out of range', () => {
    expect(isValidLatitude(91)).toBe(false)
    expect(isValidLatitude(-91)).toBe(false)
    expect(isValidLatitude(180)).toBe(false)
    expect(isValidLatitude(-180)).toBe(false)
  })

  it('should return false for invalid values', () => {
    expect(isValidLatitude(NaN)).toBe(false)
    expect(isValidLatitude(Infinity)).toBe(false)
    expect(isValidLatitude(-Infinity)).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isValidLatitude(89.999999)).toBe(true)
    expect(isValidLatitude(-89.999999)).toBe(true)
  })
})

describe('isValidLongitude', () => {
  it('should return true for valid longitudes', () => {
    expect(isValidLongitude(0)).toBe(true)
    expect(isValidLongitude(-122.4194)).toBe(true)
    expect(isValidLongitude(151.2093)).toBe(true)
    expect(isValidLongitude(180)).toBe(true)
    expect(isValidLongitude(-180)).toBe(true)
  })

  it('should return false for longitudes out of range', () => {
    expect(isValidLongitude(181)).toBe(false)
    expect(isValidLongitude(-181)).toBe(false)
    expect(isValidLongitude(360)).toBe(false)
  })

  it('should return false for invalid values', () => {
    expect(isValidLongitude(NaN)).toBe(false)
    expect(isValidLongitude(Infinity)).toBe(false)
    expect(isValidLongitude(-Infinity)).toBe(false)
  })

  it('should handle edge cases', () => {
    expect(isValidLongitude(179.999999)).toBe(true)
    expect(isValidLongitude(-179.999999)).toBe(true)
  })
})

describe('isValidCoordinates', () => {
  it('should return true for valid coordinates', () => {
    expect(isValidCoordinates({ latitude: 37.7749, longitude: -122.4194 })).toBe(true)
    expect(isValidCoordinates({ latitude: 0, longitude: 0 })).toBe(true)
    expect(isValidCoordinates({ latitude: -33.8688, longitude: 151.2093 })).toBe(true)
  })

  it('should return false for invalid latitude', () => {
    expect(isValidCoordinates({ latitude: 91, longitude: -122.4194 })).toBe(false)
    expect(isValidCoordinates({ latitude: NaN, longitude: -122.4194 })).toBe(false)
  })

  it('should return false for invalid longitude', () => {
    expect(isValidCoordinates({ latitude: 37.7749, longitude: 181 })).toBe(false)
    expect(isValidCoordinates({ latitude: 37.7749, longitude: NaN })).toBe(false)
  })

  it('should return false when both are invalid', () => {
    expect(isValidCoordinates({ latitude: 91, longitude: 181 })).toBe(false)
    expect(isValidCoordinates({ latitude: NaN, longitude: NaN })).toBe(false)
  })
})

describe('isValidRadius', () => {
  it('should return true for valid radius values', () => {
    expect(isValidRadius(1)).toBe(true)
    expect(isValidRadius(100)).toBe(true)
    expect(isValidRadius(5000)).toBe(true)
    expect(isValidRadius(0.5)).toBe(true)
    expect(isValidRadius(50000)).toBe(true)
  })

  it('should return false for zero or negative radius', () => {
    expect(isValidRadius(0)).toBe(false)
    expect(isValidRadius(-1)).toBe(false)
    expect(isValidRadius(-100)).toBe(false)
  })

  it('should return false for invalid values', () => {
    expect(isValidRadius(NaN)).toBe(false)
    expect(isValidRadius(Infinity)).toBe(false)
    expect(isValidRadius(-Infinity)).toBe(false)
  })
})

// ============================================================================
// Distance Utility Functions Tests
// ============================================================================

describe('kmToMeters', () => {
  it('should convert kilometers to meters', () => {
    expect(kmToMeters(1)).toBe(1000)
    expect(kmToMeters(5)).toBe(5000)
    expect(kmToMeters(0.5)).toBe(500)
    expect(kmToMeters(10)).toBe(10000)
  })

  it('should handle zero', () => {
    expect(kmToMeters(0)).toBe(0)
  })

  it('should handle negative values', () => {
    expect(kmToMeters(-1)).toBe(-1000)
  })

  it('should handle decimal values', () => {
    expect(kmToMeters(2.5)).toBe(2500)
    expect(kmToMeters(0.001)).toBe(1)
  })
})

describe('metersToKm', () => {
  it('should convert meters to kilometers', () => {
    expect(metersToKm(1000)).toBe(1)
    expect(metersToKm(5000)).toBe(5)
    expect(metersToKm(500)).toBe(0.5)
    expect(metersToKm(10000)).toBe(10)
  })

  it('should handle zero', () => {
    expect(metersToKm(0)).toBe(0)
  })

  it('should handle negative values', () => {
    expect(metersToKm(-1000)).toBe(-1)
  })

  it('should handle decimal values', () => {
    expect(metersToKm(2500)).toBe(2.5)
    expect(metersToKm(1)).toBe(0.001)
  })
})

describe('formatDistance', () => {
  it('should format distances under 1km in meters', () => {
    expect(formatDistance(500)).toBe('500m')
    expect(formatDistance(100)).toBe('100m')
    expect(formatDistance(999)).toBe('999m')
    expect(formatDistance(1)).toBe('1m')
  })

  it('should format distances at or above 1km in kilometers', () => {
    expect(formatDistance(1000)).toBe('1.0km')
    expect(formatDistance(2500)).toBe('2.5km')
    expect(formatDistance(5000)).toBe('5.0km')
    expect(formatDistance(10000)).toBe('10.0km')
  })

  it('should round meter values', () => {
    expect(formatDistance(500.7)).toBe('501m')
    expect(formatDistance(500.3)).toBe('500m')
  })

  it('should show one decimal place for kilometers', () => {
    expect(formatDistance(1234)).toBe('1.2km')
    expect(formatDistance(1567)).toBe('1.6km')
    expect(formatDistance(2999)).toBe('3.0km')
  })

  it('should handle zero', () => {
    expect(formatDistance(0)).toBe('0m')
  })
})

// ============================================================================
// GeoError Class Tests
// ============================================================================

describe('GeoError', () => {
  it('should create error with correct properties', () => {
    const error = new GeoError('INVALID_COORDINATES', 'Invalid latitude')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(GeoError)
    expect(error.name).toBe('GeoError')
    expect(error.code).toBe('INVALID_COORDINATES')
    expect(error.message).toBe('Invalid latitude')
    expect(error.details).toBeUndefined()
  })

  it('should include details when provided', () => {
    const details = { latitude: 91, reason: 'out of range' }
    const error = new GeoError('INVALID_COORDINATES', 'Invalid latitude', details)

    expect(error.details).toEqual(details)
  })

  it('should support all error codes', () => {
    const codes = ['INVALID_COORDINATES', 'INVALID_RADIUS', 'DATABASE_ERROR', 'NETWORK_ERROR'] as const

    codes.forEach((code) => {
      const error = new GeoError(code, 'Test message')
      expect(error.code).toBe(code)
    })
  })
})

// ============================================================================
// Supabase RPC Functions Tests (with mocks)
// ============================================================================

describe('fetchNearbyLocations', () => {
  const createMockSupabaseClient = (rpcResponse: { data: unknown; error: unknown }) => {
    return {
      rpc: vi.fn().mockResolvedValue(rpcResponse),
    } as unknown as Parameters<typeof fetchNearbyLocations>[0]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch nearby locations successfully', async () => {
    const mockClient = createMockSupabaseClient({
      data: [mockLocationWithDistance],
      error: null,
    })

    const result = await fetchNearbyLocations(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
    })

    expect(result).toEqual([mockLocationWithDistance])
    expect(mockClient.rpc).toHaveBeenCalledWith('get_nearby_locations', {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: DEFAULT_RADIUS_METERS,
      max_results: DEFAULT_MAX_RESULTS,
    })
  })

  it('should use custom radius and max_results', async () => {
    const mockClient = createMockSupabaseClient({
      data: [mockLocationWithDistance],
      error: null,
    })

    await fetchNearbyLocations(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: 10000,
      max_results: 100,
    })

    expect(mockClient.rpc).toHaveBeenCalledWith('get_nearby_locations', {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: 10000,
      max_results: 100,
    })
  })

  it('should return empty array when no locations found', async () => {
    const mockClient = createMockSupabaseClient({
      data: null,
      error: null,
    })

    const result = await fetchNearbyLocations(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
    })

    expect(result).toEqual([])
  })

  it('should throw GeoError for invalid latitude', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 91,
        user_lon: -122.4074,
      })
    ).rejects.toThrow(GeoError)

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 91,
        user_lon: -122.4074,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })
  })

  it('should throw GeoError for invalid longitude', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: 181,
      })
    ).rejects.toThrow(GeoError)

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: 181,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })
  })

  it('should throw GeoError for invalid radius', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
        radius_meters: -100,
      })
    ).rejects.toThrow(GeoError)

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
        radius_meters: 0,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_RADIUS',
    })
  })

  it('should throw GeoError for database errors', async () => {
    const mockClient = createMockSupabaseClient({
      data: null,
      error: { message: 'Database connection failed' },
    })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
      })
    ).rejects.toThrow(GeoError)

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
      })
    ).rejects.toMatchObject({
      code: 'DATABASE_ERROR',
    })
  })

  it('should throw GeoError for NaN coordinates', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: NaN,
        user_lon: -122.4074,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })

    await expect(
      fetchNearbyLocations(mockClient, {
        user_lat: 37.7879,
        user_lon: NaN,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })
  })
})

describe('fetchLocationsWithActivePosts', () => {
  const createMockSupabaseClient = (rpcResponse: { data: unknown; error: unknown }) => {
    return {
      rpc: vi.fn().mockResolvedValue(rpcResponse),
    } as unknown as Parameters<typeof fetchLocationsWithActivePosts>[0]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch locations with active posts successfully', async () => {
    const mockClient = createMockSupabaseClient({
      data: [mockLocationWithActivePosts],
      error: null,
    })

    const result = await fetchLocationsWithActivePosts(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
    })

    expect(result).toEqual([mockLocationWithActivePosts])
    expect(mockClient.rpc).toHaveBeenCalledWith('get_locations_with_active_posts', {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: DEFAULT_RADIUS_METERS,
      min_post_count: DEFAULT_MIN_POST_COUNT,
      max_results: DEFAULT_MAX_RESULTS,
    })
  })

  it('should use custom parameters', async () => {
    const mockClient = createMockSupabaseClient({
      data: [mockLocationWithActivePosts],
      error: null,
    })

    await fetchLocationsWithActivePosts(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: 10000,
      min_post_count: 5,
      max_results: 25,
    })

    expect(mockClient.rpc).toHaveBeenCalledWith('get_locations_with_active_posts', {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: 10000,
      min_post_count: 5,
      max_results: 25,
    })
  })

  it('should return empty array when no locations found', async () => {
    const mockClient = createMockSupabaseClient({
      data: null,
      error: null,
    })

    const result = await fetchLocationsWithActivePosts(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
    })

    expect(result).toEqual([])
  })

  it('should throw GeoError for invalid coordinates', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchLocationsWithActivePosts(mockClient, {
        user_lat: 91,
        user_lon: -122.4074,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })

    await expect(
      fetchLocationsWithActivePosts(mockClient, {
        user_lat: 37.7879,
        user_lon: -181,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_COORDINATES',
    })
  })

  it('should throw GeoError for invalid radius', async () => {
    const mockClient = createMockSupabaseClient({ data: null, error: null })

    await expect(
      fetchLocationsWithActivePosts(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
        radius_meters: -500,
      })
    ).rejects.toMatchObject({
      code: 'INVALID_RADIUS',
    })
  })

  it('should throw GeoError for database errors', async () => {
    const mockClient = createMockSupabaseClient({
      data: null,
      error: { message: 'Function not found' },
    })

    await expect(
      fetchLocationsWithActivePosts(mockClient, {
        user_lat: 37.7879,
        user_lon: -122.4074,
      })
    ).rejects.toMatchObject({
      code: 'DATABASE_ERROR',
    })
  })
})

// ============================================================================
// Integration Test Scenarios (with mocks simulating real data)
// ============================================================================

describe('Integration scenarios', () => {
  const createMockSupabaseClient = (rpcResponse: { data: unknown; error: unknown }) => {
    return {
      rpc: vi.fn().mockResolvedValue(rpcResponse),
    } as unknown as Parameters<typeof fetchNearbyLocations>[0]
  }

  it('should handle multiple locations sorted by distance', async () => {
    const locations: LocationWithDistance[] = [
      { ...mockLocationWithDistance, id: '1', distance_meters: 100 },
      { ...mockLocationWithDistance, id: '2', distance_meters: 500 },
      { ...mockLocationWithDistance, id: '3', distance_meters: 1000 },
    ]

    const mockClient = createMockSupabaseClient({ data: locations, error: null })

    const result = await fetchNearbyLocations(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
    })

    expect(result).toHaveLength(3)
    expect(result[0].distance_meters).toBe(100)
    expect(result[2].distance_meters).toBe(1000)
  })

  it('should filter locations by radius', async () => {
    // Simulating database returning only locations within radius
    const locationsWithin1km: LocationWithDistance[] = [
      { ...mockLocationWithDistance, id: '1', distance_meters: 500 },
    ]

    const mockClient = createMockSupabaseClient({ data: locationsWithin1km, error: null })

    const result = await fetchNearbyLocations(mockClient, {
      user_lat: 37.7879,
      user_lon: -122.4074,
      radius_meters: 1000, // 1km
    })

    expect(result).toHaveLength(1)
    expect(result[0].distance_meters).toBeLessThan(1000)
  })

  it('should handle San Francisco test coordinates', async () => {
    // Test with the actual test seed data center point
    const sanFranciscoCenterLat = 37.7879
    const sanFranciscoCenterLon = -122.4074

    const mockClient = createMockSupabaseClient({
      data: [mockLocationWithDistance],
      error: null,
    })

    await fetchNearbyLocations(mockClient, {
      user_lat: sanFranciscoCenterLat,
      user_lon: sanFranciscoCenterLon,
      radius_meters: 5000,
    })

    expect(mockClient.rpc).toHaveBeenCalledWith(
      'get_nearby_locations',
      expect.objectContaining({
        user_lat: sanFranciscoCenterLat,
        user_lon: sanFranciscoCenterLon,
      })
    )
  })

  it('should work with edge case coordinates', async () => {
    const mockClient = createMockSupabaseClient({ data: [], error: null })

    // Test at the equator
    await fetchNearbyLocations(mockClient, {
      user_lat: 0,
      user_lon: 0,
    })

    // Test at max latitude
    await fetchNearbyLocations(mockClient, {
      user_lat: 90,
      user_lon: 0,
    })

    // Test at min latitude
    await fetchNearbyLocations(mockClient, {
      user_lat: -90,
      user_lon: 0,
    })

    // Test at date line
    await fetchNearbyLocations(mockClient, {
      user_lat: 0,
      user_lon: 180,
    })

    await fetchNearbyLocations(mockClient, {
      user_lat: 0,
      user_lon: -180,
    })

    expect(mockClient.rpc).toHaveBeenCalledTimes(5)
  })
})
