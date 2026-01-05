/**
 * SVG Colorizer
 *
 * Applies colors to SVG templates by replacing placeholder tokens.
 * Handles skin tones, hair colors, clothing colors, etc.
 *
 * Enhanced with multi-shade generation for realistic rendering.
 */

import {
  SKIN_TONES,
  HAIR_COLORS,
  EYE_COLORS,
  CLOTHING_COLORS,
  type SkinTone,
  type HairColor,
  type EyeColor,
  type ClothingColor,
  type CustomAvatarConfig,
} from '../types';

import {
  SHADOW_INTENSITY,
  HIGHLIGHT_INTENSITY,
  SKIN_ADJUSTMENTS,
  HAIR_ADJUSTMENTS,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  darken,
  lighten,
  saturate,
  addWarmth,
  addCoolness,
} from '../design-system';

// =============================================================================
// Color Token Placeholders
// =============================================================================

/**
 * Placeholder tokens used in SVG templates.
 * These get replaced with actual color values.
 */
export const COLOR_TOKENS = {
  // Skin - Base
  SKIN: '{{skin}}',
  SKIN_SHADOW: '{{skinShadow}}',
  SKIN_HIGHLIGHT: '{{skinHighlight}}',

  // Skin - Enhanced shading (new tokens)
  SKIN_SHADOW_1: '{{skinShadow1}}',
  SKIN_SHADOW_2: '{{skinShadow2}}',
  SKIN_SHADOW_3: '{{skinShadow3}}',
  SKIN_HIGHLIGHT_1: '{{skinHighlight1}}',
  SKIN_HIGHLIGHT_2: '{{skinHighlight2}}',
  SKIN_BLUSH: '{{skinBlush}}',
  SKIN_AO: '{{skinAO}}',

  // Hair - Base
  HAIR: '{{hair}}',
  HAIR_SHADOW: '{{hairShadow}}', // Legacy alias for hairShadow1
  HAIR_HIGHLIGHT: '{{hairHighlight}}',

  // Hair - Enhanced shading (multi-level shadows)
  HAIR_SHADOW_1: '{{hairShadow1}}',
  HAIR_SHADOW_2: '{{hairShadow2}}',

  // Facial hair (may differ from head hair)
  FACIAL_HAIR: '{{facialHair}}',

  // Eyes
  EYE: '{{eye}}',
  EYE_WHITE: '{{eyeWhite}}',
  EYE_PUPIL: '{{eyePupil}}',
  EYE_DARK: '{{eyeDark}}',

  // Eyebrows
  EYEBROW: '{{eyebrow}}',

  // Mouth
  LIP: '{{lip}}',
  LIP_SHADOW: '{{lipShadow}}',
  LIP_HIGHLIGHT: '{{lipHighlight}}',
  TONGUE: '{{tongue}}',
  TEETH: '{{teeth}}',

  // Clothing
  TOP: '{{top}}',
  TOP_SHADOW: '{{topShadow}}',
  TOP_ACCENT: '{{topAccent}}',
  TOP_DEEP: '{{topDeep}}',
  BOTTOM: '{{bottom}}',
  BOTTOM_SHADOW: '{{bottomShadow}}',
  BOTTOM_DEEP: '{{bottomDeep}}',

  // Accessories
  GLASSES_FRAME: '{{glassesFrame}}',
  GLASSES_LENS: '{{glassesLens}}',
  HEADWEAR: '{{headwear}}',
  HEADWEAR_SHADOW: '{{headwearShadow}}',
} as const;

// =============================================================================
// Legacy Color Manipulation Utilities (kept for backward compatibility)
// =============================================================================

/**
 * Parse a hex color to RGB components.
 * @deprecated Use hexToRgb from design-system.ts instead
 */
function legacyHexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex.
 * @deprecated Use rgbToHex from design-system.ts instead
 */
function legacyRgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Darken a color by a percentage (for shadows).
 * @param hex - Hex color string
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = legacyHexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 - percent / 100;
  return legacyRgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

