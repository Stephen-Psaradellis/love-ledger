/**
 * Avatar Design System
 *
 * Art direction constants, color manipulation utilities, and complexity budgets
 * for realistic avatar rendering with proper lighting and shading.
 */

// =============================================================================
// ART DIRECTION CONSTANTS
// =============================================================================

/**
 * Light source configuration for consistent shading across all avatar parts.
 * The light is positioned above and to the left of the avatar.
 */
export const LIGHT_SOURCE = {
  /** Angle in degrees from the top (0 = directly above, positive = clockwise) */
  angle: -30,
  /** Elevation angle in degrees from horizontal (90 = directly above) */
  elevation: 45,
  /** Normalized direction vector for shader calculations */
  direction: { x: -0.5, y: -0.71, z: 0.5 },
} as const;

/**
 * Shadow intensity settings for different depth levels.
 * Values are percentages (0-100) indicating how much to darken the base color.
 */
export const SHADOW_INTENSITY = {
  /** Subtle shadow for surface variation */
  level1: 8,
  /** Medium shadow for form definition */
  level2: 15,
  /** Deep shadow for recessed areas */
  level3: 25,
  /** Ambient occlusion for contact shadows */
  ambientOcclusion: 35,
} as const;

/**
 * Highlight intensity settings for different light catch levels.
 * Values are percentages (0-100) indicating how much to lighten the base color.
 */
export const HIGHLIGHT_INTENSITY = {
  /** Subtle highlight for surface sheen */
  level1: 8,
  /** Bright highlight for direct light */
  level2: 18,
  /** Specular highlight for glossy surfaces (hair, eyes) */
  specular: 30,
} as const;

/**
 * Warmth and saturation adjustments for realistic skin rendering.
 */
export const SKIN_ADJUSTMENTS = {
  /** Red/warmth added to shadow areas (subsurface scattering effect) */
  shadowWarmth: 8,
  /** Saturation boost for blush areas */
  blushSaturation: 20,
  /** Red component added for blush effect */
  blushRed: 25,
  /** Desaturation for ambient occlusion areas */
  aoDesaturation: -15,
} as const;

/**
 * Hair rendering parameters for realistic shine and depth.
 */
export const HAIR_ADJUSTMENTS = {
  /** Deep shadow saturation boost */
  deepSaturation: 10,
  /** Highlight desaturation for blonde/light hair */
  highlightDesaturation: -5,
  /** Additional darkening for strand separation */
  strandDepth: 30,
} as const;

// =============================================================================
// SVG COMPLEXITY BUDGET
// =============================================================================

/**
 * Maximum number of elements per layer to maintain performance.
 * Exceeding these limits may cause rendering lag on lower-end devices.
 */
export const COMPLEXITY_BUDGET = {
  /** Max path elements per head shape */
  headPaths: 8,
  /** Max path elements per hair style */
  hairPaths: 25,
  /** Max path elements per facial feature */
  featurePaths: 6,
  /** Max gradient definitions per part */
  gradientsPerPart: 3,
  /** Max total gradients in composed avatar */
  totalGradients: 15,
  /** Target file size per part in bytes (uncompressed SVG) */
  partSizeBytes: 4096,
  /** Target total composed avatar size in bytes */
  totalSizeBytes: 32768,
} as const;

/**
 * Recommended stroke widths for consistent line art.
 */
export const STROKE_WIDTHS = {
  /** Fine detail lines (eyelashes, hair strands) */
  fine: 0.5,
  /** Standard feature outlines (eyes, nose) */
  standard: 1,
  /** Bold outlines (face outline, hair mass) */
  bold: 1.5,
  /** Heavy outlines (glasses frames, accessories) */
  heavy: 2,
} as const;

// =============================================================================
// COLOR MANIPULATION UTILITIES
// =============================================================================

/**
 * RGB color components
 */
export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/**
 * HSL color components
 */
export interface HslColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/**
 * Parse a hex color string to RGB components.
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): RgbColor | null {
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
 * Convert RGB components to a hex color string.
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string with # prefix
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = clamp(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Convert RGB to HSL color space.
 * @param rgb - RGB color object
 * @returns HSL color object
 */
