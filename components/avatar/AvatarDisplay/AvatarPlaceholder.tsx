/**
 * Avatar Placeholder Component
 *
 * Displays a placeholder when no avatar is available or while loading.
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import Svg, { Circle, Ellipse, Rect } from 'react-native-svg';
import { AVATAR_SIZES, type AvatarSize, type AvatarView } from '../types';

// =============================================================================
// Props
// =============================================================================

export interface AvatarPlaceholderProps {
  /** Size preset or pixel value */
  size?: AvatarSize | number;
  /** Display view type */
  view?: AvatarView;
  /** Show loading spinner */
  isLoading?: boolean;
  /** Container style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

// =============================================================================
// Component
// =============================================================================

export function AvatarPlaceholder({
  size = 'md',
  view = 'portrait',
  isLoading = false,
  style,
  testID,
}: AvatarPlaceholderProps): React.JSX.Element {
  // Resolve size
  const pixelSize = typeof size === 'number' ? size : AVATAR_SIZES[size];
  const aspectRatio = view === 'portrait' ? 1 : 0.5;
  const height = view === 'portrait' ? pixelSize : pixelSize * 2;
  const width = pixelSize;

  // Calculate viewBox dimensions
  const vbWidth = 100;
  const vbHeight = view === 'portrait' ? 100 : 200;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: Math.min(width, height) * 0.1,
        },
        style,
      ]}
      testID={testID}
    >
      <Svg width={width} height={height} viewBox={`0 0 ${vbWidth} ${vbHeight}`}>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={vbWidth}
          height={vbHeight}
          fill="#E5E7EB"
          rx={8}
        />

        {view === 'portrait' ? (
          // Portrait placeholder - head silhouette
          <>
            <Circle cx={50} cy={40} r={25} fill="#D1D5DB" />
            <Ellipse cx={50} cy={90} rx={30} ry={20} fill="#D1D5DB" />
          </>
        ) : (
          // Full body placeholder - full silhouette
          <>
            <Circle cx={50} cy={30} r={18} fill="#D1D5DB" />
            <Ellipse cx={50} cy={100} rx={25} ry={50} fill="#D1D5DB" />
            <Ellipse cx={35} cy={170} rx={12} ry={30} fill="#D1D5DB" />
            <Ellipse cx={65} cy={170} rx={12} ry={30} fill="#D1D5DB" />
          </>
        )}
      </Svg>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size={pixelSize > 60 ? 'small' : 'small'}
            color="#9CA3AF"
          />
        </View>
      )}
    </View>
  );
}

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// =============================================================================
// Exports
// =============================================================================

export default AvatarPlaceholder;