/**
 * Lighten a color by a percentage (for highlights).
 * @param hex - Hex color string
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = legacyHexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  return legacyRgbToHex(
    rgb.r + (255 - rgb.r) * factor,
    rgb.g + (255 - rgb.g) * factor,
    rgb.b + (255 - rgb.b) * factor
  );
}

/**
 * Adjust color saturation.
 * @param hex - Hex color string
 * @param percent - Saturation adjustment (-100 to 100)
 * @returns Adjusted hex color
 */
export function adjustSaturation(hex: string, percent: number): string {
  const rgb = legacyHexToRgb(hex);
  if (!rgb) return hex;

  const gray = 0.2989 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  const factor = percent / 100;

  return legacyRgbToHex(
    gray + factor * (rgb.r - gray),
    gray + factor * (rgb.g - gray),
    gray + factor * (rgb.b - gray)
  );
}

// =============================================================================
// Skin Shade Generation
// =============================================================================

/**
 * Generated skin color shades for realistic rendering.
 */
export interface SkinShades {
  /** Base skin tone */
  skin: string;
  /** Subtle shadow for surface variation */
  skinShadow1: string;
  /** Medium shadow for form definition */
  skinShadow2: string;
  /** Deep shadow for recessed areas (under chin, nose sides) */
  skinShadow3: string;
  /** Subtle highlight for surface sheen */
  skinHighlight1: string;
  /** Bright highlight for direct light (forehead, nose bridge, cheekbones) */
  skinHighlight2: string;
  /** Warm blush color for cheeks */
  skinBlush: string;
  /** Ambient occlusion for contact shadows (ear hollows, nostril interior) */
  skinAO: string;
}

/**
 * Generate multiple skin shade variants from a base skin tone.
 * Uses subsurface scattering principles - shadows are warmer, highlights slightly cooler.
 * @param baseTone - The skin tone key from SKIN_TONES
 * @returns Object containing all skin shade variants
 */
export function generateSkinShades(baseTone: SkinTone): SkinShades {
  const baseColor = SKIN_TONES[baseTone];

  // Shadow variations with warmth (subsurface scattering effect)
  const shadow1 = addWarmth(
    darken(baseColor, SHADOW_INTENSITY.level1),
    SKIN_ADJUSTMENTS.shadowWarmth * 0.5
  );
  const shadow2 = addWarmth(
    darken(baseColor, SHADOW_INTENSITY.level2),
    SKIN_ADJUSTMENTS.shadowWarmth
  );
  const shadow3 = addWarmth(
    darken(baseColor, SHADOW_INTENSITY.level3),
    SKIN_ADJUSTMENTS.shadowWarmth * 1.2
  );

  // Highlight variations (slightly cooler for realistic light)
  const highlight1 = addCoolness(
    lighten(baseColor, HIGHLIGHT_INTENSITY.level1),
    2
  );
  const highlight2 = addCoolness(
    lighten(baseColor, HIGHLIGHT_INTENSITY.level2),
    4
  );

  // Blush - add red/pink and increase saturation
  const blush = saturate(
    addWarmth(baseColor, SKIN_ADJUSTMENTS.blushRed),
    SKIN_ADJUSTMENTS.blushSaturation
  );

  // Ambient occlusion - deep, desaturated shadow
  const ao = saturate(
    darken(baseColor, SHADOW_INTENSITY.ambientOcclusion),
    SKIN_ADJUSTMENTS.aoDesaturation
  );

  return {
    skin: baseColor,
    skinShadow1: shadow1,
    skinShadow2: shadow2,
    skinShadow3: shadow3,
    skinHighlight1: highlight1,
    skinHighlight2: highlight2,
    skinBlush: blush,
    skinAO: ao,
  };
}

// =============================================================================
// Hair Shade Generation
// =============================================================================

/**
 * Generated hair color shades for realistic rendering.
 */
export interface HairShades {
  /** Base hair color */
  hair: string;
  /** Level 1 shadow for hair mass shading */
  hairShadow1: string;
  /** Level 2 shadow for deeper hair mass definition */
  hairShadow2: string;
  /** Standard highlight for light-catching strands */
  hairHighlight: string;
}

/**
 * Generate multiple hair shade variants from a base hair color.
 * @param baseColor - The hair color key from HAIR_COLORS
 * @returns Object containing all hair shade variants
 */
