/**
 * Avatar Display Component
 *
 * Main component for displaying custom avatars.
 * Handles loading states, fallbacks, and caching.
 */

import React, { useState, useCallback } from 'react';
import { ViewStyle } from 'react-native';
import {
  AVATAR_SIZES,
  type AvatarSize,
  type AvatarView,
  type CustomAvatarConfig,
  type StoredCustomAvatar,
} from '../types';
import { AvatarSvg } from './AvatarSvg';
import { AvatarPlaceholder } from './AvatarPlaceholder';

// =============================================================================
// Props
// =============================================================================

export interface AvatarDisplayProps {
  /** Avatar to display (config or stored avatar) */
  avatar: CustomAvatarConfig | StoredCustomAvatar | null | undefined;
  /** Size preset or pixel value */
  size?: AvatarSize | number;
  /** Display view type */
  view?: AvatarView;
  /** Show full body (shorthand for view="fullBody") */
  fullBody?: boolean;
  /** Container style */
  style?: ViewStyle;
  /** Custom fallback when no avatar */
  fallback?: React.ReactNode;
  /** Show loading indicator while rendering */
  showLoading?: boolean;
  /** Test ID */
  testID?: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Extract config from avatar (handles both config and stored avatar)
 */
function extractConfig(
  avatar: CustomAvatarConfig | StoredCustomAvatar | null | undefined
): CustomAvatarConfig | null {
  if (!avatar) return null;

  // Check if it's a StoredCustomAvatar (has 'config' property)
  if ('config' in avatar && avatar.config) {
    return avatar.config;
  }

  // Check if it's a CustomAvatarConfig (has 'skinTone' property)
  if ('skinTone' in avatar) {
    return avatar as CustomAvatarConfig;
  }

  return null;
}

// =============================================================================
// Component
// =============================================================================

export function AvatarDisplay({
  avatar,
  size = 'md',
  view: viewProp,
  fullBody = false,
  style,
  fallback,
  showLoading = true,
  testID,
}: AvatarDisplayProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Determine view type
  const view: AvatarView = viewProp ?? (fullBody ? 'fullBody' : 'portrait');

  // Extract config
  const config = extractConfig(avatar);

  // Handlers
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // No avatar provided
  if (!config) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <AvatarPlaceholder
        size={size}
        view={view}
        style={style}
        testID={testID}
      />
    );
  }

  // Has error
  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <AvatarPlaceholder
        size={size}
        view={view}
        style={style}
        testID={testID}
      />
    );
  }

  return (
    <>
      {/* Show placeholder while loading */}
      {isLoading && showLoading && (
        <AvatarPlaceholder
          size={size}
          view={view}
          isLoading
          style={style}
          testID={testID ? `${testID}-loading` : undefined}
        />
      )}

      {/* Render avatar (will be null while loading) */}
      {!isLoading || !showLoading ? (
        <AvatarSvg
          config={config}
          size={size}
          view={view}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
          testID={testID}
        />
      ) : (
        <AvatarSvg
          config={config}
          size={size}
          view={view}
          style={[style, { position: 'absolute', opacity: 0 }]}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </>
  );
}

// =============================================================================
// Size Preset Components
// =============================================================================

type PresetProps = Omit<AvatarDisplayProps, 'size'>;

/** Extra small avatar (32px) - for inline text, badges */
export function XSAvatarDisplay(props: PresetProps): React.JSX.Element {
  return <AvatarDisplay {...props} size="xs" />;
}

/** Small avatar (48px) - for list items */
export function SmallAvatarDisplay(props: PresetProps): React.JSX.Element {
  return <AvatarDisplay {...props} size="sm" />;
}

/** Medium avatar (80px) - for cards */
export function MediumAvatarDisplay(props: PresetProps): React.JSX.Element {
  return <AvatarDisplay {...props} size="md" />;
}

/** Large avatar (120px) - for profile sections */
export function LargeAvatarDisplay(props: PresetProps): React.JSX.Element {
  return <AvatarDisplay {...props} size="lg" />;
}

/** Extra large avatar (200px) - for detail views, creator preview */
export function XLAvatarDisplay(props: PresetProps): React.JSX.Element {
  return <AvatarDisplay {...props} size="xl" />;
}

/** Full body avatar display */
export function FullBodyAvatarDisplay(
  props: Omit<PresetProps, 'fullBody'>
): React.JSX.Element {
  return <AvatarDisplay {...props} fullBody />;
}

// =============================================================================
// Exports
// =============================================================================

export { AvatarSvg } from './AvatarSvg';
export { AvatarPlaceholder } from './AvatarPlaceholder';
export { usePrerenderedAvatar } from './AvatarSvg';

export default AvatarDisplay;
