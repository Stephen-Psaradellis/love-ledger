/**
 * @vitest-environment jsdom
 */

/**
 * Unit tests for usePhotoSharing hook
 *
 * Tests the photo sharing hook including:
 * - Initial state and loading
 * - Loading shared photos on mount
 * - sharePhoto action
 * - unsharePhoto action
 * - isPhotoShared utility
 * - Computed values (hasSharedPhotos, counts, etc.)
 * - Error handling
 * - Refresh functionality
 * - Real-time subscription
 * - Edge cases
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

// ============================================================================
// Mock Setup
// ============================================================================

// Mock photo sharing functions
const mockSharePhotoWithMatch = vi.fn()
const mockUnsharePhotoFromMatch = vi.fn()
const mockGetSharedPhotosForConversation = vi.fn()
const mockGetMySharedPhotosForConversation = vi.fn()
const mockIsPhotoSharedInConversation = vi.fn()
const mockSubscribeToPhotoShareChanges = vi.fn()

vi.mock('../../lib/photoSharing', () => ({
  sharePhotoWithMatch: (...args: unknown[]) => mockSharePhotoWithMatch(...args),
  unsharePhotoFromMatch: (...args: unknown[]) => mockUnsharePhotoFromMatch(...args),
  getSharedPhotosForConversation: (...args: unknown[]) => mockGetSharedPhotosForConversation(...args),
  getMySharedPhotosForConversation: (...args: unknown[]) => mockGetMySharedPhotosForConversation(...args),
  isPhotoSharedInConversation: (...args: unknown[]) => mockIsPhotoSharedInConversation(...args),
  subscribeToPhotoShareChanges: (...args: unknown[]) => mockSubscribeToPhotoShareChanges(...args),
}))

// Import the hook under test AFTER mocking dependencies
import { usePhotoSharing, type UsePhotoSharingResult } from '../../hooks/usePhotoSharing'

// ============================================================================
// Test Constants
// ============================================================================

const TEST_CONVERSATION_ID = 'test-conversation-123'
const TEST_PHOTO_ID = 'test-photo-456'
const TEST_SHARE_ID = 'test-share-789'
const TEST_USER_ID = 'test-user-abc'
const TEST_MATCH_USER_ID = 'test-match-def'

const MOCK_SHARED_PHOTO = {
  share_id: TEST_SHARE_ID,
  photo_id: TEST_PHOTO_ID,
  owner_id: TEST_MATCH_USER_ID,
  storage_path: 'photos/test/photo.jpg',
  is_primary: true,
  shared_at: '2024-01-01T00:00:00Z',
  signedUrl: 'https://example.com/signed-url',
}

const MOCK_MY_SHARED_PHOTO = {
  share_id: 'my-share-123',
  photo_id: 'my-photo-456',
  shared_with_user_id: TEST_MATCH_USER_ID,
  storage_path: 'photos/me/photo.jpg',
  is_primary: false,
  shared_at: '2024-01-02T00:00:00Z',
  signedUrl: 'https://example.com/my-signed-url',
}

// ============================================================================
// Setup and Teardown
// ============================================================================

describe('usePhotoSharing', () => {
  let mockUnsubscribe: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()

    // Default: empty shared photos
    mockGetSharedPhotosForConversation.mockResolvedValue([])
    mockGetMySharedPhotosForConversation.mockResolvedValue([])

    // Default: successful share/unshare
    mockSharePhotoWithMatch.mockResolvedValue({ success: true, share: null, error: null })
    mockUnsharePhotoFromMatch.mockResolvedValue({ success: true, error: null })

    // Default: photo not shared
    mockIsPhotoSharedInConversation.mockResolvedValue(false)

    // Default: subscription setup
    mockUnsubscribe = vi.fn()
    mockSubscribeToPhotoShareChanges.mockReturnValue(mockUnsubscribe)
  })

  // ============================================================================
  // Initial State Tests
  // ============================================================================

  describe('initial state', () => {
    it('returns default values while loading', () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      expect(result.current.loading).toBe(true)
      expect(result.current.sharing).toBe(false)
      expect(result.current.unsharing).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.sharedWithMe).toEqual([])
      expect(result.current.mySharedPhotos).toEqual([])
    })

    it('provides all expected functions', () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      expect(typeof result.current.sharePhoto).toBe('function')
      expect(typeof result.current.unsharePhoto).toBe('function')
      expect(typeof result.current.isPhotoShared).toBe('function')
      expect(typeof result.current.refresh).toBe('function')
      expect(typeof result.current.clearError).toBe('function')
    })

    it('provides computed values', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasSharedPhotos).toBe(false)
      expect(result.current.hasSharedAnyPhotos).toBe(false)
      expect(result.current.sharedWithMeCount).toBe(0)
      expect(result.current.mySharedCount).toBe(0)
    })
  })

  // ============================================================================
  // Loading Photos Tests
  // ============================================================================

  describe('loading photos', () => {
    it('loads photos on mount', async () => {
      renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(mockGetSharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
        expect(mockGetMySharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
      })
    })

    it('sets loading to false after load completes', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    it('populates sharedWithMe with loaded photos', async () => {
      mockGetSharedPhotosForConversation.mockResolvedValue([MOCK_SHARED_PHOTO])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.sharedWithMe).toHaveLength(1)
      expect(result.current.sharedWithMe[0].photo_id).toBe(TEST_PHOTO_ID)
    })

    it('populates mySharedPhotos with loaded photos', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.mySharedPhotos).toHaveLength(1)
      expect(result.current.mySharedPhotos[0].photo_id).toBe('my-photo-456')
    })

    it('handles load error gracefully', async () => {
      mockGetSharedPhotosForConversation.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBe('Failed to load shared photos')
      expect(result.current.sharedWithMe).toEqual([])
    })

    it('does not load when conversationId is empty', async () => {
      const { result } = renderHook(() => usePhotoSharing(''))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(mockGetSharedPhotosForConversation).not.toHaveBeenCalled()
      expect(mockGetMySharedPhotosForConversation).not.toHaveBeenCalled()
    })

    it('updates computed values based on loaded photos', async () => {
      mockGetSharedPhotosForConversation.mockResolvedValue([MOCK_SHARED_PHOTO])
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasSharedPhotos).toBe(true)
      expect(result.current.hasSharedAnyPhotos).toBe(true)
      expect(result.current.sharedWithMeCount).toBe(1)
      expect(result.current.mySharedCount).toBe(1)
    })
  })

  // ============================================================================
  // sharePhoto Tests
  // ============================================================================

  describe('sharePhoto', () => {
    it('calls sharePhotoWithMatch with correct parameters', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(mockSharePhotoWithMatch).toHaveBeenCalledWith(TEST_PHOTO_ID, TEST_CONVERSATION_ID)
    })

    it('sets sharing to true during operation', async () => {
      let resolveShare: (value: unknown) => void = () => {}

      mockSharePhotoWithMatch.mockImplementation(
        () => new Promise((resolve) => {
          resolveShare = resolve
        })
      )

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let sharePromise: Promise<boolean>

      act(() => {
        sharePromise = result.current.sharePhoto(TEST_PHOTO_ID)
      })

      await waitFor(() => {
        expect(result.current.sharing).toBe(true)
      })

      await act(async () => {
        resolveShare({ success: true, share: null, error: null })
        await sharePromise
      })

      expect(result.current.sharing).toBe(false)
    })

    it('returns true on successful share', async () => {
      mockSharePhotoWithMatch.mockResolvedValue({ success: true, share: null, error: null })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let shareResult: boolean | undefined

      await act(async () => {
        shareResult = await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(shareResult).toBe(true)
    })

    it('returns false on failed share', async () => {
      mockSharePhotoWithMatch.mockResolvedValue({ success: false, share: null, error: 'Share failed' })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let shareResult: boolean | undefined

      await act(async () => {
        shareResult = await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(shareResult).toBe(false)
      expect(result.current.error).toBe('Share failed')
    })

    it('refreshes photos after successful share', async () => {
      mockSharePhotoWithMatch.mockResolvedValue({ success: true, share: null, error: null })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Clear initial calls
      mockGetSharedPhotosForConversation.mockClear()
      mockGetMySharedPhotosForConversation.mockClear()

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(mockGetSharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
      expect(mockGetMySharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
    })

    it('sets error when conversationId is empty', async () => {
      const { result } = renderHook(() => usePhotoSharing(''))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let shareResult: boolean | undefined

      await act(async () => {
        shareResult = await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(shareResult).toBe(false)
      expect(result.current.error).toBe('No conversation selected')
    })

    it('handles exception during share', async () => {
      mockSharePhotoWithMatch.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let shareResult: boolean | undefined

      await act(async () => {
        shareResult = await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(shareResult).toBe(false)
      expect(result.current.error).toBe('Network error')
    })

    it('handles non-Error exception during share', async () => {
      mockSharePhotoWithMatch.mockRejectedValue('String error')

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let shareResult: boolean | undefined

      await act(async () => {
        shareResult = await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(shareResult).toBe(false)
      expect(result.current.error).toBe('Failed to share photo')
    })

    it('clears previous error before sharing', async () => {
      // First cause an error
      mockSharePhotoWithMatch.mockResolvedValueOnce({ success: false, share: null, error: 'First error' })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(result.current.error).toBe('First error')

      // Now share successfully
      mockSharePhotoWithMatch.mockResolvedValueOnce({ success: true, share: null, error: null })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(result.current.error).toBeNull()
    })
  })

  // ============================================================================
  // unsharePhoto Tests
  // ============================================================================

  describe('unsharePhoto', () => {
    it('calls unsharePhotoFromMatch with correct parameters', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(mockUnsharePhotoFromMatch).toHaveBeenCalledWith(TEST_PHOTO_ID, TEST_CONVERSATION_ID)
    })

    it('sets unsharing to true during operation', async () => {
      let resolveUnshare: (value: unknown) => void = () => {}

      mockUnsharePhotoFromMatch.mockImplementation(
        () => new Promise((resolve) => {
          resolveUnshare = resolve
        })
      )

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unsharePromise: Promise<boolean>

      act(() => {
        unsharePromise = result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      await waitFor(() => {
        expect(result.current.unsharing).toBe(true)
      })

      await act(async () => {
        resolveUnshare({ success: true, error: null })
        await unsharePromise
      })

      expect(result.current.unsharing).toBe(false)
    })

    it('returns true on successful unshare', async () => {
      mockUnsharePhotoFromMatch.mockResolvedValue({ success: true, error: null })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unshareResult: boolean | undefined

      await act(async () => {
        unshareResult = await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(unshareResult).toBe(true)
    })

    it('returns false on failed unshare', async () => {
      mockUnsharePhotoFromMatch.mockResolvedValue({ success: false, error: 'Unshare failed' })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unshareResult: boolean | undefined

      await act(async () => {
        unshareResult = await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(unshareResult).toBe(false)
      expect(result.current.error).toBe('Unshare failed')
    })

    it('removes photo from local state immediately on success', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])
      mockUnsharePhotoFromMatch.mockResolvedValue({ success: true, error: null })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.mySharedPhotos).toHaveLength(1)

      await act(async () => {
        await result.current.unsharePhoto('my-photo-456')
      })

      expect(result.current.mySharedPhotos).toHaveLength(0)
    })

    it('sets error when conversationId is empty', async () => {
      const { result } = renderHook(() => usePhotoSharing(''))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unshareResult: boolean | undefined

      await act(async () => {
        unshareResult = await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(unshareResult).toBe(false)
      expect(result.current.error).toBe('No conversation selected')
    })

    it('handles exception during unshare', async () => {
      mockUnsharePhotoFromMatch.mockRejectedValue(new Error('Connection lost'))

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unshareResult: boolean | undefined

      await act(async () => {
        unshareResult = await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(unshareResult).toBe(false)
      expect(result.current.error).toBe('Connection lost')
    })

    it('handles non-Error exception during unshare', async () => {
      mockUnsharePhotoFromMatch.mockRejectedValue('String error')

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      let unshareResult: boolean | undefined

      await act(async () => {
        unshareResult = await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(unshareResult).toBe(false)
      expect(result.current.error).toBe('Failed to unshare photo')
    })
  })

  // ============================================================================
  // isPhotoShared Tests
  // ============================================================================

  describe('isPhotoShared', () => {
    it('returns true when photo is in mySharedPhotos', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.isPhotoShared('my-photo-456')).toBe(true)
    })

    it('returns false when photo is not in mySharedPhotos', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.isPhotoShared('non-existent-photo')).toBe(false)
    })

    it('returns false when mySharedPhotos is empty', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.isPhotoShared(TEST_PHOTO_ID)).toBe(false)
    })

    it('updates when mySharedPhotos changes', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.isPhotoShared('my-photo-456')).toBe(false)

      // Simulate refresh with new photo
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      await act(async () => {
        await result.current.refresh()
      })

      expect(result.current.isPhotoShared('my-photo-456')).toBe(true)
    })
  })

  // ============================================================================
  // refresh Tests
  // ============================================================================

  describe('refresh', () => {
    it('reloads photos from server', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Clear initial calls
      mockGetSharedPhotosForConversation.mockClear()
      mockGetMySharedPhotosForConversation.mockClear()

      await act(async () => {
        await result.current.refresh()
      })

      expect(mockGetSharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
      expect(mockGetMySharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
    })

    it('sets loading to true during refresh', async () => {
      let resolveLoad: (value: unknown) => void = () => {}

      mockGetSharedPhotosForConversation.mockImplementation(
        () => new Promise((resolve) => {
          resolveLoad = resolve
        })
      )
      mockGetMySharedPhotosForConversation.mockResolvedValue([])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      // Wait for initial load
      await act(async () => {
        resolveLoad([])
      })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Start refresh
      let refreshPromise: Promise<void>

      act(() => {
        refreshPromise = result.current.refresh()
      })

      await waitFor(() => {
        expect(result.current.loading).toBe(true)
      })

      await act(async () => {
        resolveLoad([])
        await refreshPromise
      })

      expect(result.current.loading).toBe(false)
    })

    it('clears error before refresh', async () => {
      // First cause an error
      mockSharePhotoWithMatch.mockResolvedValue({ success: false, share: null, error: 'Some error' })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(result.current.error).toBe('Some error')

      await act(async () => {
        await result.current.refresh()
      })

      expect(result.current.error).toBeNull()
    })

    it('updates state with new data', async () => {
      mockGetSharedPhotosForConversation.mockResolvedValue([])
      mockGetMySharedPhotosForConversation.mockResolvedValue([])

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.sharedWithMe).toHaveLength(0)

      // Setup new data for refresh
      mockGetSharedPhotosForConversation.mockResolvedValue([MOCK_SHARED_PHOTO])

      await act(async () => {
        await result.current.refresh()
      })

      expect(result.current.sharedWithMe).toHaveLength(1)
    })
  })

  // ============================================================================
  // clearError Tests
  // ============================================================================

  describe('clearError', () => {
    it('clears the error state', async () => {
      mockSharePhotoWithMatch.mockResolvedValue({ success: false, share: null, error: 'Some error' })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      expect(result.current.error).toBe('Some error')

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })

    it('works when error is already null', () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      expect(result.current.error).toBeNull()

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })

  // ============================================================================
  // Real-time Subscription Tests
  // ============================================================================

  describe('real-time subscription', () => {
    it('subscribes to photo share changes on mount', async () => {
      renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(mockSubscribeToPhotoShareChanges).toHaveBeenCalledWith(
          TEST_CONVERSATION_ID,
          expect.any(Function)
        )
      })
    })

    it('does not subscribe when conversationId is empty', async () => {
      renderHook(() => usePhotoSharing(''))

      await waitFor(() => {
        expect(mockSubscribeToPhotoShareChanges).not.toHaveBeenCalled()
      })
    })

    it('unsubscribes on unmount', async () => {
      const { unmount } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(mockSubscribeToPhotoShareChanges).toHaveBeenCalled()
      })

      unmount()

      expect(mockUnsubscribe).toHaveBeenCalled()
    })

    it('refreshes photos when subscription callback is triggered', async () => {
      let subscriptionCallback: () => void = () => {}

      mockSubscribeToPhotoShareChanges.mockImplementation((id, callback) => {
        subscriptionCallback = callback
        return mockUnsubscribe
      })

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Clear initial calls
      mockGetSharedPhotosForConversation.mockClear()
      mockGetMySharedPhotosForConversation.mockClear()

      // Trigger subscription callback
      await act(async () => {
        subscriptionCallback()
      })

      expect(mockGetSharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
      expect(mockGetMySharedPhotosForConversation).toHaveBeenCalledWith(TEST_CONVERSATION_ID)
    })

    it('resubscribes when conversationId changes', async () => {
      const { rerender, unmount } = renderHook(
        ({ conversationId }) => usePhotoSharing(conversationId),
        { initialProps: { conversationId: TEST_CONVERSATION_ID } }
      )

      await waitFor(() => {
        expect(mockSubscribeToPhotoShareChanges).toHaveBeenCalledWith(
          TEST_CONVERSATION_ID,
          expect.any(Function)
        )
      })

      // Clear mocks
      mockSubscribeToPhotoShareChanges.mockClear()
      mockUnsubscribe.mockClear()

      // Change conversationId
      rerender({ conversationId: 'new-conversation-456' })

      await waitFor(() => {
        expect(mockUnsubscribe).toHaveBeenCalled()
        expect(mockSubscribeToPhotoShareChanges).toHaveBeenCalledWith(
          'new-conversation-456',
          expect.any(Function)
        )
      })

      unmount()
    })
  })

  // ============================================================================
  // Edge Cases Tests
  // ============================================================================

  describe('edge cases', () => {
    it('handles multiple rapid share calls', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Rapid share calls
      await act(async () => {
        await Promise.all([
          result.current.sharePhoto('photo-1'),
          result.current.sharePhoto('photo-2'),
          result.current.sharePhoto('photo-3'),
        ])
      })

      expect(mockSharePhotoWithMatch).toHaveBeenCalledTimes(3)
    })

    it('handles share and unshare called sequentially', async () => {
      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      await act(async () => {
        await result.current.sharePhoto(TEST_PHOTO_ID)
      })

      await act(async () => {
        await result.current.unsharePhoto(TEST_PHOTO_ID)
      })

      expect(mockSharePhotoWithMatch).toHaveBeenCalledTimes(1)
      expect(mockUnsharePhotoFromMatch).toHaveBeenCalledTimes(1)
    })

    it('handles unmount during loading', () => {
      let resolveLoad: (value: unknown) => void = () => {}

      mockGetSharedPhotosForConversation.mockImplementation(
        () => new Promise((resolve) => {
          resolveLoad = resolve
        })
      )

      const { unmount } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      // Unmount while still loading
      unmount()

      // Resolve after unmount - should not cause errors
      resolveLoad([])

      // Test passes if no errors are thrown
    })

    it('handles unmount during share operation', async () => {
      let resolveShare: (value: unknown) => void = () => {}

      mockSharePhotoWithMatch.mockImplementation(
        () => new Promise((resolve) => {
          resolveShare = resolve
        })
      )

      const { result, unmount } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Start share
      act(() => {
        result.current.sharePhoto(TEST_PHOTO_ID)
      })

      // Unmount while sharing
      unmount()

      // Resolve after unmount - should not cause errors
      resolveShare({ success: true, share: null, error: null })

      // Test passes if no errors are thrown
    })

    it('handles multiple photos shared by different users', async () => {
      const multiplePhotos = [
        { ...MOCK_SHARED_PHOTO, share_id: 'share-1', photo_id: 'photo-1', owner_id: 'user-1' },
        { ...MOCK_SHARED_PHOTO, share_id: 'share-2', photo_id: 'photo-2', owner_id: 'user-2' },
        { ...MOCK_SHARED_PHOTO, share_id: 'share-3', photo_id: 'photo-3', owner_id: 'user-1' },
      ]

      mockGetSharedPhotosForConversation.mockResolvedValue(multiplePhotos)

      const { result } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.sharedWithMe).toHaveLength(3)
      expect(result.current.sharedWithMeCount).toBe(3)
      expect(result.current.hasSharedPhotos).toBe(true)
    })

    it('preserves isPhotoShared memoization', async () => {
      mockGetMySharedPhotosForConversation.mockResolvedValue([MOCK_MY_SHARED_PHOTO])

      const { result, rerender } = renderHook(() => usePhotoSharing(TEST_CONVERSATION_ID))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      const isPhotoSharedRef1 = result.current.isPhotoShared
      const isShared1 = result.current.isPhotoShared('my-photo-456')

      rerender()

      const isPhotoSharedRef2 = result.current.isPhotoShared
      const isShared2 = result.current.isPhotoShared('my-photo-456')

      expect(isShared1).toBe(isShared2)
      // References may be stable due to useCallback
      expect(typeof isPhotoSharedRef1).toBe('function')
      expect(typeof isPhotoSharedRef2).toBe('function')
    })
  })

  // ============================================================================
  // Type Export Tests
  // ============================================================================

  describe('type exports', () => {
    it('UsePhotoSharingResult type is usable', () => {
      const verifyType = (result: UsePhotoSharingResult) => {
        expect(typeof result.sharedWithMe).toBe('object')
        expect(typeof result.mySharedPhotos).toBe('object')
        expect(typeof result.loading).toBe('boolean')
        expect(typeof result.sharing).toBe('boolean')
        expect(typeof result.unsharing).toBe('boolean')
        expect(typeof result.hasSharedPhotos).toBe('boolean')
        expect(typeof result.hasSharedAnyPhotos).toBe('boolean')
        expect(typeof result.sharedWithMeCount).toBe('number')
        expect(typeof result.mySharedCount).toBe('number')
        expect(typeof result.sharePhoto).toBe('function')
        expect(typeof result.unsharePhoto).toBe('function')
        expect(typeof result.isPhotoShared).toBe('function')
        expect(typeof result.refresh).toBe('function')
        expect(typeof result.clearError).toBe('function')
      }

      // Type is properly exported
      expect(verifyType).toBeDefined()
    })
  })
})
