/**
 * Avatar Assets Index
 *
 * Imports and registers all SVG assets for the avatar system.
 */

import { registerParts } from '../registry';
import { heads } from './heads';
import { eyes } from './eyes';
import { eyebrows } from './eyebrows';
import { noses } from './noses';
import { mouths } from './mouths';
import { hairBack, hairFront } from './hair';
import { facialHair } from './facialHair';
import { bodies } from './bodies';
import { tops, bottoms } from './clothing';
import { glasses, headwear, ears, neck } from './accessories';

/**
 * Register all avatar assets with the registry.
 * Call this once at app startup.
 */
export function registerAllAssets(): void {
  // Clear any existing placeholders
  // (we'll keep them as fallbacks in the registry)

  // Face/head
  registerParts('head', heads);
  registerParts('eyes', eyes);
  registerParts('eyebrows', eyebrows);
  registerParts('nose', noses);
  registerParts('mouth', mouths);

  // Hair
  registerParts('hairBack', hairBack);
  registerParts('hairFront', hairFront);

  // Facial hair
  registerParts('facialHair', facialHair);

  // Body (full-body view)
  registerParts('body', bodies);
  registerParts('top', tops);
  registerParts('bottom', bottoms);

  // Accessories
  registerParts('glasses', glasses);
  registerParts('headwear', headwear);
  registerParts('ears', ears);
  registerParts('neck', neck);

  console.log('[avatar/assets] Registered all avatar assets');
}

// Export individual asset collections for direct access if needed
export {
  heads,
  eyes,
  eyebrows,
  noses,
  mouths,
  hairBack,
  hairFront,
  facialHair,
  bodies,
  tops,
  bottoms,
  glasses,
  headwear,
  ears,
  neck,
};

// Auto-register on import
registerAllAssets();