export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB color space.
 * @param hsl - HSL color object
 * @returns RGB color object
 */
export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

/**
 * Darken a color by reducing its lightness.
 * @param hex - Base hex color
 * @param amount - Percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb);
  hsl.l = Math.max(0, hsl.l - amount);

  const result = hslToRgb(hsl);
  return rgbToHex(result.r, result.g, result.b);
}

/**
 * Lighten a color by increasing its lightness.
 * @param hex - Base hex color
 * @param amount - Percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb);
  hsl.l = Math.min(100, hsl.l + amount);

  const result = hslToRgb(hsl);
  return rgbToHex(result.r, result.g, result.b);
}

/**
 * Adjust the saturation of a color.
 * @param hex - Base hex color
 * @param amount - Percentage to adjust (-100 to 100, positive = more saturated)
 * @returns Adjusted hex color
 */
export function saturate(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));

  const result = hslToRgb(hsl);
  return rgbToHex(result.r, result.g, result.b);
}

/**
 * Add warmth (red/orange tint) to a color.
 * Useful for subsurface scattering effects on skin.
 * @param hex - Base hex color
 * @param amount - Amount of warmth to add (0-100)
 * @returns Warmer hex color
 */
export function addWarmth(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  // Add red and subtract blue to create warmth
  const factor = amount / 100;
  const newR = Math.min(255, rgb.r + 30 * factor);
  const newG = rgb.g + 5 * factor;
  const newB = Math.max(0, rgb.b - 15 * factor);

  return rgbToHex(newR, newG, newB);
}

/**
 * Add coolness (blue tint) to a color.
 * Useful for shadow areas and ambient lighting.
 * @param hex - Base hex color
 * @param amount - Amount of coolness to add (0-100)
 * @returns Cooler hex color
 */
export function addCoolness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  // Add blue and subtract red/yellow to create coolness
  const factor = amount / 100;
  const newR = Math.max(0, rgb.r - 10 * factor);
  const newG = rgb.g - 5 * factor;
  const newB = Math.min(255, rgb.b + 20 * factor);

  return rgbToHex(newR, newG, newB);
}

/**
 * Shift the hue of a color.
 * @param hex - Base hex color
 * @param degrees - Degrees to shift (-180 to 180)
 * @returns Hue-shifted hex color
 */
export function shiftHue(hex: string, degrees: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + degrees + 360) % 360;

  const result = hslToRgb(hsl);
  return rgbToHex(result.r, result.g, result.b);
}

/**
 * Blend two colors together.
 * @param hex1 - First hex color
 * @param hex2 - Second hex color
 * @param ratio - Blend ratio (0 = first color, 1 = second color)
 * @returns Blended hex color
 */
export function blendColors(hex1: string, hex2: string, ratio: number): string {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return hex1;

  const r = ratio;
  const newR = rgb1.r * (1 - r) + rgb2.r * r;
  const newG = rgb1.g * (1 - r) + rgb2.g * r;
  const newB = rgb1.b * (1 - r) + rgb2.b * r;

  return rgbToHex(newR, newG, newB);
}

/**
 * Create a multi-stop gradient definition for SVG.
 * @param id - Gradient ID
 * @param colors - Array of {offset, color} stops
 * @param type - 'linear' or 'radial'
 * @param angle - Angle for linear gradients (degrees)
 * @returns SVG gradient definition string
 */
export function createGradientDef(
  id: string,
  colors: Array<{ offset: number; color: string }>,
  type: 'linear' | 'radial' = 'linear',
  angle: number = 180
): string {
  const stops = colors
    .map((c) => `<stop offset="${c.offset}%" stop-color="${c.color}"/>`)
    .join('\n    ');

  if (type === 'radial') {
    return `<radialGradient id="${id}" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
    ${stops}
  </radialGradient>`;
  }

  // Convert angle to x1,y1,x2,y2 coordinates
  const radians = ((angle - 90) * Math.PI) / 180;
  const x1 = 50 + Math.cos(radians + Math.PI) * 50;
  const y1 = 50 + Math.sin(radians + Math.PI) * 50;
  const x2 = 50 + Math.cos(radians) * 50;
  const y2 = 50 + Math.sin(radians) * 50;

  return `<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
    ${stops}
  </linearGradient>`;
}

