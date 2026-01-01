/**
 * usePhotoSharing Hook
 *
 * React hook for managing photo sharing in conversations with real-time updates.
 * Provides state management, actions, and computed values for photo sharing.
 *
 * @example
 * ```tsx
 * function ChatScreen({ conversationId }: { conversationId: string }) {
 *   const {
 *     sharedWithMe,
 *     mySharedPhotos,
 *     loading,
 *     sharing,
 *     sharePhoto,
 *     unsharePhoto,
 *     isPhotoShared,
 *   } = usePhotoSharing(conversationId)
 *
 *   return (
 *     <View>
 *       {loading ? <Spinner /> : (
 *         sharedWithMe.map(photo => <PhotoTile key={photo.photo_id} photo={photo} />)
 *       )}
 *       <Button onPress={() => sharePhoto(selectedPhotoId)} disabled={sharing}>
 *         Share Photo
 *       </Button>
 *     </View>
 *   )
 * }
 * ```
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  sharePhotoWithMatch,
  unsharePhotoFromMatch,
  getSharedPhotosForConversation,
  getMySharedPhotosForConversation,
  isPhotoSharedInConversation,
  subscribeToPhotoShareChanges,
  type SharedPhotoWithUrl,
  type MySharedPhotoWithUrl,
} from '../lib/photoSharing'

// ============================================================================
// TYPES
// ============================================================================

export interface UsePhotoSharingResult {
  /** Photos shared with the current user in this conversation */
  sharedWithMe: SharedPhotoWithUrl[]
  /** Photos the current user has shared in this conversation */
  mySharedPhotos: MySharedPhotoWithUrl[]
  /** Whether photos are being loaded */
  loading: boolean
  /** Whether a photo is being shared */
  sharing: boolean
  /** Whether a photo is being unshared */
  unsharing: boolean
  /** Last error message */
  error: string | null
  /** Whether any photos have been shared with the current user */
  hasSharedPhotos: boolean
  /** Whether the current user has shared any photos */
  hasSharedAnyPhotos: boolean
  /** Count of photos shared with the current user */
  sharedWithMeCount: number
  /** Count of photos the current user has shared */
  mySharedCount: number

  // Actions
  /** Share a photo with the match in this conversation */
  sharePhoto: (photoId: string) => Promise<boolean>
  /** Unshare a photo from this conversation */
  unsharePhoto: (photoId: string) => Promise<boolean>
  /** Check if a specific photo is shared in this conversation */
  isPhotoShared: (photoId: string) => boolean
  /** Refresh shared photos from server */
  refresh: () => Promise<void>
  /** Clear error */
  clearError: () => void
}

// ============================================================================
// HOOK
// ============================================================================

export function usePhotoSharing(conversationId: string): UsePhotoSharingResult {
  // State
  const [sharedWithMe, setSharedWithMe] = useState<SharedPhotoWithUrl[]>([])
  const [mySharedPhotos, setMySharedPhotos] = useState<MySharedPhotoWithUrl[]>([])
  const [loading, setLoading] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [unsharing, setUnsharing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Computed values
  const hasSharedPhotos = sharedWithMe.length > 0
  const hasSharedAnyPhotos = mySharedPhotos.length > 0
  const sharedWithMeCount = sharedWithMe.length
  const mySharedCount = mySharedPhotos.length

  // Set of photo IDs that I've shared (for quick lookup)
  const mySharedPhotoIds = useMemo(
    () => new Set(mySharedPhotos.map((p) => p.photo_id)),
    [mySharedPhotos]
  )

  // Load shared photos
  const loadSharedPhotos = useCallback(async () => {
    if (!conversationId) return

    try {
      const [sharedPhotos, myPhotos] = await Promise.all([
        getSharedPhotosForConversation(conversationId),
        getMySharedPhotosForConversation(conversationId),
      ])
      setSharedWithMe(sharedPhotos)
      setMySharedPhotos(myPhotos)
    } catch (err) {
      setError('Failed to load shared photos')
    }
  }, [conversationId])

  // Initial load
  useEffect(() => {
    if (!conversationId) {
      setLoading(false)
      return
    }

    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        const [sharedPhotos, myPhotos] = await Promise.all([
          getSharedPhotosForConversation(conversationId),
          getMySharedPhotosForConversation(conversationId),
        ])
        if (isMounted) {
          setSharedWithMe(sharedPhotos)
          setMySharedPhotos(myPhotos)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load shared photos')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [conversationId])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!conversationId) return

    const unsubscribe = subscribeToPhotoShareChanges(conversationId, () => {
      // Re-fetch to get updated data with signed URLs
      loadSharedPhotos()
    })

    return () => {
      unsubscribe()
    }
  }, [conversationId, loadSharedPhotos])

  // Actions
  const sharePhoto = useCallback(
    async (photoId: string): Promise<boolean> => {
      if (!conversationId) {
        setError('No conversation selected')
        return false
      }

      setSharing(true)
      setError(null)

      try {
        const result = await sharePhotoWithMatch(photoId, conversationId)

        if (!result.success) {
          setError(result.error || 'Failed to share photo')
          return false
        }

        // Refresh photos to include the new share
        await loadSharedPhotos()
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to share photo'
        setError(message)
        return false
      } finally {
        setSharing(false)
      }
    },
    [conversationId, loadSharedPhotos]
  )

  const unsharePhoto = useCallback(
    async (photoId: string): Promise<boolean> => {
      if (!conversationId) {
        setError('No conversation selected')
        return false
      }

      setUnsharing(true)
      setError(null)

      try {
        const result = await unsharePhotoFromMatch(photoId, conversationId)

        if (!result.success) {
          setError(result.error || 'Failed to unshare photo')
          return false
        }

        // Remove from local state immediately for responsiveness
        setMySharedPhotos((prev) => prev.filter((p) => p.photo_id !== photoId))
        return true
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to unshare photo'
        setError(message)
        return false
      } finally {
        setUnsharing(false)
      }
    },
    [conversationId]
  )

  const isPhotoShared = useCallback(
    (photoId: string): boolean => {
      return mySharedPhotoIds.has(photoId)
    },
    [mySharedPhotoIds]
  )

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await loadSharedPhotos()
    } finally {
      setLoading(false)
    }
  }, [loadSharedPhotos])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    sharedWithMe,
    mySharedPhotos,
    loading,
    sharing,
    unsharing,
    error,
    hasSharedPhotos,
    hasSharedAnyPhotos,
    sharedWithMeCount,
    mySharedCount,
    sharePhoto,
    unsharePhoto,
    isPhotoShared,
    refresh,
    clearError,
  }
}

export default usePhotoSharing
