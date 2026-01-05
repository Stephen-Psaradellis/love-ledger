/**
 * SVG Composer
 *
 * Combines individual SVG parts into a complete avatar.
 * Handles layering, positioning, and scaling.
 */

import type { CustomAvatarConfig, AvatarView } from '../types';
import { colorizeSvgFromConfig } from './colorizer';
import { getPartSvg, hasPartSvg } from './registry';

// =============================================================================
// Composition Configuration
// =============================================================================

/**
 * Layer order for avatar composition (back to front).
 * Parts are rendered in this order to ensure proper overlap.
 */
export const LAYER_ORDER = {
  portrait: [
    'hairBack', // Hair behind head (long hair, ponytails)
    'head', // Base head/face shape
    'ears', // Ears (visible on some face shapes)
    'neck', // Neck (if visible in portrait)
    'eyes', // Eye shapes
    'nose', // Nose shape
    'mouth', // Mouth expression
    'eyebrows', // Eyebrows
    'facialHair', // Facial hair
    'hairFront', // Hair in front (bangs, etc.)
    'glasses', // Glasses
    'headwear', // Hats, caps, etc.
  ],
  fullBody: [
    'hairBack', // Hair behind head
    'body', // Body shape
    'bottom', // Pants, skirts
    'top', // Shirts, jackets
    'neck', // Neck
    'head', // Base head/face shape
    'ears', // Ears
    'eyes', // Eye shapes
    'nose', // Nose shape
    'mouth', // Mouth expression
    'eyebrows', // Eyebrows
    'facialHair', // Facial hair
    'hairFront', // Hair in front
    'glasses', // Glasses
    'headwear', // Hats, caps
  ],
} as const;

export type LayerName = (typeof LAYER_ORDER.portrait)[number];

/**
 * Viewport dimensions for different views
 */
export const VIEWPORTS = {
  portrait: {
    width: 200,
    height: 200,
    offsetX: 0,
    offsetY: 0,
  },
  fullBody: {
    width: 200,
    height: 400,
    offsetX: 0,
    offsetY: 0,
  },
} as const;

// =============================================================================
// Part Mapping
// =============================================================================

/**
 * Map avatar config attributes to part layer names
 */
function getPartMapping(
  config: CustomAvatarConfig,
  view: AvatarView
): Map<LayerName, string | null> {
  const mapping = new Map<LayerName, string | null>();

  // Head/Face - always present
  mapping.set('head', config.faceShape);

  // Hair - split into back and front layers
  if (config.hairStyle !== 'bald') {
    mapping.set('hairBack', `${config.hairStyle}_back`);
    mapping.set('hairFront', `${config.hairStyle}_front`);
  } else {
    mapping.set('hairBack', null);
    mapping.set('hairFront', null);
  }

  // Facial features
  mapping.set('eyes', config.eyeShape);
  mapping.set('eyebrows', config.eyebrowStyle);
  mapping.set('nose', config.noseShape);
  mapping.set('mouth', config.mouthExpression);

  // Facial hair
  if (config.facialHair !== 'none') {
    mapping.set('facialHair', config.facialHair);
  } else {
    mapping.set('facialHair', null);
  }

  // Accessories
  if (config.glasses !== 'none') {
    mapping.set('glasses', config.glasses);
  } else {
    mapping.set('glasses', null);
  }

  if (config.headwear !== 'none') {
    mapping.set('headwear', config.headwear);
  } else {
    mapping.set('headwear', null);
  }

  // Body parts (only for full body view)
  if (view === 'fullBody') {
    mapping.set('body', config.bodyShape);
    mapping.set('top', config.topType);
    mapping.set('bottom', config.bottomType);
    mapping.set('neck', 'default');
  }

  // Ears - usually just default, may be hidden by hair
  mapping.set('ears', 'default');

  return mapping;
}

// =============================================================================
// SVG Composition
// =============================================================================

export interface ComposeOptions {
  /** Avatar configuration */
  config: CustomAvatarConfig;
  /** View type (portrait or full body) */
  view: AvatarView;
  /** Output size in pixels */
  size?: number;
  /** Whether to include the XML declaration */
  includeXmlDeclaration?: boolean;
}

