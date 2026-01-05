/**
 * Custom Avatar System - Constants and Utilities
 *
 * Provides helper functions for accessing attribute options,
 * color values, and metadata for the avatar creator UI.
 */

import {
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
  type AvatarAttribute,
  type SkinTone,
  type HairColor,
  type HairStyle,
  type FacialHairType,
  type FaceShape,
  type EyeShape,
  type EyeColor,
  type EyebrowStyle,
  type NoseShape,
  type MouthType,
  type BodyShape,
  type HeightCategory,
  type ClothingTop,
  type ClothingBottom,
  type ClothingColor,
  type GlassesType,
  type HeadwearType,
} from './types';

// =============================================================================
// ATTRIBUTE OPTION ACCESSORS
// =============================================================================

export interface AttributeOption<T extends string = string> {
  value: T;
  label: string;
  color?: string;
  preview?: string;
}

/**
 * Get all options for a given attribute with labels and colors
 */
export function getAttributeOptions(
  attribute: AvatarAttribute
): AttributeOption[] {
  switch (attribute) {
    case 'skinTone':
      return Object.entries(SKIN_TONES).map(([value, color]) => ({
        value: value as SkinTone,
        label: formatLabel(value),
        color,
      }));

    case 'hairColor':
    case 'facialHairColor':
      return Object.entries(HAIR_COLORS).map(([value, color]) => ({
        value: value as HairColor,
        label: formatLabel(value),
        color,
      }));

    case 'hairStyle':
      return Object.entries(HAIR_STYLES).map(([value, label]) => ({
        value: value as HairStyle,
        label,
      }));

    case 'facialHair':
      return Object.entries(FACIAL_HAIR_TYPES).map(([value, label]) => ({
        value: value as FacialHairType,
        label,
      }));

    case 'faceShape':
      return Object.entries(FACE_SHAPES).map(([value, label]) => ({
        value: value as FaceShape,
        label,
      }));

    case 'eyeShape':
      return Object.entries(EYE_SHAPES).map(([value, label]) => ({
        value: value as EyeShape,
        label,
      }));

    case 'eyeColor':
      return Object.entries(EYE_COLORS).map(([value, color]) => ({
        value: value as EyeColor,
        label: formatLabel(value),
        color,
      }));

    case 'eyebrowStyle':
      return Object.entries(EYEBROW_STYLES).map(([value, label]) => ({
        value: value as EyebrowStyle,
        label,
      }));

    case 'noseShape':
      return Object.entries(NOSE_SHAPES).map(([value, label]) => ({
        value: value as NoseShape,
        label,
      }));

    case 'mouthExpression':
      return Object.entries(MOUTH_TYPES).map(([value, label]) => ({
        value: value as MouthType,
        label,
      }));

    case 'bodyShape':
      return Object.entries(BODY_SHAPES).map(([value, label]) => ({
        value: value as BodyShape,
        label,
      }));

    case 'heightCategory':
      return Object.entries(HEIGHT_CATEGORIES).map(([value, label]) => ({
        value: value as HeightCategory,
        label,
      }));

    case 'topType':
      return Object.entries(CLOTHING_TOPS).map(([value, label]) => ({
        value: value as ClothingTop,
        label,
      }));

    case 'bottomType':
      return Object.entries(CLOTHING_BOTTOMS).map(([value, label]) => ({
        value: value as ClothingBottom,
        label,
      }));

    case 'topColor':
    case 'bottomColor':
      return Object.entries(CLOTHING_COLORS).map(([value, color]) => ({
        value: value as ClothingColor,
        label: formatLabel(value),
        color,
      }));

    case 'glasses':
      return Object.entries(GLASSES_TYPES).map(([value, label]) => ({
        value: value as GlassesType,
        label,
      }));

    case 'headwear':
      return Object.entries(HEADWEAR_TYPES).map(([value, label]) => ({
        value: value as HeadwearType,
        label,
      }));

    default:
      return [];
  }
}

/**
 * Check if an attribute uses color selection (vs option grid)
 */
export function isColorAttribute(attribute: AvatarAttribute): boolean {
  return [
    'skinTone',
    'hairColor',
    'facialHairColor',
    'eyeColor',
    'topColor',
    'bottomColor',
  ].includes(attribute);
}

/**
 * Get the color value for a color-based attribute
 */
export function getColorValue(
  attribute: AvatarAttribute,
  value: string
): string | undefined {
  switch (attribute) {
    case 'skinTone':
      return SKIN_TONES[value as SkinTone];
    case 'hairColor':
    case 'facialHairColor':
      return HAIR_COLORS[value as HairColor];
    case 'eyeColor':
      return EYE_COLORS[value as EyeColor];
    case 'topColor':
    case 'bottomColor':
      return CLOTHING_COLORS[value as ClothingColor];
    default:
      return undefined;
  }
}

/**
 * Get human-readable label for an attribute value
 */
export function getAttributeLabel(
  attribute: AvatarAttribute,
  value: string
): string {
  const options = getAttributeOptions(attribute);
  const option = options.find((opt) => opt.value === value);
  return option?.label || formatLabel(value);
}

