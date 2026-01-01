'use client'

/**
 * SharedPhotoDisplay Component
 *
 * Displays photos that have been shared with the current user in a chat conversation.
 * Shows a horizontal scrollable gallery of shared photos with visual indicators.
 * Supports expand/collapse and full-screen photo viewing.
 *
 * This component is designed to be placed in the chat screen to show
 * photos that have been shared by the match in the current conversation.
 *
 * @example
 * ```tsx
 * function ChatScreen({ conversationId }: { conversationId: string }) {
 *   const { sharedWithMe, loading } = usePhotoSharing(conversationId)
 *
 *   return (
 *     <View>
 *       <SharedPhotoDisplay
 *         photos={sharedWithMe}
 *         loading={loading}
 *         matchName="Sarah"
 *       />
 *       <MessageList messages={messages} />
 *     </View>
 *   )
 * }
 * ```
 */

import React, { memo, useCallback, useState } from 'react'
import type { SharedPhotoWithUrl } from '../../lib/photoSharing'

// ============================================================================
// TYPES
// ============================================================================

export interface SharedPhotoDisplayProps {
  /** Photos shared with the current user */
  photos: SharedPhotoWithUrl[]
  /** Whether photos are loading */
  loading?: boolean
  /** Name of the match who shared the photos (for display) */
  matchName?: string
  /** Whether the display is initially expanded (default: true) */
  defaultExpanded?: boolean
  /** Callback when a photo is tapped for full view */
  onPhotoPress?: (photo: SharedPhotoWithUrl, index: number) => void
  /** Test ID for testing purposes */
  testID?: string
}

interface PhotoTileProps {
  photo: SharedPhotoWithUrl
  index: number
  onPress?: (photo: SharedPhotoWithUrl, index: number) => void
}

// ============================================================================
// ICONS
// ============================================================================

/**
 * Camera/photo icon for empty state
 */
function CameraIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

/**
 * Chevron icon for expand/collapse
 */
