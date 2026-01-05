/**
 * Custom Avatar System - Type Definitions
 *
 * Replaces ReadyPlayerMe with a custom SVG-based avatar builder.
 * All attributes are discrete values enabling accurate matching.
 */

// =============================================================================
// SKIN TONES (Fitzpatrick Scale Extended)
// =============================================================================

export const SKIN_TONES = {
  fair1: '#FFDFC4',
  fair2: '#F0D5BE',
  light1: '#EECEB3',
  light2: '#E1B899',
  medium1: '#D19F7E',
  medium2: '#BB8A68',
  olive1: '#A67C5B',
  olive2: '#8D6748',
  brown1: '#755139',
  brown2: '#5C3D2E',
  dark1: '#3B261C',
  dark2: '#2D1F15',
} as const;

export type SkinTone = keyof typeof SKIN_TONES;

// =============================================================================
// HAIR COLORS
// =============================================================================

export const HAIR_COLORS = {
  black: '#090806',
  darkBrown: '#3B2219',
  brown: '#6A4E42',
  lightBrown: '#A67B5B',
  auburn: '#922724',
  red: '#B55239',
  strawberry: '#D6927B',
  blonde: '#E6BE8A',
  platinum: '#E8E4E1',
  gray: '#9B9B9B',
  white: '#F0F0F0',
  blue: '#4A90D9',
  purple: '#8B5CF6',
  pink: '#EC4899',
  green: '#10B981',
} as const;

export type HairColor = keyof typeof HAIR_COLORS;

// =============================================================================
// HAIR STYLES
// =============================================================================

export const HAIR_STYLES = {
  // Bald/Shaved
  bald: 'Bald',
  shaved: 'Shaved',
  buzzCut: 'Buzz Cut',

  // Short Styles
  crew: 'Crew Cut',
  fade: 'Fade',
  undercut: 'Undercut',
  spiky: 'Spiky',
  textured: 'Textured Short',
  caesar: 'Caesar',

  // Medium Styles
  slickBack: 'Slick Back',
  sidePart: 'Side Part',
  quiff: 'Quiff',
  pompadour: 'Pompadour',
  messyMedium: 'Messy Medium',
  curtains: 'Curtains',

  // Long Styles
  longStraight: 'Long Straight',
  longWavy: 'Long Wavy',
  longCurly: 'Long Curly',
  ponytail: 'Ponytail',
  bun: 'Bun',
  braids: 'Braids',
  halfUp: 'Half Up',

  // Curly/Textured
  afro: 'Afro',
  afroSmall: 'Small Afro',
  coils: 'Coils',
  locs: 'Locs',
  twists: 'Twists',
  cornrows: 'Cornrows',

  // Bob Styles
  bobShort: 'Short Bob',
  bobLong: 'Long Bob',
  bobLayered: 'Layered Bob',
  pixie: 'Pixie Cut',

  // Covered/Accessorized
  hijab: 'Hijab',
  turban: 'Turban',
  headwrap: 'Head Wrap',
  durag: 'Durag',

  // Bangs Variations
  straightBangs: 'Straight with Bangs',
  sideBangs: 'Side Swept Bangs',
  curlyBangs: 'Curly with Bangs',
} as const;

export type HairStyle = keyof typeof HAIR_STYLES;

// =============================================================================
// FACIAL HAIR
// =============================================================================

export const FACIAL_HAIR_TYPES = {
  none: 'None',
  stubble: 'Stubble',
  goatee: 'Goatee',
  vandyke: 'Van Dyke',
  shortBeard: 'Short Beard',
  mediumBeard: 'Medium Beard',
  longBeard: 'Long Beard',
  fullBeard: 'Full Beard',
  mustache: 'Mustache',
  handlebar: 'Handlebar Mustache',
  soulPatch: 'Soul Patch',
  chinStrap: 'Chin Strap',
} as const;

export type FacialHairType = keyof typeof FACIAL_HAIR_TYPES;

// =============================================================================
// FACE SHAPES
// =============================================================================

export const FACE_SHAPES = {
  oval: 'Oval',
  round: 'Round',
  square: 'Square',
  heart: 'Heart',
  oblong: 'Oblong',
  diamond: 'Diamond',
} as const;