export function generateHairShades(baseColor: HairColor): HairShades {
  const color = HAIR_COLORS[baseColor];

  // Level 1 shadow - subtle shading for hair mass
  const shadow1 = darken(color, SHADOW_INTENSITY.level1);

  // Level 2 shadow - deeper shading for strand separation and volume
  const shadow2 = darken(color, SHADOW_INTENSITY.level2);

  // Highlight - lighter hair needs less lightening
  const rgb = hexToRgb(color);
  const isLight = rgb ? (rgb.r + rgb.g + rgb.b) / 3 > 180 : false;
  const highlightAmount = isLight
    ? HIGHLIGHT_INTENSITY.level1
    : HIGHLIGHT_INTENSITY.level2;
  const highlight = saturate(
    lighten(color, highlightAmount),
    HAIR_ADJUSTMENTS.highlightDesaturation
  );

  return {
    hair: color,
    hairShadow1: shadow1,
    hairShadow2: shadow2,
    hairHighlight: highlight,
  };
}

// =============================================================================
// Eye Shade Generation
// =============================================================================

/**
 * Generated eye color shades.
 */
export interface EyeShades {
  /** Base iris color */
  base: string;
  /** Dark ring around iris (limbal ring) */
  eyeDark: string;
  /** Eye white (sclera) */
  eyeWhite: string;
  /** Pupil color */
  eyePupil: string;
}

/**
 * Generate eye color shades for realistic iris rendering.
 * @param baseColor - The eye color key from EYE_COLORS
 * @returns Object containing all eye shade variants
 */
export function generateEyeShades(baseColor: EyeColor): EyeShades {
  const color = EYE_COLORS[baseColor];

  // Limbal ring - darker, more saturated version of iris color
  const eyeDark = saturate(darken(color, 35), 15);

  return {
    base: color,
    eyeDark,
    eyeWhite: '#FFFFFF',
    eyePupil: '#000000',
  };
}

// =============================================================================
// Clothing Shade Generation
// =============================================================================

/**
 * Generated clothing color shades.
 */
export interface ClothingShades {
  /** Base clothing color */
  base: string;
  /** Standard shadow for folds */
  shadow: string;
  /** Accent/highlight for edges and details */
  accent: string;
  /** Deep shadow for creases */
  deep: string;
}

/**
 * Generate clothing shade variants from a base color.
 * @param baseColor - The clothing color key from CLOTHING_COLORS
 * @returns Object containing all clothing shade variants
 */
export function generateClothingShades(baseColor: ClothingColor): ClothingShades {
  const color = CLOTHING_COLORS[baseColor];

  return {
    base: color,
    shadow: darken(color, SHADOW_INTENSITY.level2),
    accent: lighten(color, HIGHLIGHT_INTENSITY.level1),
    deep: darken(color, SHADOW_INTENSITY.level3),
  };
}

// =============================================================================
// Color Palette Generation
// =============================================================================

/**
 * Complete color palette for avatar rendering.
 * Includes all base colors and generated shade variants.
 */
export interface ColorPalette {
  // Skin colors (base + legacy)
  skin: string;
  skinShadow: string;
  skinHighlight: string;

  // Skin colors (enhanced shading)
  skinShadow1: string;
  skinShadow2: string;
  skinShadow3: string;
  skinHighlight1: string;
  skinHighlight2: string;
  skinBlush: string;
  skinAO: string;

  // Hair colors (base + legacy)
  hair: string;
  hairShadow: string; // Legacy alias for hairShadow1
  hairHighlight: string;

  // Hair colors (enhanced)
  hairShadow1: string;
  hairShadow2: string;
  facialHair: string;

  // Eye colors
  eye: string;
  eyeWhite: string;
  eyePupil: string;
  eyeDark: string;
  eyebrow: string;

  // Mouth colors
  lip: string;
  lipShadow: string;
  lipHighlight: string;
  tongue: string;
  teeth: string;

  // Clothing colors (top)
  top: string;
  topShadow: string;
  topAccent: string;
  topDeep: string;

  // Clothing colors (bottom)
  bottom: string;
  bottomShadow: string;
  bottomDeep: string;

  // Accessory colors
  glassesFrame: string;
  glassesLens: string;
  headwear: string;
  headwearShadow: string;
}

