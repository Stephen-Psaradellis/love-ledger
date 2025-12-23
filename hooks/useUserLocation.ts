/**
 * React hook for getting and watching user's geolocation.
 *
 * This hook provides a convenient way to access the user's current location
 * via the browser's Geolocation API with proper permission handling,
 * loading states, and optional continuous watching.
 *
 * @module hooks/useUserLocation
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Coordinates } from '@/types/database'

// ============================================================================
// Constants
// ============================================================================

/** Default timeout for geolocation requests in milliseconds */
const DEFAULT_TIMEOUT_MS = 10000

/** Default maximum age of cached position in milliseconds */
const DEFAULT_MAX_AGE_MS = 60000

// ============================================================================
// Types
// ============================================================================

/**
 * Error codes for geolocation failures
 */
export type GeolocationErrorCode =
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'NOT_SUPPORTED'
  | 'UNKNOWN_ERROR'

/**
 * Geolocation error with typed error code
 */
export class GeolocationError extends Error {
  readonly code: GeolocationErrorCode
  readonly originalError?: GeolocationPositionError

  constructor(
    code: GeolocationErrorCode,
    message: string,
    originalError?: GeolocationPositionError
  ) {
    super(message)
    this.name = 'GeolocationError'
    this.code = code
    this.originalError = originalError
    Object.setPrototypeOf(this, GeolocationError.prototype)
  }
}

/**
 * Permission state for geolocation
 */
export type GeolocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unknown'

/**
 * Options for the useUserLocation hook
 */
export interface UseUserLocationOptions {
  /**
   * Whether to immediately request the user's location on mount.
   * If false, call `requestLocation()` manually.
   * @default true
   */
  enableOnMount?: boolean
  /**
   * Whether to continuously watch position changes.
   * When true, the hook will update whenever the user's location changes.
   * @default false
   */
  watch?: boolean
  /**
   * Request high accuracy location (uses GPS on mobile devices).
   * May consume more battery and take longer.
   * @default true
   */
  enableHighAccuracy?: boolean
  /**
   * Timeout for position request in milliseconds.
   * @default 10000
   */
  timeout?: number
  /**
   * Maximum age of a cached position that is acceptable to return, in milliseconds.
   * @default 60000
   */
  maximumAge?: number
}

/**
 * Result of the useUserLocation hook
 */
export interface UseUserLocationResult {
  /** Current coordinates, or null if not yet available */
  coordinates: Coordinates | null
  /** Accuracy of the position in meters */
  accuracy: number | null
  /** Timestamp of when the position was determined */
  timestamp: number | null
  /** Whether a location request is in progress */
  isLoading: boolean
  /** Error object if the location request failed */
  error: GeolocationError | null
  /** Current permission state for geolocation */
  permissionState: GeolocationPermissionState
  /** Function to manually request location update */
  requestLocation: () => void
  /** Function to clear current location and error state */
  clearLocation: () => void
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Maps browser geolocation error codes to typed error codes
 */
function mapGeolocationError(error: GeolocationPositionError): GeolocationError {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return new GeolocationError(
        'PERMISSION_DENIED',
        'Location permission was denied. Please enable location access in your browser settings.',
        error
      )
    case error.POSITION_UNAVAILABLE:
      return new GeolocationError(
        'POSITION_UNAVAILABLE',
        'Unable to determine your location. Please check your device settings.',
        error
      )
    case error.TIMEOUT:
      return new GeolocationError(
        'TIMEOUT',
        'Location request timed out. Please try again.',
        error
      )
    default:
      return new GeolocationError(
        'UNKNOWN_ERROR',
        error.message || 'An unknown error occurred while getting your location.',
        error
      )
  }
}

/**
 * Checks if geolocation is supported in the current browser
 */
function isGeolocationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * React hook for getting and watching user's geolocation.
 *
 * Features:
 * - Single location request or continuous watching
 * - Automatic permission handling
 * - Loading and error states
 * - Permission state tracking
 * - Configurable accuracy and timeout
 *
 * @param options - Configuration options for the hook
 * @returns Object containing location data, loading state, error, and control functions
 *
 * @example
 * // Basic usage - get location on mount
 * const { coordinates, isLoading, error } = useUserLocation()
 *
 * @example
 * // Watch mode for continuous updates
 * const { coordinates, accuracy } = useUserLocation({ watch: true })
 *
 * @example
 * // Manual trigger only
 * const { coordinates, requestLocation } = useUserLocation({ enableOnMount: false })
 * // Later: requestLocation()
 */