// =============================================================================
// PRESET OPERATIONS
// =============================================================================

/**
 * Apply standard shadow transformation to a color.
 * Combines darkening with slight warmth for realistic shadows.
 * @param hex - Base hex color
 * @param level - Shadow level (1-3, or 'ao' for ambient occlusion)
 * @returns Shadow color
 */
export function applyShadow(
  hex: string,
  level: 1 | 2 | 3 | 'ao'
): string {
  let darkness: number;
  let warmth: number;

  switch (level) {
    case 1:
      darkness = SHADOW_INTENSITY.level1;
      warmth = 2;
      break;
    case 2:
      darkness = SHADOW_INTENSITY.level2;
      warmth = 4;
      break;
    case 3:
      darkness = SHADOW_INTENSITY.level3;
      warmth = 6;
      break;
    case 'ao':
      darkness = SHADOW_INTENSITY.ambientOcclusion;
      warmth = 0; // AO shadows are neutral
      break;
  }

  let result = darken(hex, darkness);
  if (warmth > 0) {
    result = addWarmth(result, warmth);
  }
  return result;
}

/**
 * Apply standard highlight transformation to a color.
 * @param hex - Base hex color
 * @param level - Highlight level (1-2, or 'specular')
 * @returns Highlight color
 */
export function applyHighlight(
  hex: string,
  level: 1 | 2 | 'specular'
): string {
  let lightness: number;

  switch (level) {
    case 1:
      lightness = HIGHLIGHT_INTENSITY.level1;
      break;
    case 2:
      lightness = HIGHLIGHT_INTENSITY.level2;
      break;
    case 'specular':
      lightness = HIGHLIGHT_INTENSITY.specular;
      break;
  }

  return lighten(hex, lightness);
}

// =============================================================================
// SHADING TOKEN SYSTEM (V2)
// =============================================================================
//
// ART DIRECTION PHILOSOPHY:
// -------------------------
// The goal is semi-realistic portrait avatars where users can recognize
// themselves and others. We achieve this through:
//
// 1. MULTI-LAYER SHADING: Each surface has 8 shade variants:
//    - base: The characteristic mid-tone color
//    - shadow1-3: Progressive darkening for depth (surface → form → recessed)
//    - highlight1-2: Light catch areas (sheen → direct light)
//    - blush: Warmth/blood flow areas (cheeks, nose, ears)
//    - ambientOcclusion: Contact shadows where surfaces meet
//
// 2. UNDERTONE AWARENESS: Skin tones are classified by undertone (cool/warm/neutral)
//    which affects how shadows and highlights are tinted. Cool undertones get
//    slightly blue-shifted shadows; warm undertones get red-shifted.
//
// 3. CONSISTENT LIGHTING: All assets assume top-left light source (matching
//    LIGHT_SOURCE constant) for coherent composition.
//
// 4. ANATOMICAL ACCURACY: Facial features follow real bone/muscle structure:
//    - Forehead: highlight center, shadow at temples
//    - Cheekbones: highlight on top surface, shadow underneath
//    - Nose: highlight on bridge, shadow on sides and under tip
//    - Jaw: shadow on underside, highlight on chin
//
// TOKEN NAMING CONVENTION:
// - SVG templates use {{tokenName}} placeholders
// - Skin tokens: {{skinBase}}, {{skinShadow1}}, {{skinHighlight1}}, etc.
// - Hair tokens: {{hairBase}}, {{hairShadow1}}, {{hairHighlight}}, etc.
// =============================================================================

import type { SkinToneV2, ShadingTokenSet, UndertoneType } from './types';

/**
 * The 8 shading token names used across all colorizable surfaces.
 * These are the standard placeholders that appear in SVG asset templates.
 */