/**
 * Generate lip color based on skin tone.
 * @param skinTone - The skin tone key
 * @returns Hex color for lips
 */
function getLipColor(skinTone: SkinTone): string {
  const skinColor = SKIN_TONES[skinTone];
  const rgb = hexToRgb(skinColor);
  if (!rgb) return '#D4A5A5';

  // Add red/pink tint proportional to skin darkness
  const hsl = rgbToHsl(rgb);
  const isDark = hsl.l < 40;

  // Darker skin tones get more natural lip colors
  // Lighter skin tones get pinker lips
  const redBoost = isDark ? 20 : 35;
  const greenReduce = isDark ? 10 : 25;
  const blueReduce = isDark ? 5 : 15;

  return rgbToHex(
    Math.min(255, rgb.r + redBoost),
    Math.max(0, rgb.g - greenReduce),
    Math.max(0, rgb.b - blueReduce)
  );
}

/**
 * Generate a complete color palette from avatar config.
 * Includes all shade variants for realistic rendering.
 * @param config - Avatar configuration
 * @returns Complete color palette with all shades
 */
export function generateColorPalette(config: CustomAvatarConfig): ColorPalette {
  // Generate shade sets
  const skinShades = generateSkinShades(config.skinTone);
  const hairShades = generateHairShades(config.hairColor);
  const eyeShades = generateEyeShades(config.eyeColor);
  const topShades = generateClothingShades(config.topColor);
  const bottomShades = generateClothingShades(config.bottomColor);

  // Facial hair color (may differ from head hair)
  const facialHairBase = HAIR_COLORS[config.facialHairColor];

  // Lip colors
  const lipBase = getLipColor(config.skinTone);
  const lipShadow = darken(lipBase, SHADOW_INTENSITY.level2);
  const lipHighlight = lighten(lipBase, HIGHLIGHT_INTENSITY.level1);

  // Headwear colors
  const headwearBase = topShades.base; // Match top by default
  const headwearShadow = darken(headwearBase, SHADOW_INTENSITY.level2);

  return {
    // Skin (base + legacy aliases)
    skin: skinShades.skin,
    skinShadow: skinShades.skinShadow2, // Legacy: use medium shadow
    skinHighlight: skinShades.skinHighlight1, // Legacy: use subtle highlight

    // Skin (enhanced)
    skinShadow1: skinShades.skinShadow1,
    skinShadow2: skinShades.skinShadow2,
    skinShadow3: skinShades.skinShadow3,
    skinHighlight1: skinShades.skinHighlight1,
    skinHighlight2: skinShades.skinHighlight2,
    skinBlush: skinShades.skinBlush,
    skinAO: skinShades.skinAO,

    // Hair (base + legacy aliases)
    hair: hairShades.hair,
    hairShadow: hairShades.hairShadow1, // Legacy: use level 1 shadow
    hairHighlight: hairShades.hairHighlight,

    // Hair (enhanced)
    hairShadow1: hairShades.hairShadow1,
    hairShadow2: hairShades.hairShadow2,
    facialHair: facialHairBase,

    // Eyes
    eye: eyeShades.base,
    eyeWhite: eyeShades.eyeWhite,
    eyePupil: eyeShades.eyePupil,
    eyeDark: eyeShades.eyeDark,
    eyebrow: darken(hairShades.hair, 10), // Eyebrows match hair

    // Mouth
    lip: lipBase,
    lipShadow,
    lipHighlight,
    tongue: '#E8A0A0',
    teeth: '#FFFFFF',

    // Clothing (top)
    top: topShades.base,
    topShadow: topShades.shadow,
    topAccent: topShades.accent,
    topDeep: topShades.deep,

    // Clothing (bottom)
    bottom: bottomShades.base,
    bottomShadow: bottomShades.shadow,
    bottomDeep: bottomShades.deep,

    // Accessories
    glassesFrame: '#1A1A1A',
    glassesLens: 'rgba(0, 0, 0, 0.1)',
    headwear: headwearBase,
    headwearShadow,
  };
}

// =============================================================================
// SVG Colorization
// =============================================================================

/**
 * Replace all color tokens in an SVG string with actual colors.
 * Supports both legacy tokens and new enhanced shade tokens.
 * @param svg - SVG string with color tokens
 * @param palette - Color palette to apply
 * @returns Colorized SVG string
 */