export function useUserLocation(
  options: UseUserLocationOptions = {}
): UseUserLocationResult {
  const {
    enableOnMount = true,
    watch = false,
    enableHighAccuracy = true,
    timeout = DEFAULT_TIMEOUT_MS,
    maximumAge = DEFAULT_MAX_AGE_MS,
  } = options

  // State
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [timestamp, setTimestamp] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<GeolocationError | null>(null)
  const [permissionState, setPermissionState] =
    useState<GeolocationPermissionState>('unknown')

  // Refs for cleanup
  const watchIdRef = useRef<number | null>(null)
  const isMountedRef = useRef(true)

  /**
   * Success callback for geolocation API
   */
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    if (!isMountedRef.current) return

    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
    setAccuracy(position.coords.accuracy)
    setTimestamp(position.timestamp)
    setIsLoading(false)
    setError(null)
    setPermissionState('granted')
  }, [])

  /**
   * Error callback for geolocation API
   */
  const handleError = useCallback((positionError: GeolocationPositionError) => {
    if (!isMountedRef.current) return

    const geoError = mapGeolocationError(positionError)
    setError(geoError)
    setIsLoading(false)

    // Update permission state if permission was denied
    if (geoError.code === 'PERMISSION_DENIED') {
      setPermissionState('denied')
    }
  }, [])

  /**
   * Build position options for the geolocation API
   */
  const getPositionOptions = useCallback((): PositionOptions => {
    return {
      enableHighAccuracy,
      timeout,
      maximumAge,
    }
  }, [enableHighAccuracy, timeout, maximumAge])

  /**
   * Request the current location
   */
  const requestLocation = useCallback(() => {
    if (!isGeolocationSupported()) {
      setError(
        new GeolocationError(
          'NOT_SUPPORTED',
          'Geolocation is not supported by your browser.'
        )
      )
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      getPositionOptions()
    )
  }, [handleSuccess, handleError, getPositionOptions])

  /**
   * Clear current location and error state
   */
  const clearLocation = useCallback(() => {
    setCoordinates(null)
    setAccuracy(null)
    setTimestamp(null)
    setError(null)
  }, [])

  /**
   * Start watching position
   */
  const startWatching = useCallback(() => {
    if (!isGeolocationSupported()) {
      setError(
        new GeolocationError(
          'NOT_SUPPORTED',
          'Geolocation is not supported by your browser.'
        )
      )
      return
    }

    // Clear any existing watch
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
    }

    setIsLoading(true)
    setError(null)

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      getPositionOptions()
    )
  }, [handleSuccess, handleError, getPositionOptions])

  /**
   * Stop watching position
   */
  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
  }, [])

  // Query permission state on mount (if supported)
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      return
    }

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => {
        if (!isMountedRef.current) return

        setPermissionState(result.state as GeolocationPermissionState)

        // Listen for permission changes
        const handleChange = () => {
          if (isMountedRef.current) {
            setPermissionState(result.state as GeolocationPermissionState)
          }
        }

        result.addEventListener('change', handleChange)

        return () => {
          result.removeEventListener('change', handleChange)
        }
      })
      .catch(() => {
        // Permissions API not fully supported, continue with 'unknown'
      })
  }, [])

  // Handle watch mode or single request on mount
  useEffect(() => {
    isMountedRef.current = true

    if (enableOnMount) {
      if (watch) {
        startWatching()
      } else {
        requestLocation()
      }
    }

    return () => {
      isMountedRef.current = false
      stopWatching()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle watch mode changes
  useEffect(() => {
    if (!enableOnMount) return

    if (watch) {
      startWatching()
    } else {
      stopWatching()
      // If we were watching and now stopped, keep the last known position
    }

    return () => {
      stopWatching()
    }
  }, [watch, startWatching, stopWatching, enableOnMount])

  return {
    coordinates,
    accuracy,
    timestamp,
    isLoading,
    error,
    permissionState,
    requestLocation,
    clearLocation,
  }
}

export default useUserLocation