/**
 * Compose a complete avatar SVG from individual parts
 */
export function composeAvatar(options: ComposeOptions): string {
  const {
    config,
    view,
    size = view === 'portrait' ? 200 : 400,
    includeXmlDeclaration = false,
  } = options;

  const viewport = VIEWPORTS[view];
  const layers = LAYER_ORDER[view];
  const partMapping = getPartMapping(config, view);

  // Collect SVG content for each layer
  const layerContents: string[] = [];

  for (const layer of layers) {
    const partId = partMapping.get(layer);

    if (partId === null || partId === undefined) {
      // Layer is explicitly disabled or not mapped
      continue;
    }

    // Try to get the SVG for this part
    const partSvg = getPartSvg(layer, partId);

    if (partSvg) {
      // Colorize the part SVG
      const colorizedSvg = colorizeSvgFromConfig(partSvg, config);

      // Extract just the content (without svg wrapper)
      const content = extractSvgContent(colorizedSvg);
      if (content) {
        layerContents.push(`<!-- ${layer}: ${partId} -->\n<g class="layer-${layer}">${content}</g>`);
      }
    }
  }

  // If no layers were added, return a placeholder
  if (layerContents.length === 0) {
    return composePlaceholder(view, size);
  }

  // Compose the final SVG
  const aspectRatio = viewport.width / viewport.height;
  const outputHeight = view === 'portrait' ? size : size;
  const outputWidth = view === 'portrait' ? size : size * aspectRatio;

  const declaration = includeXmlDeclaration
    ? '<?xml version="1.0" encoding="UTF-8"?>\n'
    : '';

  return `${declaration}<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="${viewport.offsetX} ${viewport.offsetY} ${viewport.width} ${viewport.height}"
  width="${outputWidth}"
  height="${outputHeight}"
  role="img"
  aria-label="Avatar"
>
  <defs>
    <clipPath id="avatar-clip">
      <rect x="0" y="0" width="${viewport.width}" height="${viewport.height}" rx="8" />
    </clipPath>
  </defs>
  <g clip-path="url(#avatar-clip)">
    ${layerContents.join('\n    ')}
  </g>
</svg>`;
}

/**
 * Extract inner content from an SVG string (everything between <svg> tags)
 */
function extractSvgContent(svg: string): string | null {
  // Match content between svg tags
  const match = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  return match ? match[1].trim() : null;
}

/**
 * Compose a placeholder SVG when no parts are available
 */
function composePlaceholder(view: AvatarView, size: number): string {
  const viewport = VIEWPORTS[view];

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${viewport.width} ${viewport.height}"
  width="${size}"
  height="${view === 'portrait' ? size : size * 2}"
  role="img"
  aria-label="Avatar placeholder"
>
  <rect width="100%" height="100%" fill="#E5E7EB" rx="8" />
  <circle cx="${viewport.width / 2}" cy="${viewport.height * 0.35}" r="${viewport.width * 0.2}" fill="#9CA3AF" />
  <ellipse cx="${viewport.width / 2}" cy="${viewport.height * 0.85}" rx="${viewport.width * 0.3}" ry="${viewport.height * 0.2}" fill="#9CA3AF" />
</svg>`;
}

// =============================================================================
// Quick Compose Functions
// =============================================================================

/**
 * Compose a portrait avatar
 */
export function composePortrait(
  config: CustomAvatarConfig,
  size = 200
): string {
  return composeAvatar({ config, view: 'portrait', size });
}

/**
 * Compose a full-body avatar
 */
export function composeFullBody(
  config: CustomAvatarConfig,
  size = 400
): string {
  return composeAvatar({ config, view: 'fullBody', size });
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Check if all required parts are available for a config
 */
export function validateAvatarParts(
  config: CustomAvatarConfig,
  view: AvatarView
): { valid: boolean; missing: string[] } {
  const partMapping = getPartMapping(config, view);
  const missing: string[] = [];

  for (const [layer, partId] of partMapping.entries()) {
    if (partId !== null && !hasPartSvg(layer, partId)) {
      missing.push(`${layer}:${partId}`);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

// =============================================================================
// Export Types
// =============================================================================

export type { LayerName };
