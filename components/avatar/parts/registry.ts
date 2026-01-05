/**
 * SVG Part Registry
 *
 * Manages loading and caching of SVG avatar parts.
 * Parts are organized by layer type and variant ID.
 */

import type { LayerName } from './composer';

// =============================================================================
// Part Storage
// =============================================================================

/**
 * In-memory registry of SVG parts.
 * Structure: { layerName: { partId: svgString } }
 */
const partRegistry: Map<string, Map<string, string>> = new Map();

/**
 * Track which parts have been registered
 */
const registeredParts: Set<string> = new Set();

// =============================================================================
// Registration Functions
// =============================================================================

/**
 * Register a single SVG part
 */
export function registerPart(
  layer: LayerName | string,
  partId: string,
  svg: string
): void {
  let layerMap = partRegistry.get(layer);
  if (!layerMap) {
    layerMap = new Map();
    partRegistry.set(layer, layerMap);
  }

  layerMap.set(partId, svg);
  registeredParts.add(`${layer}:${partId}`);
}

/**
 * Register multiple parts for a layer
 */
export function registerParts(
  layer: LayerName | string,
  parts: Record<string, string>
): void {
  for (const [partId, svg] of Object.entries(parts)) {
    registerPart(layer, partId, svg);
  }
}

/**
 * Register parts from a module that exports SVG strings
 */
export function registerPartsFromModule(
  layer: LayerName | string,
  module: Record<string, unknown>
): void {
  for (const [key, value] of Object.entries(module)) {
    if (typeof value === 'string' && value.includes('<svg')) {
      registerPart(layer, key, value);
    }
  }
}

// =============================================================================
// Retrieval Functions
// =============================================================================

/**
 * Get an SVG part by layer and ID
 */
export function getPartSvg(
  layer: LayerName | string,
  partId: string
): string | null {
  const layerMap = partRegistry.get(layer);
  if (!layerMap) {
    return null;
  }

  return layerMap.get(partId) ?? null;
}

/**
 * Check if a part exists
 */
export function hasPartSvg(
  layer: LayerName | string,
  partId: string
): boolean {
  return registeredParts.has(`${layer}:${partId}`);
}

/**
 * Get all part IDs for a layer
 */
export function getLayerPartIds(layer: LayerName | string): string[] {
  const layerMap = partRegistry.get(layer);
  if (!layerMap) {
    return [];
  }
  return Array.from(layerMap.keys());
}

/**
 * Get all registered layers
 */
export function getRegisteredLayers(): string[] {
  return Array.from(partRegistry.keys());
}

/**
 * Get count of registered parts
 */
export function getPartCount(): number {
  return registeredParts.size;
}

// =============================================================================
// Clear/Reset
// =============================================================================

/**
 * Clear all registered parts
 */
export function clearRegistry(): void {
  partRegistry.clear();
  registeredParts.clear();
}

/**
 * Clear parts for a specific layer
 */
export function clearLayer(layer: LayerName | string): void {
  const layerMap = partRegistry.get(layer);
  if (layerMap) {
    for (const partId of layerMap.keys()) {
      registeredParts.delete(`${layer}:${partId}`);
    }
    partRegistry.delete(layer);
  }
}

// =============================================================================
// Debug/Development
// =============================================================================

/**
 * Get registry stats for debugging
 */
export function getRegistryStats(): {
  totalParts: number;
  layerCounts: Record<string, number>;
} {
  const layerCounts: Record<string, number> = {};

  for (const [layer, layerMap] of partRegistry.entries()) {
    layerCounts[layer] = layerMap.size;
  }

  return {
    totalParts: registeredParts.size,
    layerCounts,
  };
}

/**
 * Log registry contents for debugging
 */
export function logRegistry(): void {
  console.log('[avatar/registry] Registry contents:');
  const stats = getRegistryStats();
  console.log(`  Total parts: ${stats.totalParts}`);
  for (const [layer, count] of Object.entries(stats.layerCounts)) {
    console.log(`  ${layer}: ${count} parts`);
  }
}

// =============================================================================
// Default/Placeholder Parts
// =============================================================================

/**
 * Register placeholder parts for development/testing.
 * These provide basic shapes when actual assets aren't loaded.
 */
