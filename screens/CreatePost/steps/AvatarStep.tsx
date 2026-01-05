/**
 * AvatarStep Component
 *
 * Step in the CreatePost wizard flow. Allows the user to build an
 * avatar describing the person they saw using the custom avatar creator.
 *
 * @example
 * ```tsx
 * <AvatarStep
 *   avatar={formData.targetAvatar}
 *   onSave={handleAvatarSave}
 *   onBack={handleBack}
 * />
 * ```
 */

import React, { memo, useCallback } from 'react'

import { AvatarCreator } from '../../../components/avatar'
import type { StoredCustomAvatar } from '../../../components/avatar/types'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Props for the AvatarStep component
 */
export interface AvatarStepProps {
  /**
   * Current avatar (if already created)
   */
  avatar: StoredCustomAvatar | null

  /**
   * Callback fired when user saves the avatar and wants to proceed
   * @param avatar - The created avatar
   */
  onSave: (avatar: StoredCustomAvatar) => void

  /**
   * Callback when user wants to go back to previous step
   */
  onBack: () => void

  /**
   * Test ID prefix for testing purposes
   * @default 'create-post'
   */
  testID?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AvatarStep - Avatar building step in the CreatePost wizard
 *
 * Embeds the custom avatar creator to let users describe
 * the person they saw. When the avatar is created, it advances to
 * the next step.
 */
export const AvatarStep = memo(function AvatarStep({
  avatar,
  onSave,
  onBack,
  testID = 'create-post',
}: AvatarStepProps): JSX.Element {
  /**
   * Handle avatar creation complete
   * AvatarCreator already wraps the config in a StoredCustomAvatar
   */
  const handleComplete = useCallback(
    (storedAvatar: StoredCustomAvatar) => {
      onSave(storedAvatar)
    },
    [onSave]
  )

  return (
    <AvatarCreator
      initialConfig={avatar?.config}
      mode="target"
      onComplete={handleComplete}
      onCancel={onBack}
      title="Describe Who You Saw"
      subtitle="Create an avatar that looks like the person you want to connect with"
    />
  )
})

// ============================================================================
// EXPORTS
// ============================================================================

export default AvatarStep