export type FaceShape = keyof typeof FACE_SHAPES;

// =============================================================================
// EYE ATTRIBUTES
// =============================================================================

export const EYE_SHAPES = {
  almond: 'Almond',
  round: 'Round',
  monolid: 'Monolid',
  hooded: 'Hooded',
  downturned: 'Downturned',
  upturned: 'Upturned',
  wide: 'Wide Set',
  close: 'Close Set',
} as const;

export type EyeShape = keyof typeof EYE_SHAPES;

export const EYE_COLORS = {
  brown: '#634E34',
  hazel: '#8B7355',
  amber: '#B5651D',
  green: '#3D5B3D',
  blue: '#6699CC',
  gray: '#A5A5A5',
  lightBlue: '#ADD8E6',
  darkBrown: '#3D2314',
  violet: '#8B008B',
  heterochromia: '#GRADIENT',
} as const;

export type EyeColor = keyof typeof EYE_COLORS;

// =============================================================================
// EYEBROWS
// =============================================================================

export const EYEBROW_STYLES = {
  natural: 'Natural',
  thick: 'Thick',
  thin: 'Thin',
  arched: 'Arched',
  straight: 'Straight',
  rounded: 'Rounded',
  angledUp: 'Angled Up',
  angledDown: 'Angled Down',
  unibrow: 'Unibrow',
} as const;

export type EyebrowStyle = keyof typeof EYEBROW_STYLES;

// =============================================================================
// NOSE SHAPES
// =============================================================================

export const NOSE_SHAPES = {
  straight: 'Straight',
  roman: 'Roman',
  button: 'Button',
  snub: 'Snub',
  wide: 'Wide',
  narrow: 'Narrow',
  hooked: 'Hooked',
  flat: 'Flat',
} as const;

export type NoseShape = keyof typeof NOSE_SHAPES;

// =============================================================================
// MOUTH/EXPRESSION
// =============================================================================

export const MOUTH_TYPES = {
  neutral: 'Neutral',
  smile: 'Smile',
  smileOpen: 'Open Smile',
  smirk: 'Smirk',
  serious: 'Serious',
  slight: 'Slight Smile',
  pursed: 'Pursed',
  openMouth: 'Open',
  frown: 'Frown',
  thinking: 'Thinking',
} as const;

export type MouthType = keyof typeof MOUTH_TYPES;

// =============================================================================
// BODY ATTRIBUTES
// =============================================================================

export const BODY_SHAPES = {
  slim: 'Slim',
  average: 'Average',
  athletic: 'Athletic',
  plus: 'Plus',
  muscular: 'Muscular',
} as const;

export type BodyShape = keyof typeof BODY_SHAPES;

export const HEIGHT_CATEGORIES = {
  short: 'Short',
  average: 'Average',
  tall: 'Tall',
} as const;

export type HeightCategory = keyof typeof HEIGHT_CATEGORIES;

// =============================================================================
// CLOTHING
// =============================================================================

export const CLOTHING_TOPS = {
  tshirt: 'T-Shirt',
  tshirtVneck: 'V-Neck T-Shirt',
  polo: 'Polo Shirt',
  buttonUp: 'Button Up Shirt',
  blouse: 'Blouse',
  sweater: 'Sweater',
  hoodie: 'Hoodie',
  jacket: 'Jacket',
  blazer: 'Blazer',
  tank: 'Tank Top',
  crop: 'Crop Top',
  turtleneck: 'Turtleneck',
  cardigan: 'Cardigan',
  dress: 'Dress',
  overall: 'Overalls',
} as const;

export type ClothingTop = keyof typeof CLOTHING_TOPS;

export const CLOTHING_BOTTOMS = {
  jeans: 'Jeans',
  pants: 'Pants',
  shorts: 'Shorts',
  skirt: 'Skirt',
  skirtLong: 'Long Skirt',
  leggings: 'Leggings',
  sweatpants: 'Sweatpants',
  slacks: 'Slacks',
} as const;

export type ClothingBottom = keyof typeof CLOTHING_BOTTOMS;