export const SHADING_TOKENS = [
  'base',
  'shadow1',
  'shadow2',
  'shadow3',
  'highlight1',
  'highlight2',
  'blush',
  'ambientOcclusion',
] as const;

/**
 * Type for shading token names (derived from the constant for type safety)
 */
export type ShadingToken = (typeof SHADING_TOKENS)[number];

/**
 * SKIN_TONES_V2 - Enhanced skin tone palette with 21 tones.
 *
 * Organized by Fitzpatrick scale (I-VI) with undertone variants:
 * - Cool undertones: pink/blue-ish base, blue-shifted shadows
 * - Warm undertones: yellow/golden base, red-shifted shadows
 * - Neutral undertones: balanced, minimal color shift in shadows
 *
 * Each tone includes pre-calculated shading variants for performance.
 * Values derived from real skin photography and dermatological references.
 */
export const SKIN_TONES_V2: Record<string, SkinToneV2> = {
  // ========== FITZPATRICK I (Very Fair) ==========
  fair_cool: {
    id: 'fair_cool',
    name: 'Fair Cool',
    base: '#FFE4D6',
    shadow1: '#F5D4C6',
    shadow2: '#E8C1B4',
    shadow3: '#D4A89C',
    highlight1: '#FFF0E8',
    highlight2: '#FFF8F4',
    blush: '#FFB8A8',
    ambientOcclusion: '#C49488',
    undertone: 'cool',
    fitzpatrick: 1,
  },
  fair_warm: {
    id: 'fair_warm',
    name: 'Fair Warm',
    base: '#FFE0C4',
    shadow1: '#F5D0B4',
    shadow2: '#E8C0A4',
    shadow3: '#D4A88C',
    highlight1: '#FFECD8',
    highlight2: '#FFF6EC',
    blush: '#FFB090',
    ambientOcclusion: '#C49070',
    undertone: 'warm',
    fitzpatrick: 1,
  },
  fair_neutral: {
    id: 'fair_neutral',
    name: 'Fair Neutral',
    base: '#FFE2CC',
    shadow1: '#F5D2BC',
    shadow2: '#E8C0AC',
    shadow3: '#D4A894',
    highlight1: '#FFEEE0',
    highlight2: '#FFF7F0',
    blush: '#FFB49C',
    ambientOcclusion: '#C4927C',
    undertone: 'neutral',
    fitzpatrick: 1,
  },

  // ========== FITZPATRICK II (Fair) ==========
  light_cool: {
    id: 'light_cool',
    name: 'Light Cool',
    base: '#F5D5C8',
    shadow1: '#E8C5B8',
    shadow2: '#D8B0A4',
    shadow3: '#C49890',
    highlight1: '#FFE4DA',
    highlight2: '#FFF0EA',
    blush: '#F0A090',
    ambientOcclusion: '#B08478',
    undertone: 'cool',
    fitzpatrick: 2,
  },
  light_warm: {
    id: 'light_warm',
    name: 'Light Warm',
    base: '#F0D0B0',
    shadow1: '#E4C0A0',
    shadow2: '#D4AC8C',
    shadow3: '#C09474',
    highlight1: '#FCDEC4',
    highlight2: '#FFECD8',
    blush: '#E8A080',
    ambientOcclusion: '#A88060',
    undertone: 'warm',
    fitzpatrick: 2,
  },
  light_neutral: {
    id: 'light_neutral',
    name: 'Light Neutral',
    base: '#F2D2BC',
    shadow1: '#E6C2AC',
    shadow2: '#D6AE98',
    shadow3: '#C29684',
    highlight1: '#FCE2D0',
    highlight2: '#FFF0E4',
    blush: '#EC9C88',
    ambientOcclusion: '#AC846C',
    undertone: 'neutral',
    fitzpatrick: 2,
  },

  // ========== FITZPATRICK III (Medium/Light) ==========
  medium_cool: {
    id: 'medium_cool',
    name: 'Medium Cool',
    base: '#D4A890',
    shadow1: '#C49880',
    shadow2: '#B08470',
    shadow3: '#986C5C',
    highlight1: '#E4BCA8',
    highlight2: '#F0CDB8',
    blush: '#D08878',
    ambientOcclusion: '#845850',
    undertone: 'cool',
    fitzpatrick: 3,
  },
  medium_warm: {
    id: 'medium_warm',
    name: 'Medium Warm',
    base: '#D4A878',
    shadow1: '#C49868',
    shadow2: '#B08458',
    shadow3: '#987048',
    highlight1: '#E4BC90',
    highlight2: '#F0D0A8',
    blush: '#CC8868',
    ambientOcclusion: '#846040',
    undertone: 'warm',
    fitzpatrick: 3,
  },
  medium_neutral: {
    id: 'medium_neutral',
    name: 'Medium Neutral',
    base: '#D4A884',
    shadow1: '#C49874',
    shadow2: '#B08464',
    shadow3: '#986E52',
    highlight1: '#E4BC9C',
    highlight2: '#F0CEB0',
    blush: '#CE8870',
    ambientOcclusion: '#845C48',
    undertone: 'neutral',
    fitzpatrick: 3,
  },

  // ========== FITZPATRICK IV (Olive/Medium) ==========
  olive_cool: {
    id: 'olive_cool',
    name: 'Olive Cool',
    base: '#B8946C',
    shadow1: '#A8845C',
    shadow2: '#94704C',
    shadow3: '#7C5C40',
    highlight1: '#C8A880',
    highlight2: '#D8BC98',
    blush: '#B07860',
    ambientOcclusion: '#685038',
    undertone: 'cool',
    fitzpatrick: 4,
  },
  olive_warm: {
    id: 'olive_warm',
    name: 'Olive Warm',
    base: '#C49858',
    shadow1: '#B48848',
    shadow2: '#A07438',
    shadow3: '#88602C',
    highlight1: '#D4AC70',
    highlight2: '#E4C088',
    blush: '#BC7C50',
    ambientOcclusion: '#745028',
    undertone: 'warm',
    fitzpatrick: 4,
  },
  olive_neutral: {
    id: 'olive_neutral',
    name: 'Olive Neutral',
    base: '#BE9462',
    shadow1: '#AE8452',
    shadow2: '#9A7042',
    shadow3: '#825E36',
    highlight1: '#CEA878',
    highlight2: '#DEBC90',
    blush: '#B67A58',
    ambientOcclusion: '#6E5430',
    undertone: 'neutral',
    fitzpatrick: 4,
  },

  // ========== FITZPATRICK V (Brown) ==========
  brown_cool: {
    id: 'brown_cool',
    name: 'Brown Cool',
    base: '#8C6850',
    shadow1: '#7C5840',
    shadow2: '#684834',
    shadow3: '#543828',
    highlight1: '#9C7860',
    highlight2: '#AC8870',
    blush: '#885848',
    ambientOcclusion: '#442C20',
    undertone: 'cool',
    fitzpatrick: 5,
  },
  brown_warm: {
    id: 'brown_warm',
    name: 'Brown Warm',
    base: '#946840',
    shadow1: '#845830',
    shadow2: '#704824',
    shadow3: '#5C3818',
    highlight1: '#A47850',
    highlight2: '#B48860',
    blush: '#8C5838',
    ambientOcclusion: '#4C2C14',
    undertone: 'warm',
    fitzpatrick: 5,
  },
  brown_neutral: {
    id: 'brown_neutral',
    name: 'Brown Neutral',
    base: '#906848',
    shadow1: '#805838',
    shadow2: '#6C482C',
    shadow3: '#583820',
    highlight1: '#A07858',
    highlight2: '#B08868',
    blush: '#8A5840',
    ambientOcclusion: '#482C18',
    undertone: 'neutral',
    fitzpatrick: 5,
  },

  // ========== FITZPATRICK VI (Deep Brown/Dark) ==========
  dark_cool: {
    id: 'dark_cool',
    name: 'Dark Cool',
    base: '#5C4030',
    shadow1: '#4C3424',
    shadow2: '#3C281C',
    shadow3: '#2C1C14',
    highlight1: '#6C5040',
    highlight2: '#7C6050',
    blush: '#5C3830',
    ambientOcclusion: '#201410',
    undertone: 'cool',
    fitzpatrick: 6,
  },
  dark_warm: {
    id: 'dark_warm',
    name: 'Dark Warm',
    base: '#604020',
    shadow1: '#503418',
    shadow2: '#402810',
    shadow3: '#301C08',
    highlight1: '#705030',
    highlight2: '#806040',
    blush: '#5C3420',
    ambientOcclusion: '#24140C',
    undertone: 'warm',
    fitzpatrick: 6,
  },
  dark_neutral: {
    id: 'dark_neutral',
    name: 'Dark Neutral',
    base: '#5E4028',
    shadow1: '#4E341E',
    shadow2: '#3E2816',
    shadow3: '#2E1C0E',
    highlight1: '#6E5038',
    highlight2: '#7E6048',
    blush: '#5A3628',
    ambientOcclusion: '#22180C',
    undertone: 'neutral',
    fitzpatrick: 6,
  },

  // ========== SPECIALTY TONES ==========
  porcelain: {
    id: 'porcelain',
    name: 'Porcelain',
    base: '#FFF0E8',
    shadow1: '#F5E0D8',
    shadow2: '#E8D0C8',
    shadow3: '#D8C0B8',
    highlight1: '#FFF8F4',
    highlight2: '#FFFCFA',
    blush: '#FFC8BC',
    ambientOcclusion: '#C8B0A8',
    undertone: 'cool',
    fitzpatrick: 1,
  },
  golden: {
    id: 'golden',
    name: 'Golden',
    base: '#D8A860',
    shadow1: '#C89850',
    shadow2: '#B48440',
    shadow3: '#9C7030',
    highlight1: '#E8BC78',
    highlight2: '#F8D090',
    blush: '#D08850',
    ambientOcclusion: '#886028',
    undertone: 'warm',
    fitzpatrick: 4,
  },
  ebony: {
    id: 'ebony',
    name: 'Ebony',
    base: '#3C2818',
    shadow1: '#302010',
    shadow2: '#24180C',
    shadow3: '#181008',
    highlight1: '#4C3828',
    highlight2: '#5C4838',
    blush: '#3C2418',
    ambientOcclusion: '#100C04',
    undertone: 'neutral',
    fitzpatrick: 6,
  },
} as const;

