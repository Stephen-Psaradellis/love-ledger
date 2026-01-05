/**
 * Custom Avatar System - Default Configurations
 *
 * Provides default avatar configurations and random generation utilities.
 */

/**
 * Generate a simple unique ID for avatars.
 * Uses timestamp + random string, sufficient for avatar IDs.
 * Avoids crypto.getRandomValues() which isn't available in React Native.
 */
function generateAvatarId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  const randomPart2 = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}-${randomPart2}`;
}
import type {
  CustomAvatarConfig,
  StoredCustomAvatar,
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
  AvatarAttribute,
} from '../../components/avatar/types';

// =============================================================================
// DEFAULT AVATAR CONFIGURATION
// =============================================================================

/**
 * Default avatar configuration used when no values are provided.
 * Represents a neutral, average-looking avatar.
 */
export const DEFAULT_AVATAR_CONFIG: CustomAvatarConfig = {
  // Face
  skinTone: 'medium1',
  faceShape: 'oval',

  // Hair
  hairStyle: 'sidePart',
  hairColor: 'brown',
  facialHair: 'none',
  facialHairColor: 'brown',

  // Eyes
  eyeShape: 'almond',
  eyeColor: 'brown',
  eyebrowStyle: 'natural',

  // Features
  noseShape: 'straight',
  mouthExpression: 'neutral',

  // Body
  bodyShape: 'average',
  heightCategory: 'average',

  // Outfit
  topType: 'tshirt',
  topColor: 'blue',
  bottomType: 'jeans',
  bottomColor: 'navy',

  // Accessories
  glasses: 'none',
  headwear: 'none',
};

/**
 * Current schema version for stored avatars.
 * Increment when making breaking changes to CustomAvatarConfig.
 */
export const AVATAR_SCHEMA_VERSION = 1;

// =============================================================================
// RANDOM GENERATION
// =============================================================================

// Arrays of all valid values for each attribute (for random selection)
const SKIN_TONE_VALUES: SkinTone[] = [
  'fair1',
  'fair2',
  'light1',
  'light2',
  'medium1',
  'medium2',
  'olive1',
  'olive2',
  'brown1',
  'brown2',
  'dark1',
  'dark2',
];

const HAIR_COLOR_VALUES: HairColor[] = [
  'black',
  'darkBrown',
  'brown',
  'lightBrown',
  'auburn',
  'red',
  'strawberry',
  'blonde',
  'platinum',
  'gray',
  'white',
  'blue',
  'purple',
  'pink',
  'green',
];

const HAIR_STYLE_VALUES: HairStyle[] = [
  'bald',
  'shaved',
  'buzzCut',
  'crew',
  'fade',
  'undercut',
  'spiky',
  'textured',
  'caesar',
  'slickBack',
  'sidePart',
  'quiff',
  'pompadour',
  'messyMedium',
  'curtains',
  'longStraight',
  'longWavy',
  'longCurly',
  'ponytail',
  'bun',
  'braids',
  'halfUp',
  'afro',
  'afroSmall',
  'coils',
  'locs',
  'twists',
  'cornrows',
  'bobShort',
  'bobLong',
  'bobLayered',
  'pixie',
  'hijab',
  'turban',
  'headwrap',
  'durag',
  'straightBangs',
  'sideBangs',
  'curlyBangs',
];

const FACIAL_HAIR_VALUES: FacialHairType[] = [
  'none',
  'stubble',
  'goatee',
  'vandyke',
  'shortBeard',
  'mediumBeard',
  'longBeard',
  'fullBeard',
  'mustache',
  'handlebar',
  'soulPatch',
  'chinStrap',
];

const FACE_SHAPE_VALUES: FaceShape[] = [
  'oval',
  'round',
  'square',
  'heart',
  'oblong',
  'diamond',
];

const EYE_SHAPE_VALUES: EyeShape[] = [
  'almond',
  'round',
  'monolid',
  'hooded',
  'downturned',
  'upturned',
  'wide',
  'close',
];

const EYE_COLOR_VALUES: EyeColor[] = [
  'brown',
  'hazel',
  'amber',
  'green',
  'blue',
  'gray',
  'lightBlue',
  'darkBrown',
  'violet',
];

const EYEBROW_STYLE_VALUES: EyebrowStyle[] = [
  'natural',
  'thick',
  'thin',
  'arched',
  'straight',
  'rounded',
  'angledUp',
  'angledDown',
];

const NOSE_SHAPE_VALUES: NoseShape[] = [
  'straight',
  'roman',
  'button',
  'snub',
  'wide',
  'narrow',
  'hooked',
  'flat',
];

const MOUTH_TYPE_VALUES: MouthType[] = [
  'neutral',
  'smile',
  'smileOpen',
  'smirk',
  'serious',
  'slight',
  'pursed',
  'openMouth',
  'frown',
  'thinking',
];

const BODY_SHAPE_VALUES: BodyShape[] = [
  'slim',
  'average',
  'athletic',
  'plus',
  'muscular',
];

const HEIGHT_CATEGORY_VALUES: HeightCategory[] = ['short', 'average', 'tall'];

const CLOTHING_TOP_VALUES: ClothingTop[] = [
  'tshirt',
  'tshirtVneck',
  'polo',
  'buttonUp',
  'blouse',
  'sweater',
  'hoodie',
  'jacket',
  'blazer',
  'tank',
  'crop',
  'turtleneck',
  'cardigan',
  'dress',
  'overall',
];

const CLOTHING_BOTTOM_VALUES: ClothingBottom[] = [
  'jeans',
  'pants',
  'shorts',
  'skirt',
  'skirtLong',
  'leggings',
  'sweatpants',
  'slacks',
];

const CLOTHING_COLOR_VALUES: ClothingColor[] = [
  'black',
  'white',
  'gray',
  'navy',
  'blue',
  'lightBlue',
  'red',
  'burgundy',
  'pink',
  'purple',
  'green',
  'olive',
  'brown',
  'tan',
  'beige',
  'orange',
  'yellow',
  'teal',
  'coral',
  'cream',
];

const GLASSES_TYPE_VALUES: GlassesType[] = [
  'none',
  'reading',
  'round',
  'square',
  'aviator',
  'cat',
  'sunglasses',
  'aviatorSun',
  'sport',
];

const HEADWEAR_TYPE_VALUES: HeadwearType[] = [
  'none',
  'cap',
  'beanie',
  'fedora',
  'bucket',
  'snapback',
  'visor',
  'bandana',
  'headband',
  'beret',
];

/**
 * Get a random value from an array
 */
function randomFrom<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random value for a specific attribute
 */
export function getRandomValue<T extends string>(attribute: AvatarAttribute): T {
  switch (attribute) {
    case 'skinTone':
      return randomFrom(SKIN_TONE_VALUES) as T;
    case 'hairColor':
    case 'facialHairColor':
      return randomFrom(HAIR_COLOR_VALUES) as T;
    case 'hairStyle':
      return randomFrom(HAIR_STYLE_VALUES) as T;
    case 'facialHair':
      return randomFrom(FACIAL_HAIR_VALUES) as T;
    case 'faceShape':
      return randomFrom(FACE_SHAPE_VALUES) as T;
    case 'eyeShape':
      return randomFrom(EYE_SHAPE_VALUES) as T;
    case 'eyeColor':
      return randomFrom(EYE_COLOR_VALUES) as T;
    case 'eyebrowStyle':
      return randomFrom(EYEBROW_STYLE_VALUES) as T;
    case 'noseShape':
      return randomFrom(NOSE_SHAPE_VALUES) as T;
    case 'mouthExpression':
      return randomFrom(MOUTH_TYPE_VALUES) as T;
    case 'bodyShape':
      return randomFrom(BODY_SHAPE_VALUES) as T;
    case 'heightCategory':
      return randomFrom(HEIGHT_CATEGORY_VALUES) as T;
    case 'topType':
      return randomFrom(CLOTHING_TOP_VALUES) as T;
    case 'topColor':
    case 'bottomColor':
      return randomFrom(CLOTHING_COLOR_VALUES) as T;
    case 'bottomType':
      return randomFrom(CLOTHING_BOTTOM_VALUES) as T;
    case 'glasses':
      return randomFrom(GLASSES_TYPE_VALUES) as T;
    case 'headwear':
      return randomFrom(HEADWEAR_TYPE_VALUES) as T;
    default:
      throw new Error(`Unknown attribute: ${attribute}`);
  }
}

/**
 * Generate a completely random avatar configuration
 */
export function generateRandomAvatarConfig(): CustomAvatarConfig {
  // Decide if facial hair should match hair color or be different
  const hairColor = randomFrom(HAIR_COLOR_VALUES);
  const hasFacialHair = Math.random() > 0.5;
  const facialHair = hasFacialHair
    ? randomFrom(FACIAL_HAIR_VALUES.filter((v) => v !== 'none'))
    : 'none';

  // 20% chance of having glasses
  const glasses =
    Math.random() > 0.8
      ? randomFrom(GLASSES_TYPE_VALUES.filter((v) => v !== 'none'))
      : 'none';

  // 15% chance of having headwear
  const headwear =
    Math.random() > 0.85
      ? randomFrom(HEADWEAR_TYPE_VALUES.filter((v) => v !== 'none'))
      : 'none';

  return {
    skinTone: randomFrom(SKIN_TONE_VALUES),
    hairColor,
    hairStyle: randomFrom(HAIR_STYLE_VALUES),
    facialHair,
    facialHairColor: hasFacialHair ? hairColor : 'brown', // Match hair color if present
    faceShape: randomFrom(FACE_SHAPE_VALUES),
    eyeShape: randomFrom(EYE_SHAPE_VALUES),
    eyeColor: randomFrom(EYE_COLOR_VALUES),
    eyebrowStyle: randomFrom(EYEBROW_STYLE_VALUES),
    noseShape: randomFrom(NOSE_SHAPE_VALUES),
    mouthExpression: randomFrom(MOUTH_TYPE_VALUES),
    bodyShape: randomFrom(BODY_SHAPE_VALUES),
    heightCategory: randomFrom(HEIGHT_CATEGORY_VALUES),
    topType: randomFrom(CLOTHING_TOP_VALUES),
    topColor: randomFrom(CLOTHING_COLOR_VALUES),
    bottomType: randomFrom(CLOTHING_BOTTOM_VALUES),
    bottomColor: randomFrom(CLOTHING_COLOR_VALUES),
    glasses,
    headwear,
  };
}

/**
 * Generate a random avatar with some constraints
 */
export function generateRandomAvatarWithConstraints(
  constraints: Partial<CustomAvatarConfig>
): CustomAvatarConfig {
  const random = generateRandomAvatarConfig();
  return {
    ...random,
    ...constraints,
  };
}

// =============================================================================
// STORED AVATAR CREATION
// =============================================================================

/**
 * Create a new StoredCustomAvatar from a config
 */
export function createStoredAvatar(
  config: CustomAvatarConfig,
  id?: string
): StoredCustomAvatar {
  const now = new Date().toISOString();
  return {
    id: id || generateAvatarId(),
    config,
    version: AVATAR_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Create a default stored avatar
 */
export function createDefaultStoredAvatar(): StoredCustomAvatar {
  return createStoredAvatar(DEFAULT_AVATAR_CONFIG);
}

/**
 * Create a random stored avatar
 */
export function createRandomStoredAvatar(): StoredCustomAvatar {
  return createStoredAvatar(generateRandomAvatarConfig());
}

// =============================================================================
// NORMALIZATION
// =============================================================================

/**
 * Normalize a partial avatar config by filling missing values with defaults
 */
export function normalizeAvatarConfig(
  partial: Partial<CustomAvatarConfig>
): CustomAvatarConfig {
  return {
    ...DEFAULT_AVATAR_CONFIG,
    ...partial,
  };
}

/**
 * Validate and normalize a stored avatar
 */
export function normalizeStoredAvatar(
  avatar: Partial<StoredCustomAvatar>
): StoredCustomAvatar {
  const now = new Date().toISOString();

  return {
    id: avatar.id || generateAvatarId(),
    config: normalizeAvatarConfig(avatar.config || {}),
    version: avatar.version || AVATAR_SCHEMA_VERSION,
    createdAt: avatar.createdAt || now,
    updatedAt: avatar.updatedAt || now,
  };
}