export const CLOTHING_COLORS = {
  black: '#1A1A1A',
  white: '#FFFFFF',
  gray: '#6B7280',
  navy: '#1E3A5F',
  blue: '#3B82F6',
  lightBlue: '#93C5FD',
  red: '#DC2626',
  burgundy: '#7F1D1D',
  pink: '#EC4899',
  purple: '#8B5CF6',
  green: '#10B981',
  olive: '#6B8E23',
  brown: '#92400E',
  tan: '#D4A574',
  beige: '#F5F5DC',
  orange: '#F97316',
  yellow: '#EAB308',
  teal: '#14B8A6',
  coral: '#FF7F7F',
  cream: '#FFFDD0',
} as const;

export type ClothingColor = keyof typeof CLOTHING_COLORS;

// =============================================================================
// ACCESSORIES
// =============================================================================

export const GLASSES_TYPES = {
  none: 'None',
  reading: 'Reading Glasses',
  round: 'Round Glasses',
  square: 'Square Glasses',
  aviator: 'Aviator',
  cat: 'Cat Eye',
  sunglasses: 'Sunglasses',
  aviatorSun: 'Aviator Sunglasses',
  sport: 'Sport Glasses',
} as const;

export type GlassesType = keyof typeof GLASSES_TYPES;

export const HEADWEAR_TYPES = {
  none: 'None',
  cap: 'Baseball Cap',
  beanie: 'Beanie',
  fedora: 'Fedora',
  bucket: 'Bucket Hat',
  snapback: 'Snapback',
  visor: 'Visor',
  bandana: 'Bandana',
  headband: 'Headband',
  beret: 'Beret',
} as const;

export type HeadwearType = keyof typeof HEADWEAR_TYPES;

// =============================================================================
// MAIN AVATAR CONFIG
// =============================================================================

/**
 * Complete avatar configuration with all matchable attributes.
 * Organized into PRIMARY (60% weight) and SECONDARY (40% weight) for matching.
 */
export interface CustomAvatarConfig {
  // === PRIMARY ATTRIBUTES (60% matching weight) ===
  skinTone: SkinTone;
  hairColor: HairColor;
  hairStyle: HairStyle;
  facialHair: FacialHairType;
  facialHairColor: HairColor;
  faceShape: FaceShape;

  // === SECONDARY ATTRIBUTES (40% matching weight) ===
  eyeShape: EyeShape;
  eyeColor: EyeColor;
  eyebrowStyle: EyebrowStyle;
  noseShape: NoseShape;
  mouthExpression: MouthType;

  // === BODY (for full-body view) ===
  bodyShape: BodyShape;
  heightCategory: HeightCategory;

  // === CLOTHING ===
  topType: ClothingTop;
  topColor: ClothingColor;
  bottomType: ClothingBottom;
  bottomColor: ClothingColor;

  // === ACCESSORIES ===
  glasses: GlassesType;
  headwear: HeadwearType;
}

/**
 * Stored avatar for database persistence.
 */
export interface StoredCustomAvatar {
  /** Unique identifier (UUID) */
  id: string;
  /** Avatar configuration */
  config: CustomAvatarConfig;
  /** Configuration version for migrations */
  version: number;
  /** Creation timestamp (ISO 8601) */
  createdAt: string;
  /** Last modified timestamp (ISO 8601) */
  updatedAt: string;
}

// =============================================================================
// AVATAR DISPLAY PROPS
// =============================================================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const AVATAR_SIZES: Record<AvatarSize, number> = {
  xs: 32,
  sm: 48,
  md: 80,
  lg: 120,
  xl: 200,
};

export type AvatarView = 'portrait' | 'fullBody';

// =============================================================================
// MATCHING CONFIGURATION
// =============================================================================

export const PRIMARY_ATTRIBUTES: (keyof CustomAvatarConfig)[] = [
  'skinTone',
  'hairColor',
  'hairStyle',
  'facialHair',
  'facialHairColor',
  'faceShape',
];

export const SECONDARY_ATTRIBUTES: (keyof CustomAvatarConfig)[] = [
  'eyeShape',
  'eyeColor',
  'eyebrowStyle',
  'noseShape',
  'mouthExpression',
  'bodyShape',
  'glasses',
  'headwear',
];

