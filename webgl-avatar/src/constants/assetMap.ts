/**
 * Asset Map - Color and asset mappings for avatar customization
 *
 * Provides color constants for skin tones and hair colors used
 * in the avatar customization UI.
 */

// =============================================================================
// SKIN COLORS
// =============================================================================

/**
 * Skin color palette - maps skin tone names to hex colors
 */
export const SKIN_COLORS: Record<string, string> = {
  light1: '#FFE0BD',
  light2: '#FFCD94',
  light3: '#EAC086',
  medium1: '#D4A574',
  medium2: '#C68642',
  medium3: '#A67B5B',
  tan1: '#8D5524',
  tan2: '#7D4A1F',
  dark1: '#5C3A21',
  dark2: '#4A3021',
  dark3: '#3B241E',
};

// =============================================================================
// HAIR COLORS
// =============================================================================

/**
 * Hair color palette - maps hair color names to hex colors
 */
export const HAIR_COLORS: Record<string, string> = {
  black: '#1a1a1a',
  darkBrown: '#2d1b0e',
  brown: '#4a3728',
  auburn: '#8b4513',
  chestnut: '#954535',
  red: '#b74a2a',
  strawberryBlonde: '#daa06d',
  blonde: '#d4a76a',
  platinum: '#e8e4c9',
  gray: '#808080',
  silver: '#c0c0c0',
  white: '#f5f5f5',
};

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  SKIN_COLORS,
  HAIR_COLORS,
};