function ChevronIcon({ direction }: { direction: 'up' | 'down' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: direction === 'up' ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

/**
 * Share icon for the header badge
 */
function ShareIcon() {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

/**
 * Image placeholder icon
 */
function ImageIcon() {
  return (
    <svg
      width="24"
      height="24"
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

// ============================================================================
// PHOTO TILE COMPONENT
// ============================================================================

function PhotoTile({ photo, index, onPress }: PhotoTileProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleClick = useCallback(() => {
    onPress?.(photo, index)
  }, [photo, index, onPress])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  return (
    <button
      type="button"
      className="sharedPhotoTile"
      onClick={handleClick}
      aria-label={`Shared photo ${index + 1}`}
    >
      {photo.signedUrl && !imageError ? (
        <>
          {!imageLoaded && (
            <div className="sharedPhotoPlaceholder">
              <div className="sharedPhotoSpinner" />
            </div>
          )}
          <img
            src={photo.signedUrl}
            alt={`Shared photo ${index + 1}`}
            className="sharedPhotoImage"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        </>
      ) : (
        <div className="sharedPhotoPlaceholder">
          <ImageIcon />
        </div>
      )}

      {/* Shared indicator badge */}
      <div className="sharedPhotoBadge" title="Shared Photo">
        <ShareIcon />
      </div>
    </button>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * SharedPhotoDisplay shows photos shared by a match in the conversation
 *
 * @param photos - Array of shared photos to display
 * @param loading - Whether photos are being loaded
 * @param matchName - Name of the person who shared the photos
 * @param defaultExpanded - Initial expanded state
 * @param onPhotoPress - Callback when a photo is tapped
 * @param testID - Test ID for testing
 */
function SharedPhotoDisplayComponent({
  photos,
  loading = false,
  matchName,
  defaultExpanded = true,
  onPhotoPress,
  testID = 'shared-photo-display',
}: SharedPhotoDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  const photoCount = photos.length

  // Don't render anything if no photos and not loading
  if (!loading && photoCount === 0) {
    return null
  }

  const headerText = matchName
    ? `${matchName}'s Shared Photos`
    : 'Shared Photos'

  return (
    <>
      <SharedPhotoStyles />
      <div className="sharedPhotoDisplayContainer" data-testid={testID}>
        {/* Header with expand/collapse */}
        <button
          type="button"
          className="sharedPhotoDisplayHeader"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls="shared-photos-content"
        >
          <div className="sharedPhotoDisplayHeaderLeft">
            <div className="sharedPhotoDisplayIcon">
              <CameraIcon />
            </div>
            <div className="sharedPhotoDisplayHeaderText">
              <span className="sharedPhotoDisplayTitle">{headerText}</span>
              <span className="sharedPhotoDisplayCount">
                {loading ? 'Loading...' : `${photoCount} photo${photoCount !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          <div className="sharedPhotoDisplayChevron">
            <ChevronIcon direction={isExpanded ? 'up' : 'down'} />
          </div>
        </button>

        {/* Content - collapsible */}
        {isExpanded && (
          <div
            id="shared-photos-content"
            className="sharedPhotoDisplayContent"
            role="region"
            aria-label="Shared photos gallery"
          >
            {/* Loading state */}
            {loading && (
              <div className="sharedPhotoDisplayLoading">
                <div className="sharedPhotoSpinner" />
                <span className="sharedPhotoLoadingText">Loading photos...</span>
              </div>
            )}

            {/* Photo gallery */}
            {!loading && photoCount > 0 && (
              <div className="sharedPhotoGallery">
                <div className="sharedPhotoGalleryScroll">
                  {photos.map((photo, index) => (
                    <PhotoTile
                      key={photo.share_id}
                      photo={photo}
                      index={index}
                      onPress={onPhotoPress}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state (should not happen as we return null above, but just in case) */}
            {!loading && photoCount === 0 && (
              <div className="sharedPhotoDisplayEmpty">
                <CameraIcon />
                <span className="sharedPhotoEmptyText">No shared photos yet</span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

// ============================================================================
// STYLES
// ============================================================================

/**
 * Component-specific styles injected via style tag
 */
function SharedPhotoStyles() {
  return (
    <style>{`
      .sharedPhotoDisplayContainer {
        background-color: #f9fafb;
        border-radius: 12px;
        margin: 8px 16px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
      }

      .sharedPhotoDisplayHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 12px 16px;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.15s ease;
      }

      .sharedPhotoDisplayHeader:hover {
        background-color: #f3f4f6;
      }

      .sharedPhotoDisplayHeader:focus {
        outline: 2px solid #3b82f6;
        outline-offset: -2px;
      }

      .sharedPhotoDisplayHeaderLeft {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sharedPhotoDisplayIcon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #e0e7ff;
        color: #4f46e5;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .sharedPhotoDisplayHeaderText {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .sharedPhotoDisplayTitle {
        font-size: 14px;
        font-weight: 600;
        color: #111827;
        line-height: 1.2;
      }

      .sharedPhotoDisplayCount {
        font-size: 12px;
        color: #6b7280;
        line-height: 1.2;
      }

      .sharedPhotoDisplayChevron {
        color: #9ca3af;
        flex-shrink: 0;
        transition: color 0.15s ease;
      }

      .sharedPhotoDisplayHeader:hover .sharedPhotoDisplayChevron {
        color: #6b7280;
      }

      .sharedPhotoDisplayContent {
        padding: 0 16px 16px;
      }

      .sharedPhotoDisplayLoading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 24px 0;
        color: #6b7280;
      }

      .sharedPhotoSpinner {
        width: 16px;
        height: 16px;
        border: 2px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: sharedPhotoSpin 0.8s linear infinite;
      }

      @keyframes sharedPhotoSpin {
        to {
          transform: rotate(360deg);
        }
      }

      .sharedPhotoLoadingText {
        font-size: 13px;
      }

      .sharedPhotoGallery {
        overflow: hidden;
      }

      .sharedPhotoGalleryScroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 4px 0;
        scrollbar-width: thin;
        scrollbar-color: #d1d5db transparent;
      }

      .sharedPhotoGalleryScroll::-webkit-scrollbar {
        height: 6px;
      }

      .sharedPhotoGalleryScroll::-webkit-scrollbar-track {
        background: transparent;
      }

      .sharedPhotoGalleryScroll::-webkit-scrollbar-thumb {
        background-color: #d1d5db;
        border-radius: 3px;
      }

      .sharedPhotoTile {
        position: relative;
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #e5e7eb;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .sharedPhotoTile:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .sharedPhotoTile:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }

      .sharedPhotoTile:active {
        transform: scale(0.98);
      }

      .sharedPhotoImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.2s ease;
      }

      .sharedPhotoPlaceholder {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
        background-color: #f3f4f6;
      }

      .sharedPhotoBadge {
        position: absolute;
        bottom: 4px;
        right: 4px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(79, 70, 229, 0.9);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      .sharedPhotoDisplayEmpty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 24px 0;
        color: #9ca3af;
      }

      .sharedPhotoEmptyText {
        font-size: 13px;
      }

      /* Responsive adjustments */
      @media (min-width: 640px) {
        .sharedPhotoTile {
          width: 100px;
          height: 100px;
        }
      }
    `}</style>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Memoized SharedPhotoDisplay for performance optimization
 * Only re-renders when props change
 */
export const SharedPhotoDisplay = memo(SharedPhotoDisplayComponent)

export default SharedPhotoDisplay
