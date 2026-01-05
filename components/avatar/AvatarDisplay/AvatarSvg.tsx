/**
 * Avatar SVG Renderer
 *
 * Renders a composed avatar SVG from configuration.
 * Handles caching and memoization for performance.
 */

import React, { useMemo, useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  AVATAR_SIZES,
  type AvatarSize,
  type AvatarView,
  type CustomAvatarConfig,
} from '../types';
import { composeAvatar } from '../parts/composer';
import {
  getFromMemoryCache,
  setToMemoryCache,
  getCachedAvatar,
  cacheAvatar,
} from '../utils/cache';

// =============================================================================
// Props
// =============================================================================

export interface AvatarSvgProps {
  /** Avatar configuration to render */
  config: CustomAvatarConfig;
  /** Size preset or pixel value */
  size?: AvatarSize | number;
  /** Display view type */
  view?: AvatarView;
  /** Container style */
  style?: ViewStyle;
  /** Called when SVG is rendered */
  onLoad?: () => void;
  /** Called on render error */
  onError?: (error: Error) => void;
  /** Test ID */
  testID?: string;
}

// =============================================================================
// Component
// =============================================================================

export const AvatarSvg = React.memo(function AvatarSvg({
  config,
  size = 'md',
  view = 'portrait',
  style,
  onLoad,
  onError,
  testID,
}: AvatarSvgProps): React.JSX.Element | null {
  // Resolve size
  const pixelSize = typeof size === 'number' ? size : AVATAR_SIZES[size];
  const height = view === 'portrait' ? pixelSize : pixelSize * 2;

  // State for async cache loading
  const [cachedSvg, setCachedSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Try to get from memory cache synchronously first
  const memoryCachedSvg = useMemo(() => {
    return getFromMemoryCache(config, view);
  }, [config, view]);

  // Compose or load from cache
  useEffect(() => {
    let mounted = true;

    async function loadSvg() {
      // Already have from memory cache
      if (memoryCachedSvg) {
        if (mounted) {
          setCachedSvg(memoryCachedSvg);
          setIsLoading(false);
          onLoad?.();
        }
        return;
      }

      try {
        // Try async cache
        const cacheResult = await getCachedAvatar(config, view);

        if (cacheResult.svg) {
          if (mounted) {
            setCachedSvg(cacheResult.svg);
            setIsLoading(false);
            onLoad?.();
          }
          return;
        }

        // Compose new SVG
        const svg = composeAvatar({
          config,
          view,
          size: pixelSize,
        });

        // Cache it
        setToMemoryCache(config, view, svg);
        cacheAvatar(config, view, svg); // Async, don't await

        if (mounted) {
          setCachedSvg(svg);
          setIsLoading(false);
          onLoad?.();
        }
      } catch (error) {
        console.error('[AvatarSvg] Error composing avatar:', error);
        if (mounted) {
          setIsLoading(false);
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
      }
    }

    loadSvg();

    return () => {
      mounted = false;
    };
  }, [config, view, pixelSize, memoryCachedSvg, onLoad, onError]);

  // Memoize the final SVG (use memory cache or state)
  const svgXml = memoryCachedSvg || cachedSvg;

  if (!svgXml) {
    // Still loading or error - return null (parent should show placeholder)
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: pixelSize,
          height,
          borderRadius: Math.min(pixelSize, height) * 0.05,
        },
        style,
      ]}
      testID={testID}
    >
      <SvgXml
        xml={svgXml}
        width={pixelSize}
        height={height}
      />
    </View>
  );
});

// =============================================================================
// Styles
// =============================================================================

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

// =============================================================================
// Hook for Pre-rendering
// =============================================================================

/**
 * Hook to pre-render an avatar SVG
 * Useful for precaching avatars before they're displayed
 */
export function usePrerenderedAvatar(
  config: CustomAvatarConfig | null,
  view: AvatarView = 'portrait'
): { svg: string | null; isLoading: boolean } {
  const [svg, setSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!config);

  useEffect(() => {
    if (!config) {
      setSvg(null);
      setIsLoading(false);
      return;
    }

    let mounted = true;
    setIsLoading(true);

    async function prerender() {
      // Check memory cache
      const cached = getFromMemoryCache(config, view);
      if (cached) {
        if (mounted) {
          setSvg(cached);
          setIsLoading(false);
        }
        return;
      }

      // Check async cache
      const cacheResult = await getCachedAvatar(config, view);
      if (cacheResult.svg) {
        if (mounted) {
          setSvg(cacheResult.svg);
          setIsLoading(false);
        }
        return;
      }

      // Compose new
      const composed = composeAvatar({ config, view });
      setToMemoryCache(config, view, composed);
      cacheAvatar(config, view, composed);

      if (mounted) {
        setSvg(composed);
        setIsLoading(false);
      }
    }

    prerender();

    return () => {
      mounted = false;
    };
  }, [config, view]);

  return { svg, isLoading };
}

// =============================================================================
// Exports
// =============================================================================

export default AvatarSvg;
