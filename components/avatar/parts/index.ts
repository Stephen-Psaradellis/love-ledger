/**
 * SVG Parts System - Exports
 *
 * Provides compositing, colorization, and part management.
 */

// Colorization
export {
  COLOR_TOKENS,
  darkenColor,
  lightenColor,
  adjustSaturation,
  generateColorPalette,
  colorizeSvg,
  colorizeSvgFromConfig,
  // Shade generation functions
  generateSkinShades,
  generateHairShades,
  generateEyeShades,
  generateClothingShades,
  // Types
  type ColorPalette,
  type SkinShades,
  type HairShades,
  type EyeShades,
  type ClothingShades,
} from './colorizer';

// Composition
export {
  LAYER_ORDER,
  VIEWPORTS,
  composeAvatar,
  composePortrait,
  composeFullBody,
  validateAvatarParts,
  type ComposeOptions,
  type LayerName,
} from './composer';

// Registry
export {
  registerPart,
  registerParts,
  registerPartsFromModule,
  getPartSvg,
  hasPartSvg,
  getLayerPartIds,
  getRegisteredLayers,
  getPartCount,
  clearRegistry,
  clearLayer,
  getRegistryStats,
  logRegistry,
  registerPlaceholderParts,
} from './registry';

// Assets
export { registerAllAssets } from './assets';