export const MATCHING_WEIGHTS = {
  primary: 0.6,
  secondary: 0.4,
} as const;

// =============================================================================
// CATEGORY ORGANIZATION (for creator UI)
// =============================================================================

export type AvatarCategory =
  | 'face'
  | 'hair'
  | 'eyes'
  | 'features'
  | 'body'
  | 'outfit'
  | 'accessories';

export const AVATAR_CATEGORIES: Record<
  AvatarCategory,
  {
    label: string;
    icon: string;
    attributes: (keyof CustomAvatarConfig)[];
  }
> = {
  face: {
    label: 'Face',
    icon: 'face',
    attributes: ['skinTone', 'faceShape'],
  },
  hair: {
    label: 'Hair',
    icon: 'content-cut',
    attributes: ['hairStyle', 'hairColor', 'facialHair', 'facialHairColor'],
  },
  eyes: {
    label: 'Eyes',
    icon: 'eye',
    attributes: ['eyeShape', 'eyeColor', 'eyebrowStyle'],
  },
  features: {
    label: 'Features',
    icon: 'emoticon',
    attributes: ['noseShape', 'mouthExpression'],
  },
  body: {
    label: 'Body',
    icon: 'human',
    attributes: ['bodyShape', 'heightCategory'],
  },
  outfit: {
    label: 'Outfit',
    icon: 'tshirt-crew',
    attributes: ['topType', 'topColor', 'bottomType', 'bottomColor'],
  },
  accessories: {
    label: 'Accessories',
    icon: 'glasses',
    attributes: ['glasses', 'headwear'],
  },
};

// =============================================================================
// ENHANCED SHADING SYSTEM (V2)
// =============================================================================

/**
 * Undertone classification for skin tones.
 * Critical for realistic rendering - affects how shadows and highlights look.
 */
export type UndertoneType = 'cool' | 'warm' | 'neutral';

/**
 * Enhanced skin tone definition with complete shading information.
 * Each tone includes pre-calculated variants for multi-layer rendering.
 */
export interface SkinToneV2 {
  /** Unique identifier matching the key */
  id: string;
  /** Human-readable name */
  name: string;
  /** Base skin color (mid-tone) */
  base: string;
  /** Level 1 shadow - subtle surface variation */
  shadow1: string;
  /** Level 2 shadow - form definition (cheekbones, jaw) */
  shadow2: string;
  /** Level 3 shadow - deep recessed areas (under nose, ears) */
  shadow3: string;
  /** Level 1 highlight - surface sheen */
  highlight1: string;
  /** Level 2 highlight - direct light catch (forehead, nose bridge, cheekbones) */
  highlight2: string;
  /** Blush color - cheeks, nose tip, ears */
  blush: string;
  /** Ambient occlusion - contact shadows (neck, hairline) */
  ambientOcclusion: string;
  /** Undertone classification */
  undertone: UndertoneType;
  /** Fitzpatrick scale category (1-6) */
  fitzpatrick: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Complete shading token set for any colorizable surface.
 * Used by the colorizer to generate consistent shading across all parts.
 */
export interface ShadingTokenSet {
  /** Base color (no shading applied) */
  base: string;
  /** Level 1 shadow */
  shadow1: string;
  /** Level 2 shadow */
  shadow2: string;
  /** Level 3 shadow */
  shadow3: string;
  /** Level 1 highlight */
  highlight1: string;
  /** Level 2 highlight */
  highlight2: string;
  /** Blush/warmth accent */
  blush: string;
  /** Ambient occlusion (darkest contact shadow) */
  ambientOcclusion: string;
}

/**
 * Token names for shading - matches ShadingTokenSet keys.
 * Used for template token replacement in SVG assets.
 */
export type ShadingTokenName = keyof ShadingTokenSet;

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Partial avatar config for initialization or updates
 */
export type PartialAvatarConfig = Partial<CustomAvatarConfig>;

/**
 * Avatar config key for type-safe attribute access
 */
export type AvatarAttribute = keyof CustomAvatarConfig;

/**
 * Get the value type for a specific attribute
 */
export type AvatarAttributeValue<K extends AvatarAttribute> =
  CustomAvatarConfig[K];