export function registerPlaceholderParts(): void {
  // Placeholder head (oval face shape)
  registerPart(
    'head',
    'oval',
    `<svg viewBox="0 0 200 200">
      <ellipse cx="100" cy="100" rx="70" ry="85" fill="{{skin}}" />
      <ellipse cx="100" cy="105" rx="65" ry="80" fill="{{skinShadow}}" opacity="0.1" />
    </svg>`
  );

  registerPart(
    'head',
    'round',
    `<svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="75" fill="{{skin}}" />
    </svg>`
  );

  registerPart(
    'head',
    'square',
    `<svg viewBox="0 0 200 200">
      <rect x="30" y="20" width="140" height="160" rx="20" fill="{{skin}}" />
    </svg>`
  );

  // Placeholder eyes
  registerPart(
    'eyes',
    'almond',
    `<svg viewBox="0 0 200 200">
      <g transform="translate(60, 85)">
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="{{eyeWhite}}" />
        <circle cx="0" cy="0" r="5" fill="{{eye}}" />
        <circle cx="1" cy="-1" r="2" fill="{{eyePupil}}" />
      </g>
      <g transform="translate(140, 85)">
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="{{eyeWhite}}" />
        <circle cx="0" cy="0" r="5" fill="{{eye}}" />
        <circle cx="1" cy="-1" r="2" fill="{{eyePupil}}" />
      </g>
    </svg>`
  );

  registerPart(
    'eyes',
    'round',
    `<svg viewBox="0 0 200 200">
      <g transform="translate(60, 85)">
        <circle cx="0" cy="0" r="10" fill="{{eyeWhite}}" />
        <circle cx="0" cy="0" r="6" fill="{{eye}}" />
        <circle cx="1" cy="-1" r="2.5" fill="{{eyePupil}}" />
      </g>
      <g transform="translate(140, 85)">
        <circle cx="0" cy="0" r="10" fill="{{eyeWhite}}" />
        <circle cx="0" cy="0" r="6" fill="{{eye}}" />
        <circle cx="1" cy="-1" r="2.5" fill="{{eyePupil}}" />
      </g>
    </svg>`
  );

  // Placeholder eyebrows
  registerPart(
    'eyebrows',
    'natural',
    `<svg viewBox="0 0 200 200">
      <path d="M45 70 Q60 65 75 70" stroke="{{eyebrow}}" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M125 70 Q140 65 155 70" stroke="{{eyebrow}}" stroke-width="3" fill="none" stroke-linecap="round" />
    </svg>`
  );

  // Placeholder nose
  registerPart(
    'nose',
    'straight',
    `<svg viewBox="0 0 200 200">
      <path d="M100 90 L100 115 Q95 125 90 125 Q100 130 110 125 Q105 125 100 115" fill="{{skinShadow}}" opacity="0.3" />
    </svg>`
  );

  // Placeholder mouth
  registerPart(
    'mouth',
    'neutral',
    `<svg viewBox="0 0 200 200">
      <path d="M80 145 Q100 150 120 145" stroke="{{lip}}" stroke-width="3" fill="none" stroke-linecap="round" />
    </svg>`
  );

  registerPart(
    'mouth',
    'smile',
    `<svg viewBox="0 0 200 200">
      <path d="M75 140 Q100 160 125 140" stroke="{{lip}}" stroke-width="4" fill="none" stroke-linecap="round" />
    </svg>`
  );

  // Placeholder hair (front)
  registerPart(
    'hairFront',
    'sidePart_front',
    `<svg viewBox="0 0 200 200">
      <path d="M30 60 Q50 20 100 25 Q150 20 170 60 Q160 40 100 45 Q40 40 30 60" fill="{{hair}}" />
    </svg>`
  );

  // Placeholder body
  registerPart(
    'body',
    'average',
    `<svg viewBox="0 0 200 400">
      <ellipse cx="100" cy="280" rx="60" ry="100" fill="{{skin}}" />
    </svg>`
  );

  // Placeholder top
  registerPart(
    'top',
    'tshirt',
    `<svg viewBox="0 0 200 400">
      <path d="M40 200 L40 320 L160 320 L160 200 Q140 180 100 180 Q60 180 40 200" fill="{{top}}" />
      <path d="M40 200 L20 240 L40 260 L40 200" fill="{{top}}" />
      <path d="M160 200 L180 240 L160 260 L160 200" fill="{{top}}" />
    </svg>`
  );

  // Placeholder bottom
  registerPart(
    'bottom',
    'jeans',
    `<svg viewBox="0 0 200 400">
      <path d="M45 320 L45 390 L95 390 L100 320 L105 390 L155 390 L155 320 Z" fill="{{bottom}}" />
    </svg>`
  );

  // Placeholder glasses
  registerPart(
    'glasses',
    'reading',
    `<svg viewBox="0 0 200 200">
      <rect x="40" y="78" width="40" height="25" rx="5" fill="none" stroke="{{glassesFrame}}" stroke-width="2" />
      <rect x="120" y="78" width="40" height="25" rx="5" fill="none" stroke="{{glassesFrame}}" stroke-width="2" />
      <path d="M80 90 L120 90" stroke="{{glassesFrame}}" stroke-width="2" />
    </svg>`
  );

  // Placeholder ears
  registerPart(
    'ears',
    'default',
    `<svg viewBox="0 0 200 200">
      <ellipse cx="25" cy="100" rx="8" ry="15" fill="{{skin}}" />
      <ellipse cx="175" cy="100" rx="8" ry="15" fill="{{skin}}" />
    </svg>`
  );

  // Placeholder neck
  registerPart(
    'neck',
    'default',
    `<svg viewBox="0 0 200 200">
      <rect x="85" y="175" width="30" height="25" fill="{{skin}}" />
    </svg>`
  );

  console.log('[avatar/registry] Registered placeholder parts');
}

// =============================================================================
// Initialization
// =============================================================================

// Auto-register placeholder parts on module load
registerPlaceholderParts();
