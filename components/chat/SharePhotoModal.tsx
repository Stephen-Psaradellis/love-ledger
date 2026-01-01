'use client'

/**
 * SharePhotoModal Component
 *
 * A bottom sheet modal for selecting and sharing photos with a match.
 * Displays only approved photos that haven't been shared yet in the conversation.
 * Allows users to selectively share their private photos during chat.
 *
 * This component is designed to be controlled by its parent via props
 * and does not manage its own visibility state.
 *
 * @example
 * ```tsx
 * <SharePhotoModal
 *   isOpen={isSharePhotoModalOpen}
 *   onClose={() => setIsSharePhotoModalOpen(false)}
 *   onShare={async (photoId) => {
 *     const success = await sharePhoto(photoId)
 *     if (success) {
 *       setIsSharePhotoModalOpen(false)
 *     }
 *   }}
 *   isPhotoShared={isPhotoShared}
 *   sharing={sharing}
 * />
 * ```
 */

import React, { memo, useCallback, useEffect, useRef } from 'react'
import { useProfilePhotos } from '../../hooks/useProfilePhotos'
import styles from './styles/ChatScreen.module.css'

// ============================================================================
// TYPES
// ============================================================================

export interface SharePhotoModalProps {
  /** Whether the modal is visible */
  isOpen: boolean
  /** Callback when modal is closed */
  onClose: () => void
  /** Callback when a photo is selected for sharing */
  onShare: (photoId: string) => Promise<void>
  /** Function to check if a photo is already shared */
  isPhotoShared: (photoId: string) => boolean
  /** Whether a share operation is in progress */
  sharing?: boolean
}

// ============================================================================
// ICONS
// ============================================================================

/**
 * Close X icon for the sheet
 */
function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/**
 * Photo/image icon for empty state
 */
function PhotoIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

/**
 * Checkmark icon for shared photos
 */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/**
 * Lock icon for private indicator
 */
function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ============================================================================
// PHOTO TILE COMPONENT
// ============================================================================

interface PhotoTileProps {
  photoId: string
  signedUrl: string | null
  isShared: boolean
  disabled: boolean
  onSelect: (photoId: string) => void
}

