/**
 * Custom Avatar System - Component Exports
 *
 * SVG-based avatar builder and display components.
 */

// =============================================================================
// Types
// =============================================================================

export type {
  // Core types
  CustomAvatarConfig,
  StoredCustomAvatar,
  AvatarSize,
  AvatarView,
  AvatarAttribute,
  AvatarCategory,
  PartialAvatarConfig,

  // Attribute value types
  SkinTone,
  HairColor,
  HairStyle,
  FacialHairType,
  FaceShape,
  EyeShape,
  EyeColor,
  EyebrowStyle,
  NoseShape,
  MouthType,
  BodyShape,
  HeightCategory,
  ClothingTop,
  ClothingBottom,
  ClothingColor,
  GlassesType,
  HeadwearType,
} from './types';

// =============================================================================
// Constants
// =============================================================================

export {
  // Attribute value maps
  SKIN_TONES,
  HAIR_COLORS,
  HAIR_STYLES,
  FACIAL_HAIR_TYPES,
  FACE_SHAPES,
  EYE_SHAPES,
  EYE_COLORS,
  EYEBROW_STYLES,
  NOSE_SHAPES,
  MOUTH_TYPES,
  BODY_SHAPES,
  HEIGHT_CATEGORIES,
  CLOTHING_TOPS,
  CLOTHING_BOTTOMS,
  CLOTHING_COLORS,
  GLASSES_TYPES,
  HEADWEAR_TYPES,

  // Size presets
  AVATAR_SIZES,

  // Matching configuration
  PRIMARY_ATTRIBUTES,
  SECONDARY_ATTRIBUTES,
  MATCHING_WEIGHTS,

  // Category organization
  AVATAR_CATEGORIES,
} from './types';

// =============================================================================
// Utilities
// =============================================================================

export {
  // Attribute option accessors
  getAttributeOptions,
  isColorAttribute,
  getColorValue,
  getAttributeLabel,

  // Hair style categories
  HAIR_STYLE_CATEGORIES,
  HAIR_STYLE_CATEGORY_LABELS,
  getHairStyleCategory,

  // Similarity matching
  SIMILARITY_GROUPS,
  getAttributeSimilarity,

  // Validation
  getRandomAttributeValue,
  isValidAttributeValue,

  // Types
  type AttributeOption,
  type HairStyleCategory,
} from './constants';

// =============================================================================
// Components
// =============================================================================

// Avatar Display
export {
  AvatarDisplay,
  AvatarSvg,
  AvatarPlaceholder,
  usePrerenderedAvatar,
  // Size presets
  XSAvatarDisplay,
  SmallAvatarDisplay,
  MediumAvatarDisplay,
  LargeAvatarDisplay,
  XLAvatarDisplay,
  FullBodyAvatarDisplay,
  // Types
  type AvatarDisplayProps,
} from './AvatarDisplay';

// Avatar Creator
export {
  AvatarCreator,
  AvatarCreatorProvider,
  useAvatarConfig,
  useAvatarCreatorActions,
  useSelectedCategory,
  usePreviewView,
  useIsDirty,
  useCanUndo,
  useCanRedo,
  PreviewPanel,
  CategoryTabs,
  AttributeGrid,
  ColorPicker,
  type AvatarCreatorProps,
} from './AvatarCreator';

// =============================================================================
// Parts System
// =============================================================================

export {
  // Colorization
  generateColorPalette,
  colorizeSvg,
  colorizeSvgFromConfig,
  darkenColor,
  lightenColor,
  // Composition
  composeAvatar,
  composePortrait,
  composeFullBody,
  validateAvatarParts,
  // Registry
  registerPart,
  registerParts,
  getPartSvg,
  hasPartSvg,
  getLayerPartIds,
  // Types
  type ColorPalette,
  type ComposeOptions,
  type LayerName,
} from './parts';

// =============================================================================
// Cache Utilities
// =============================================================================

export {
  getCachedAvatar,
  cacheAvatar,
  invalidateCache,
  clearAllCaches,
  getCacheStats,
  isInMemoryCache,
  getFromMemoryCache,
  setToMemoryCache,
} from './utils';