// =============================================================================
// HAIR STYLE CATEGORIES (for organized UI)
// =============================================================================

export type HairStyleCategory =
  | 'bald'
  | 'short'
  | 'medium'
  | 'long'
  | 'curly'
  | 'bob'
  | 'covered';

export const HAIR_STYLE_CATEGORIES: Record<HairStyleCategory, HairStyle[]> = {
  bald: ['bald', 'shaved', 'buzzCut'],
  short: ['crew', 'fade', 'undercut', 'spiky', 'textured', 'caesar'],
  medium: [
    'slickBack',
    'sidePart',
    'quiff',
    'pompadour',
    'messyMedium',
    'curtains',
  ],
  long: [
    'longStraight',
    'longWavy',
    'longCurly',
    'ponytail',
    'bun',
    'braids',
    'halfUp',
  ],
  curly: ['afro', 'afroSmall', 'coils', 'locs', 'twists', 'cornrows'],
  bob: ['bobShort', 'bobLong', 'bobLayered', 'pixie'],
  covered: ['hijab', 'turban', 'headwrap', 'durag'],
};

export const HAIR_STYLE_CATEGORY_LABELS: Record<HairStyleCategory, string> = {
  bald: 'Bald/Shaved',
  short: 'Short',
  medium: 'Medium',
  long: 'Long',
  curly: 'Curly/Textured',
  bob: 'Bob/Pixie',
  covered: 'Covered',
};

/**
 * Get the category for a hair style
 */
export function getHairStyleCategory(
  style: HairStyle
): HairStyleCategory | undefined {
  for (const [category, styles] of Object.entries(HAIR_STYLE_CATEGORIES)) {
    if (styles.includes(style)) {
      return category as HairStyleCategory;
    }
  }
  return undefined;
}

// =============================================================================
// SIMILARITY GROUPS (for fuzzy matching)
// =============================================================================

/**
 * Groups of similar attribute values for fuzzy matching.
 * Values in the same group get partial match credit.
 */
export const SIMILARITY_GROUPS: Partial<
  Record<AvatarAttribute, string[][]>
> = {
  skinTone: [
    ['fair1', 'fair2'],
    ['light1', 'light2'],
    ['medium1', 'medium2'],
    ['olive1', 'olive2'],
    ['brown1', 'brown2'],
    ['dark1', 'dark2'],
  ],
  hairColor: [
    ['black', 'darkBrown'],
    ['brown', 'lightBrown'],
    ['auburn', 'red'],
    ['blonde', 'strawberry'],
    ['platinum', 'white'],
    ['gray', 'white'],
  ],
  hairStyle: [
    ['bald', 'shaved', 'buzzCut'],
    ['crew', 'fade', 'undercut'],
    ['slickBack', 'sidePart', 'pompadour'],
    ['longStraight', 'longWavy'],
    ['afro', 'afroSmall', 'coils'],
    ['ponytail', 'bun'],
    ['bobShort', 'bobLong', 'bobLayered', 'pixie'],
    ['hijab', 'turban', 'headwrap'],
  ],
  facialHair: [
    ['none'],
    ['stubble', 'soulPatch'],
    ['goatee', 'vandyke'],
    ['shortBeard', 'mediumBeard', 'longBeard', 'fullBeard'],
    ['mustache', 'handlebar'],
  ],
  bodyShape: [
    ['slim', 'average'],
    ['average', 'athletic'],
    ['athletic', 'muscular'],
    ['average', 'plus'],
  ],
  glasses: [
    ['none'],
    ['reading', 'round', 'square', 'cat'],
    ['aviator', 'aviatorSun'],
    ['sunglasses', 'aviatorSun', 'sport'],
  ],
};

/**
 * Get similarity score between two attribute values (0-1)
 */
export function getAttributeSimilarity(
  attribute: AvatarAttribute,
  value1: string,
  value2: string
): number {
  // Exact match
  if (value1 === value2) return 1;

  // Check similarity groups
  const groups = SIMILARITY_GROUPS[attribute];
  if (!groups) return 0;

  for (const group of groups) {
    if (group.includes(value1) && group.includes(value2)) {
      // Same group = 70% match
      return 0.7;
    }
  }

  return 0;
}

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Format a camelCase value to Title Case label
 */
function formatLabel(value: string): string {
  // Handle numbered values like 'fair1' -> 'Fair 1'
  const withSpaces = value.replace(/([0-9]+)/g, ' $1');

  // Convert camelCase to Title Case
  return withSpaces
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Get random value for an attribute
 */
export function getRandomAttributeValue<T extends string>(
  attribute: AvatarAttribute
): T {
  const options = getAttributeOptions(attribute);
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex].value as T;
}

/**
 * Validate that a value is valid for an attribute
 */
export function isValidAttributeValue(
  attribute: AvatarAttribute,
  value: unknown
): boolean {
  if (typeof value !== 'string') return false;
  const options = getAttributeOptions(attribute);
  return options.some((opt) => opt.value === value);
}