function PhotoTile({ photoId, signedUrl, isShared, disabled, onSelect }: PhotoTileProps) {
  const handleClick = useCallback(() => {
    if (!disabled && !isShared) {
      onSelect(photoId)
    }
  }, [photoId, disabled, isShared, onSelect])

  return (
    <button
      type="button"
      className={sharePhotoStyles.photoTile}
      onClick={handleClick}
      disabled={disabled || isShared}
      aria-label={isShared ? 'Photo already shared' : 'Select photo to share'}
    >
      {signedUrl ? (
        <img
          src={signedUrl}
          alt="Profile photo"
          className={sharePhotoStyles.photoImage}
        />
      ) : (
        <div className={sharePhotoStyles.photoPlaceholder}>
          <PhotoIcon />
        </div>
      )}

      {/* Shared overlay */}
      {isShared && (
        <div className={sharePhotoStyles.sharedOverlay}>
          <div className={sharePhotoStyles.sharedBadge}>
            <CheckIcon />
            <span>Shared</span>
          </div>
        </div>
      )}

      {/* Private badge for unshared photos */}
      {!isShared && (
        <div className={sharePhotoStyles.privateBadge}>
          <LockIcon />
        </div>
      )}
    </button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SharePhotoModal displays a bottom sheet for selecting photos to share
 *
 * @param isOpen - Whether the modal is visible
 * @param onClose - Callback when modal is closed
 * @param onShare - Callback when a photo is selected
 * @param isPhotoShared - Function to check if a photo is already shared
 * @param sharing - Whether a share operation is in progress
 */
function SharePhotoModalComponent({
  isOpen,
  onClose,
  onShare,
  isPhotoShared,
  sharing = false,
}: SharePhotoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Get user's approved photos
  const {
    approvedPhotos,
    loading,
    error: photosError,
  } = useProfilePhotos()

  // Filter photos to show which are available to share
  const availablePhotos = approvedPhotos.filter(photo => !isPhotoShared(photo.id))
  const sharedPhotos = approvedPhotos.filter(photo => isPhotoShared(photo.id))

  // Handle photo selection
  const handlePhotoSelect = useCallback(async (photoId: string) => {
    await onShare(photoId)
  }, [onShare])

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return

    // Focus the close button when modal opens
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Trap focus within modal
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle overlay click (close when clicking outside modal)
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // Don't render if not open
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.actionsMenuOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-photo-modal-title"
    >
      <div
        ref={modalRef}
        className={`${styles.actionsMenu} ${sharePhotoStyles.sharePhotoModal}`}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className={styles.actionsMenuHeader}>
          <h3 id="share-photo-modal-title" className={styles.actionsMenuTitle}>
            Share a Photo
          </h3>
          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drag handle indicator (for mobile bottom sheet) */}
        <div className={styles.dragHandle} aria-hidden="true">
          <div className={styles.dragIndicator} />
        </div>

        {/* Content */}
        <div className={sharePhotoStyles.content}>
          {/* Loading state */}
          {loading && (
            <div className={sharePhotoStyles.loadingContainer}>
              <div className={styles.spinner} />
              <p className={sharePhotoStyles.loadingText}>Loading photos...</p>
            </div>
          )}

          {/* Error state */}
          {photosError && !loading && (
            <div className={sharePhotoStyles.errorContainer}>
              <p className={sharePhotoStyles.errorText}>{photosError}</p>
            </div>
          )}

          {/* Empty state - no approved photos */}
          {!loading && !photosError && approvedPhotos.length === 0 && (
            <div className={sharePhotoStyles.emptyState}>
              <div className={sharePhotoStyles.emptyIcon}>
                <PhotoIcon />
              </div>
              <p className={sharePhotoStyles.emptyTitle}>No photos available</p>
              <p className={sharePhotoStyles.emptyText}>
                Upload and verify photos in your profile to share them with your matches.
              </p>
            </div>
          )}

          {/* All photos shared state */}
          {!loading && !photosError && approvedPhotos.length > 0 && availablePhotos.length === 0 && (
            <div className={sharePhotoStyles.emptyState}>
              <div className={sharePhotoStyles.emptyIcon}>
                <CheckIcon />
              </div>
              <p className={sharePhotoStyles.emptyTitle}>All photos shared</p>
              <p className={sharePhotoStyles.emptyText}>
                You have already shared all your approved photos with this match.
              </p>
            </div>
          )}

          {/* Photo grid */}
          {!loading && !photosError && approvedPhotos.length > 0 && (
            <>
              {/* Instructions */}
              <p className={sharePhotoStyles.instructions}>
                Tap a photo to share it privately with this match.
              </p>

              {/* Available photos section */}
              {availablePhotos.length > 0 && (
                <>
                  <h4 className={sharePhotoStyles.sectionTitle}>Available to Share</h4>
                  <div className={sharePhotoStyles.photoGrid}>
                    {availablePhotos.map((photo) => (
                      <PhotoTile
                        key={photo.id}
                        photoId={photo.id}
                        signedUrl={photo.signedUrl}
                        isShared={false}
                        disabled={sharing}
                        onSelect={handlePhotoSelect}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Already shared photos section */}
              {sharedPhotos.length > 0 && (
                <>
                  <h4 className={sharePhotoStyles.sectionTitle}>Already Shared</h4>
                  <div className={sharePhotoStyles.photoGrid}>
                    {sharedPhotos.map((photo) => (
                      <PhotoTile
                        key={photo.id}
                        photoId={photo.id}
                        signedUrl={photo.signedUrl}
                        isShared={true}
                        disabled={true}
                        onSelect={handlePhotoSelect}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Sharing indicator */}
        {sharing && (
          <div className={sharePhotoStyles.sharingOverlay}>
            <div className={styles.spinner} />
            <p className={sharePhotoStyles.sharingText}>Sharing photo...</p>
          </div>
        )}

        {/* Footer */}
        <div className={styles.actionsMenuFooter}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
            disabled={sharing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENT-SPECIFIC STYLES (CSS-in-JS)
// ============================================================================

const sharePhotoStyles: Record<string, string> = {
  sharePhotoModal: `
    max-height: 85vh;
  `,
  content: `
    padding: 0 16px 16px;
    min-height: 200px;
  `,
  loadingContainer: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  `,
  loadingText: `
    color: #6b7280;
    font-size: 14px;
    margin-top: 12px;
  `,
  errorContainer: `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background-color: #fef2f2;
    border-radius: 8px;
    margin: 16px 0;
  `,
  errorText: `
    color: #dc2626;
    font-size: 14px;
    margin: 0;
  `,
  emptyState: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    text-align: center;
  `,
  emptyIcon: `
    color: #d1d5db;
    margin-bottom: 16px;
  `,
  emptyTitle: `
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 8px;
  `,
  emptyText: `
    font-size: 14px;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  `,
  instructions: `
    font-size: 13px;
    color: #6b7280;
    margin: 0 0 16px;
    text-align: center;
  `,
  sectionTitle: `
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin: 0 0 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  photoGrid: `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 20px;
  `,
  photoTile: `
    position: relative;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f3f4f6;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;
  `,
  photoImage: `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  photoPlaceholder: `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
  `,
  sharedOverlay: `
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  sharedBadge: `
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: #22c55e;
    color: white;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  `,
  privateBadge: `
    position: absolute;
    top: 6px;
    right: 6px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  sharingOverlay: `
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    z-index: 10;
  `,
  sharingText: `
    font-size: 14px;
    color: #374151;
    font-weight: 500;
  `,
}

// Convert styles object to CSS class names using inline styles approach
// We'll use a style tag for component-specific styles
const StyleSheet = () => (
  <style>{`
    .sharePhotoModal {
      max-height: 85vh;
    }
    .sharePhotoContent {
      padding: 0 16px 16px;
      min-height: 200px;
    }
    .sharePhotoLoadingContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }
    .sharePhotoLoadingText {
      color: #6b7280;
      font-size: 14px;
      margin-top: 12px;
    }
    .sharePhotoErrorContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background-color: #fef2f2;
      border-radius: 8px;
      margin: 16px 0;
    }
    .sharePhotoErrorText {
      color: #dc2626;
      font-size: 14px;
      margin: 0;
    }
    .sharePhotoEmptyState {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
    }
    .sharePhotoEmptyIcon {
      color: #d1d5db;
      margin-bottom: 16px;
    }
    .sharePhotoEmptyTitle {
      font-size: 16px;
      font-weight: 600;
      color: #374151;
      margin: 0 0 8px;
    }
    .sharePhotoEmptyText {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
      line-height: 1.5;
    }
    .sharePhotoInstructions {
      font-size: 13px;
      color: #6b7280;
      margin: 0 0 16px;
      text-align: center;
    }
    .sharePhotoSectionTitle {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      margin: 0 0 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .sharePhotoGrid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 20px;
    }
    .sharePhotoTile {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      background-color: #f3f4f6;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: transform 0.15s ease, opacity 0.15s ease;
    }
    .sharePhotoTile:hover:not(:disabled) {
      transform: scale(1.02);
    }
    .sharePhotoTile:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
    .sharePhotoTile:active:not(:disabled) {
      transform: scale(0.98);
    }
    .sharePhotoImage {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sharePhotoPlaceholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
    }
    .sharePhotoSharedOverlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sharePhotoSharedBadge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background-color: #22c55e;
      color: white;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .sharePhotoPrivateBadge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sharePhotoSharingOverlay {
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      z-index: 10;
    }
    .sharePhotoSharingText {
      font-size: 14px;
      color: #374151;
      font-weight: 500;
    }
  `}</style>
)

// Updated component with proper class names
function SharePhotoModalWithStyles({
  isOpen,
  onClose,
  onShare,
  isPhotoShared,
  sharing = false,
}: SharePhotoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Get user's approved photos
  const {
    approvedPhotos,
    loading,
    error: photosError,
  } = useProfilePhotos()

  // Filter photos to show which are available to share
  const availablePhotos = approvedPhotos.filter(photo => !isPhotoShared(photo.id))
  const sharedPhotos = approvedPhotos.filter(photo => isPhotoShared(photo.id))

  // Handle photo selection
  const handlePhotoSelect = useCallback(async (photoId: string) => {
    await onShare(photoId)
  }, [onShare])

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return

    // Focus the close button when modal opens
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Trap focus within modal
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements?.length) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle overlay click (close when clicking outside modal)
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  // Don't render if not open
  if (!isOpen) {
    return null
  }

  return (
    <>
      <StyleSheet />
      <div
        className={styles.actionsMenuOverlay}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-photo-modal-title"
      >
        <div
          ref={modalRef}
          className={`${styles.actionsMenu} sharePhotoModal`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div className={styles.actionsMenuHeader}>
            <h3 id="share-photo-modal-title" className={styles.actionsMenuTitle}>
              Share a Photo
            </h3>
            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Drag handle indicator (for mobile bottom sheet) */}
          <div className={styles.dragHandle} aria-hidden="true">
            <div className={styles.dragIndicator} />
          </div>

          {/* Content */}
          <div className="sharePhotoContent">
            {/* Loading state */}
            {loading && (
              <div className="sharePhotoLoadingContainer">
                <div className={styles.spinner} />
                <p className="sharePhotoLoadingText">Loading photos...</p>
              </div>
            )}

            {/* Error state */}
            {photosError && !loading && (
              <div className="sharePhotoErrorContainer">
                <p className="sharePhotoErrorText">{photosError}</p>
              </div>
            )}

            {/* Empty state - no approved photos */}
            {!loading && !photosError && approvedPhotos.length === 0 && (
              <div className="sharePhotoEmptyState">
                <div className="sharePhotoEmptyIcon">
                  <PhotoIcon />
                </div>
                <p className="sharePhotoEmptyTitle">No photos available</p>
                <p className="sharePhotoEmptyText">
                  Upload and verify photos in your profile to share them with your matches.
                </p>
              </div>
            )}

            {/* All photos shared state */}
            {!loading && !photosError && approvedPhotos.length > 0 && availablePhotos.length === 0 && (
              <div className="sharePhotoEmptyState">
                <div className="sharePhotoEmptyIcon" style={{ color: '#22c55e' }}>
                  <CheckIcon />
                </div>
                <p className="sharePhotoEmptyTitle">All photos shared</p>
                <p className="sharePhotoEmptyText">
                  You have already shared all your approved photos with this match.
                </p>
              </div>
            )}

            {/* Photo grid */}
            {!loading && !photosError && approvedPhotos.length > 0 && (
              <>
                {/* Instructions */}
                <p className="sharePhotoInstructions">
                  Tap a photo to share it privately with this match.
                </p>

                {/* Available photos section */}
                {availablePhotos.length > 0 && (
                  <>
                    <h4 className="sharePhotoSectionTitle">Available to Share</h4>
                    <div className="sharePhotoGrid">
                      {availablePhotos.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          className="sharePhotoTile"
                          onClick={() => handlePhotoSelect(photo.id)}
                          disabled={sharing}
                          aria-label="Select photo to share"
                        >
                          {photo.signedUrl ? (
                            <img
                              src={photo.signedUrl}
                              alt="Profile photo"
                              className="sharePhotoImage"
                            />
                          ) : (
                            <div className="sharePhotoPlaceholder">
                              <PhotoIcon />
                            </div>
                          )}
                          <div className="sharePhotoPrivateBadge">
                            <LockIcon />
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Already shared photos section */}
                {sharedPhotos.length > 0 && (
                  <>
                    <h4 className="sharePhotoSectionTitle">Already Shared</h4>
                    <div className="sharePhotoGrid">
                      {sharedPhotos.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          className="sharePhotoTile"
                          disabled={true}
                          aria-label="Photo already shared"
                        >
                          {photo.signedUrl ? (
                            <img
                              src={photo.signedUrl}
                              alt="Profile photo"
                              className="sharePhotoImage"
                            />
                          ) : (
                            <div className="sharePhotoPlaceholder">
                              <PhotoIcon />
                            </div>
                          )}
                          <div className="sharePhotoSharedOverlay">
                            <div className="sharePhotoSharedBadge">
                              <CheckIcon />
                              <span>Shared</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Sharing indicator */}
          {sharing && (
            <div className="sharePhotoSharingOverlay">
              <div className={styles.spinner} />
              <p className="sharePhotoSharingText">Sharing photo...</p>
            </div>
          )}

          {/* Footer */}
          <div className={styles.actionsMenuFooter}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
              disabled={sharing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Memoized SharePhotoModal for performance optimization
 * Only re-renders when props change
 */
export const SharePhotoModal = memo(SharePhotoModalWithStyles)

export default SharePhotoModal