/**
 * Get array of all skin tone IDs for iteration.
 */
export const SKIN_TONE_V2_IDS = Object.keys(SKIN_TONES_V2) as Array<keyof typeof SKIN_TONES_V2>;

/**
 * Get skin tones filtered by Fitzpatrick scale.
 * @param level - Fitzpatrick scale level (1-6)
 * @returns Array of skin tone entries for that level
 */
export function getSkinTonesByFitzpatrick(level: 1 | 2 | 3 | 4 | 5 | 6): SkinToneV2[] {
  return Object.values(SKIN_TONES_V2).filter((tone) => tone.fitzpatrick === level);
}

/**
 * Get skin tones filtered by undertone.
 * @param undertone - Undertone type
 * @returns Array of skin tone entries with that undertone
 */
export function getSkinTonesByUndertone(undertone: UndertoneType): SkinToneV2[] {
  return Object.values(SKIN_TONES_V2).filter((tone) => tone.undertone === undertone);
}

/**
 * Convert a SkinToneV2 to a ShadingTokenSet for use with the colorizer.
 * @param skinTone - The enhanced skin tone object
 * @returns A ShadingTokenSet ready for token replacement
 */
export function skinToneToShadingTokens(skinTone: SkinToneV2): ShadingTokenSet {
  return {
    base: skinTone.base,
    shadow1: skinTone.shadow1,
    shadow2: skinTone.shadow2,
    shadow3: skinTone.shadow3,
    highlight1: skinTone.highlight1,
    highlight2: skinTone.highlight2,
    blush: skinTone.blush,
    ambientOcclusion: skinTone.ambientOcclusion,
  };
}