export function colorizeSvg(svg: string, palette: ColorPalette): string {
  let result = svg;

  // Build replacement map for all tokens
  const replacements: Record<string, string> = {
    // Skin - base and legacy
    [COLOR_TOKENS.SKIN]: palette.skin,
    [COLOR_TOKENS.SKIN_SHADOW]: palette.skinShadow,
    [COLOR_TOKENS.SKIN_HIGHLIGHT]: palette.skinHighlight,

    // Skin - enhanced shading
    [COLOR_TOKENS.SKIN_SHADOW_1]: palette.skinShadow1,
    [COLOR_TOKENS.SKIN_SHADOW_2]: palette.skinShadow2,
    [COLOR_TOKENS.SKIN_SHADOW_3]: palette.skinShadow3,
    [COLOR_TOKENS.SKIN_HIGHLIGHT_1]: palette.skinHighlight1,
    [COLOR_TOKENS.SKIN_HIGHLIGHT_2]: palette.skinHighlight2,
    [COLOR_TOKENS.SKIN_BLUSH]: palette.skinBlush,
    [COLOR_TOKENS.SKIN_AO]: palette.skinAO,

    // Hair - base and legacy
    [COLOR_TOKENS.HAIR]: palette.hair,
    [COLOR_TOKENS.HAIR_SHADOW]: palette.hairShadow, // Legacy alias
    [COLOR_TOKENS.HAIR_HIGHLIGHT]: palette.hairHighlight,

    // Hair - enhanced (multi-level shadows)
    [COLOR_TOKENS.HAIR_SHADOW_1]: palette.hairShadow1,
    [COLOR_TOKENS.HAIR_SHADOW_2]: palette.hairShadow2,
    [COLOR_TOKENS.FACIAL_HAIR]: palette.facialHair,

    // Eyes
    [COLOR_TOKENS.EYE]: palette.eye,
    [COLOR_TOKENS.EYE_WHITE]: palette.eyeWhite,
    [COLOR_TOKENS.EYE_PUPIL]: palette.eyePupil,
    [COLOR_TOKENS.EYE_DARK]: palette.eyeDark,
    [COLOR_TOKENS.EYEBROW]: palette.eyebrow,

    // Mouth
    [COLOR_TOKENS.LIP]: palette.lip,
    [COLOR_TOKENS.LIP_SHADOW]: palette.lipShadow,
    [COLOR_TOKENS.LIP_HIGHLIGHT]: palette.lipHighlight,
    [COLOR_TOKENS.TONGUE]: palette.tongue,
    [COLOR_TOKENS.TEETH]: palette.teeth,

    // Clothing
    [COLOR_TOKENS.TOP]: palette.top,
    [COLOR_TOKENS.TOP_SHADOW]: palette.topShadow,
    [COLOR_TOKENS.TOP_ACCENT]: palette.topAccent,
    [COLOR_TOKENS.TOP_DEEP]: palette.topDeep,
    [COLOR_TOKENS.BOTTOM]: palette.bottom,
    [COLOR_TOKENS.BOTTOM_SHADOW]: palette.bottomShadow,
    [COLOR_TOKENS.BOTTOM_DEEP]: palette.bottomDeep,

    // Accessories
    [COLOR_TOKENS.GLASSES_FRAME]: palette.glassesFrame,
    [COLOR_TOKENS.GLASSES_LENS]: palette.glassesLens,
    [COLOR_TOKENS.HEADWEAR]: palette.headwear,
    [COLOR_TOKENS.HEADWEAR_SHADOW]: palette.headwearShadow,
  };

  // Replace all tokens
  for (const [token, color] of Object.entries(replacements)) {
    result = result.replaceAll(token, color);
  }

  return result;
}

/**
 * Colorize an SVG directly from avatar config.
 * Automatically generates all shade variants and applies them.
 * @param svg - SVG string with color tokens
 * @param config - Avatar configuration
 * @returns Colorized SVG string
 */
export function colorizeSvgFromConfig(
  svg: string,
  config: CustomAvatarConfig
): string {
  const palette = generateColorPalette(config);
  return colorizeSvg(svg, palette);
}
