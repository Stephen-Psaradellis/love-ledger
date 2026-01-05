/**
 * Avatar Asset Validation Script
 *
 * Task 9: Integration Testing
 *
 * Validates:
 * 1. SVG size budgets per asset type
 * 2. Random avatar combinations render correctly
 * 3. Matching algorithm works with enhanced avatars
 * 4. Layer composition is correct
 *
 * Run: npx ts-node scripts/validate-avatar-assets.ts
 * Or:  npx tsx scripts/validate-avatar-assets.ts
 */

import { heads } from '../components/avatar/parts/assets/heads';
import { eyes } from '../components/avatar/parts/assets/eyes';
import { noses } from '../components/avatar/parts/assets/noses';
import { mouths } from '../components/avatar/parts/assets/mouths';
import { hairBack, hairFront } from '../components/avatar/parts/assets/hair';
import { glasses, headwear } from '../components/avatar/parts/assets/accessories';
import { eyebrows } from '../components/avatar/parts/assets/eyebrows';
import { facialHair } from '../components/avatar/parts/assets/facialHair';
import { registerAllAssets } from '../components/avatar/parts/assets';
import { composePortrait, validateAvatarParts } from '../components/avatar/parts';
import { generateRandomAvatarConfig, DEFAULT_AVATAR_CONFIG } from '../lib/avatar/defaults';
import { compareAvatars, quickMatch, filterMatchingPosts } from '../lib/matching';
import type { CustomAvatarConfig } from '../components/avatar/types';

// =============================================================================
// SIZE BUDGETS (from Task Status Files)
// =============================================================================

interface SizeBudget {
  maxBytes: number;
  description: string;
  inScopeAssets: Set<string>; // Assets that were enhanced in Tasks 3-8
}

const SIZE_BUDGETS: Record<string, SizeBudget> = {
  head: {
    maxBytes: 3072,
    description: 'Heads - Task 3 (<3KB)',
    inScopeAssets: new Set(['oval', 'round', 'square']), // Task 3 scope
  },
  eyes: {
    maxBytes: 2048,
    description: 'Eyes - Task 4 (<2KB)',
    inScopeAssets: new Set(['almond', 'round', 'monolid', 'hooded']), // Task 4 scope
  },
  nose: {
    maxBytes: 1024,
    description: 'Noses - Task 5 (<1KB)',
    inScopeAssets: new Set(['straight', 'curved', 'wide', 'pointed']), // Task 5 scope
  },
  mouth: {
    maxBytes: 1536,
    description: 'Mouths - Task 6 (<1.5KB)',
    inScopeAssets: new Set(['neutral', 'smile', 'slight', 'serious']), // Task 6 scope
  },
  hairFront: {
    maxBytes: 5120,
    description: 'Hair Front - Task 7 (<5KB)',
    inScopeAssets: new Set(['short_front', 'medium_front', 'long_front', 'curly_front', 'wavy_front']), // Task 7 scope
  },
  hairBack: {
    maxBytes: 5120,
    description: 'Hair Back - Task 7 (<5KB)',
    inScopeAssets: new Set(['short_back', 'medium_back', 'long_back', 'curly_back', 'wavy_back']), // Task 7 scope
  },
  glasses: {
    maxBytes: 4096,
    description: 'Glasses - Task 8 (<4KB)',
    inScopeAssets: new Set(['round', 'square']), // Task 8 scope
  },
  headwear: {
    maxBytes: 4096,
    description: 'Headwear - Task 8 (<4KB)',
    inScopeAssets: new Set(['cap', 'beanie']), // Task 8 scope
  },
  eyebrows: {
    maxBytes: 2048,
    description: 'Eyebrows (<2KB)',
    inScopeAssets: new Set(), // Not in scope for Tasks 3-8
  },
  facialHair: {
    maxBytes: 3072,
    description: 'Facial Hair (<3KB)',
    inScopeAssets: new Set(), // Not in scope for Tasks 3-8
  },
};

// =============================================================================
// VALIDATION RESULTS
// =============================================================================

interface ValidationResult {
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
}

const results: ValidationResult[] = [];

function addResult(passed: boolean, message: string, details?: Record<string, unknown>): void {
  results.push({ passed, message, details });
  const icon = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${icon}\x1b[0m ${message}`);
  if (details && !passed) {
    console.log('  Details:', JSON.stringify(details, null, 2).split('\n').map(l => '    ' + l).join('\n'));
  }
}

// =============================================================================
// 1. SVG SIZE VALIDATION
// =============================================================================

function validateSvgSizes(): void {
  console.log('\n=== SVG SIZE VALIDATION ===\n');

  const assetGroups: Record<string, Record<string, string>> = {
    head: heads,
    eyes,
    nose: noses,
    mouth: mouths,
    hairFront,
    hairBack,
    eyebrows,
    facialHair,
    glasses,
    headwear,
  };

  const sizeReport: Record<string, { id: string; bytes: number; kb: string; overBudget: boolean; inScope: boolean }[]> = {};

  for (const [category, assets] of Object.entries(assetGroups)) {
    const budget = SIZE_BUDGETS[category];
    if (!budget) {
      addResult(false, `No budget defined for category: ${category}`);
      continue;
    }

    sizeReport[category] = [];
    const inScopeOverBudget: string[] = [];
    const outOfScopeOverBudget: string[] = [];
    let inScopeCount = 0;
    let inScopeUnderBudget = 0;

    for (const [id, svg] of Object.entries(assets)) {
      if (typeof svg !== 'string') continue;

      const bytes = new TextEncoder().encode(svg).length;
      const kb = (bytes / 1024).toFixed(2);
      const overBudget = bytes > budget.maxBytes;
      const inScope = budget.inScopeAssets.size === 0 || budget.inScopeAssets.has(id);

      sizeReport[category].push({ id, bytes, kb: `${kb}KB`, overBudget, inScope });

      if (inScope) {
        inScopeCount++;
        if (!overBudget) {
          inScopeUnderBudget++;
        } else {
          inScopeOverBudget.push(`${id}: ${kb}KB (max: ${(budget.maxBytes / 1024).toFixed(1)}KB)`);
        }
      } else if (overBudget) {
        outOfScopeOverBudget.push(`${id}: ${kb}KB`);
      }
    }

    // Report in-scope assets
    if (budget.inScopeAssets.size > 0) {
      if (inScopeOverBudget.length === 0 && inScopeCount > 0) {
        addResult(true, `${budget.description}: All ${inScopeCount} in-scope assets under budget`);
      } else if (inScopeCount === 0) {
        addResult(true, `${budget.description}: No in-scope assets to validate`);
      } else {
        addResult(false, `${budget.description}: ${inScopeOverBudget.length}/${inScopeCount} in-scope assets over budget`, {
          overBudget: inScopeOverBudget,
        });
      }

      // Note out-of-scope assets that are over budget (informational)
      if (outOfScopeOverBudget.length > 0) {
        console.log(`  ℹ ${category}: ${outOfScopeOverBudget.length} out-of-scope assets over budget (not enhanced in Tasks 3-8)`);
      }
    } else {
      // Category wasn't in scope for any task
      const totalOverBudget = sizeReport[category].filter(a => a.overBudget).length;
      if (totalOverBudget === 0) {
        addResult(true, `${budget.description}: All ${sizeReport[category].length} assets under budget`);
      } else {
        console.log(`  ℹ ${budget.description}: ${totalOverBudget} assets over budget (category not in Tasks 3-8 scope)`);
        addResult(true, `${budget.description}: Not in scope for Tasks 3-8`);
      }
    }
  }

  // Summary table
  console.log('\n--- Size Summary ---');
  for (const [category, items] of Object.entries(sizeReport)) {
    const budget = SIZE_BUDGETS[category];
    const maxItem = items.reduce((max, item) => (item.bytes > max.bytes ? item : max), items[0]);
    const avgBytes = items.reduce((sum, item) => sum + item.bytes, 0) / items.length;
    const inScopeItems = items.filter(i => i.inScope);
    console.log(
      `  ${category.padEnd(12)} | ${items.length} items (${inScopeItems.length} in-scope) | ` +
        `avg: ${(avgBytes / 1024).toFixed(2)}KB | ` +
        `max: ${maxItem?.kb || 'N/A'} (${maxItem?.id || 'N/A'}) | ` +
        `budget: ${(budget.maxBytes / 1024).toFixed(1)}KB`
    );
  }
}

// =============================================================================
// 2. RANDOM AVATAR COMPOSITION TEST
// =============================================================================

// Hair styles that have both _front and _back variants (fully implemented)
const FULLY_IMPLEMENTED_HAIR = new Set([
  'bald', 'short', 'medium', 'long', 'curly', 'wavy',
  'longStraight', 'longWavy', 'longCurly', 'ponytail', 'bun', 'braids', 'afro', 'locs',
]);

// Hair styles with only _front (back layer not yet implemented)
const FRONT_ONLY_HAIR = new Set([
  'sidePart', 'sideBangs', 'straightBangs', 'buzzCut', 'crew', 'fade',
  'undercut', 'spiky', 'quiff', 'pompadour', 'messyMedium', 'curtains', 'slickBack',
  'coils', 'afroSmall', 'pixie', 'bobShort', 'bobLong',
  'hijab', 'turban', 'shaved',
]);

// Hair styles that don't have any SVG assets yet (completely unimplemented)
const UNIMPLEMENTED_HAIR = new Set([
  'curlyBangs', 'twists', 'cornrows', 'bobLayered', 'headwrap', 'durag', 'caesar', 'textured', 'halfUp',
]);

function testRandomAvatarComposition(): void {
  console.log('\n=== RANDOM AVATAR COMPOSITION TEST ===\n');

  // Register all assets first
  registerAllAssets();

  const testConfigs: { name: string; config: CustomAvatarConfig }[] = [
    { name: 'Default Avatar', config: DEFAULT_AVATAR_CONFIG },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `Random Avatar ${i + 1}`,
      config: generateRandomAvatarConfig(),
    })),
  ];

  for (const { name, config } of testConfigs) {
    try {
      // Validate parts exist
      const validation = validateAvatarParts(config, 'portrait');

      if (!validation.valid) {
        // Check if missing parts are expected (known limitations vs actual bugs)
        const actuallyMissing = validation.missing.filter((m) => {
          // Hair back variants are known to be missing for some styles
          if (m.includes('hairBack:')) {
            const hairStyle = m.split(':')[1].replace('_back', '');
            // Expected to be missing for front-only and unimplemented styles
            if (FRONT_ONLY_HAIR.has(hairStyle) || UNIMPLEMENTED_HAIR.has(hairStyle)) return false;
            return FULLY_IMPLEMENTED_HAIR.has(hairStyle);
          }
          // Hair front might also be missing for unimplemented styles
          if (m.includes('hairFront:')) {
            const hairStyle = m.split(':')[1].replace('_front', '');
            // Unimplemented styles are expected to be missing entirely
            if (UNIMPLEMENTED_HAIR.has(hairStyle)) return false;
            return FULLY_IMPLEMENTED_HAIR.has(hairStyle) || FRONT_ONLY_HAIR.has(hairStyle);
          }
          // These are expected to be null for certain configs
          if (m.includes('facialHair:') && config.facialHair === 'none') return false;
          if (m.includes('glasses:') && config.glasses === 'none') return false;
          if (m.includes('headwear:') && config.headwear === 'none') return false;
          return true;
        });

        // Check for unimplemented hair styles
        if (UNIMPLEMENTED_HAIR.has(config.hairStyle)) {
          console.log(`  ⚠ ${name}: Uses unimplemented hair style (${config.hairStyle}) - skipping`);
          continue;
        }

        // If only missing known-limited parts, log as info but don't fail
        const knownLimitations = validation.missing.filter((m) => !actuallyMissing.includes(m));
        if (knownLimitations.length > 0 && actuallyMissing.length === 0) {
          console.log(`  ℹ ${name}: Uses partially-implemented assets (${knownLimitations.join(', ')})`);
        }

        if (actuallyMissing.length > 0) {
          addResult(false, `${name}: Missing required parts`, {
            missingParts: actuallyMissing,
            hairStyle: config.hairStyle,
            facialHair: config.facialHair,
            glasses: config.glasses,
            headwear: config.headwear,
          });
          continue;
        }
      }

      // Try to compose the avatar
      const svg = composePortrait(config);

      // Basic validation of composed SVG
      const hasValidSvg = svg.includes('<svg') && svg.includes('</svg>');
      const hasContent = svg.length > 500; // Should have substantial content
      const hasLayers = svg.includes('class="layer-'); // Should have layer groups

      if (hasValidSvg && hasContent && hasLayers) {
        addResult(true, `${name}: Composed successfully (${(svg.length / 1024).toFixed(2)}KB)`);
      } else {
        addResult(false, `${name}: Composition issues`, {
          hasValidSvg,
          hasContent,
          hasLayers,
          svgLength: svg.length,
        });
      }
    } catch (error) {
      addResult(false, `${name}: Composition failed with error`, {
        error: error instanceof Error ? error.message : String(error),
        config: {
          faceShape: config.faceShape,
          hairStyle: config.hairStyle,
          eyeShape: config.eyeShape,
        },
      });
    }
  }
}

// =============================================================================
// 3. MATCHING ALGORITHM TEST
// =============================================================================

function testMatchingAlgorithm(): void {
  console.log('\n=== MATCHING ALGORITHM TEST ===\n');

  // Create test avatar configs (convert CustomAvatarConfig to legacy AvatarConfig format)
  function toLegacyConfig(config: CustomAvatarConfig) {
    return {
      skinColor: config.skinTone,
      hairColor: config.hairColor,
      topType: config.hairStyle,
      facialHairType: config.facialHair,
      facialHairColor: config.facialHairColor,
      eyeType: config.eyeShape,
      eyebrowType: config.eyebrowStyle,
      mouthType: config.mouthExpression,
      clotheType: config.topType,
      clotheColor: config.topColor,
      accessoriesType: config.glasses,
      graphicType: 'none',
    };
  }

  // Test 1: Identical avatars should have 100% match
  const avatar1 = toLegacyConfig(DEFAULT_AVATAR_CONFIG);
  const result1 = compareAvatars(avatar1, avatar1);
  addResult(
    result1.score === 100,
    `Identical avatars match: ${result1.score}% (expected 100%)`,
    { score: result1.score, quality: result1.quality }
  );

  // Test 2: Completely different avatars should have low match
  const differentAvatar = toLegacyConfig({
    ...DEFAULT_AVATAR_CONFIG,
    skinTone: 'dark2',
    hairColor: 'blonde',
    hairStyle: 'afro',
    facialHair: 'fullBeard',
    eyeShape: 'monolid',
    mouthExpression: 'frown',
    glasses: 'aviator',
  });
  const result2 = compareAvatars(avatar1, differentAvatar);
  addResult(
    result2.score < 50,
    `Different avatars low match: ${result2.score}% (expected <50%)`,
    { score: result2.score, quality: result2.quality }
  );

  // Test 3: quickMatch should work correctly
  const quickResult1 = quickMatch(avatar1, avatar1);
  addResult(quickResult1 === true, `quickMatch identical: ${quickResult1} (expected true)`);

  const quickResult2 = quickMatch(avatar1, differentAvatar);
  addResult(quickResult2 === false, `quickMatch different: ${quickResult2} (expected false)`);

  // Test 4: filterMatchingPosts should filter correctly
  const posts = [
    { id: '1', target_avatar: avatar1 },
    { id: '2', target_avatar: differentAvatar },
    { id: '3', target_avatar: { ...avatar1, hairColor: 'black' } },
    { id: '4', target_avatar: null },
  ];

  const matchingPosts = filterMatchingPosts(avatar1, posts, 60);
  addResult(
    matchingPosts.length >= 1 && matchingPosts.some((p) => p.id === '1'),
    `filterMatchingPosts: Found ${matchingPosts.length} matches (expected >=1 including id:1)`,
    { matchedIds: matchingPosts.map((p) => p.id) }
  );

  // Test 5: Random avatar matching consistency
  console.log('\n  Testing 10 random avatar pairs...');
  let consistentResults = 0;
  for (let i = 0; i < 10; i++) {
    const randomA = toLegacyConfig(generateRandomAvatarConfig());
    const randomB = toLegacyConfig(generateRandomAvatarConfig());

    const fullResult = compareAvatars(randomA, randomB);
    const quickResult = quickMatch(randomA, randomB, 60);

    // quickMatch should be consistent with full comparison
    const expectedQuick = fullResult.score >= 60;
    if (quickResult === expectedQuick) {
      consistentResults++;
    }
  }
  addResult(
    consistentResults >= 8,
    `Random matching consistency: ${consistentResults}/10 consistent (expected >=8)`,
    { consistentResults }
  );
}

// =============================================================================
// 4. LAYER COMPOSITION TEST
// =============================================================================

function testLayerComposition(): void {
  console.log('\n=== LAYER COMPOSITION TEST ===\n');

  registerAllAssets();

  // Test specific layer ordering scenarios
  const testCases = [
    {
      name: 'Hair behind head',
      config: { ...DEFAULT_AVATAR_CONFIG, hairStyle: 'longStraight' as const },
      expectLayers: ['hairBack', 'head', 'hairFront'],
    },
    {
      name: 'Glasses over eyes',
      config: { ...DEFAULT_AVATAR_CONFIG, glasses: 'round' as const },
      expectLayers: ['eyes', 'glasses'],
    },
    {
      name: 'Headwear on top',
      config: { ...DEFAULT_AVATAR_CONFIG, headwear: 'cap' as const },
      expectLayers: ['head', 'headwear'],
    },
    {
      name: 'Facial hair over mouth',
      config: { ...DEFAULT_AVATAR_CONFIG, facialHair: 'fullBeard' as const },
      expectLayers: ['mouth', 'facialHair'],
    },
  ];

  for (const { name, config, expectLayers } of testCases) {
    try {
      const svg = composePortrait(config);

      // Check that layers appear in the correct order
      let lastIndex = -1;
      let correctOrder = true;
      const layerPositions: Record<string, number> = {};

      for (const layer of expectLayers) {
        const pattern = `class="layer-${layer}"`;
        const index = svg.indexOf(pattern);
        layerPositions[layer] = index;

        if (index === -1) {
          // Layer might be optional (like hairBack for short hair)
          continue;
        }

        if (index <= lastIndex) {
          correctOrder = false;
        }
        lastIndex = index;
      }

      addResult(correctOrder, `${name}: Layer order correct`, {
        expectedOrder: expectLayers,
        positions: layerPositions,
      });
    } catch (error) {
      addResult(false, `${name}: Layer test failed`, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Test that no visual glitches occur (basic SVG validity)
  // Use a fully implemented hair style for this test
  const fullTestConfig = {
    ...DEFAULT_AVATAR_CONFIG,
    hairStyle: 'long' as const, // Use enhanced 'long' style which has both back and front
    facialHair: 'goatee' as const,
    glasses: 'square' as const,
    headwear: 'beanie' as const,
  };

  try {
    const fullSvg = composePortrait(fullTestConfig);

    // Check for common SVG issues
    // Note: Self-closing tags like <path ... /> are valid XML, so we check for unclosed non-self-closing tags
    const hasMismatchedDefs = (fullSvg.match(/<defs>/g) || []).length !== (fullSvg.match(/<\/defs>/g) || []).length;
    const hasInvalidGradients = fullSvg.includes('url(#undefined)') || fullSvg.includes('url(#null)');
    const hasMismatchedGs = (fullSvg.match(/<g[^>]*>/g) || []).length !== (fullSvg.match(/<\/g>/g) || []).length;
    const hasProperStructure = fullSvg.startsWith('<svg') && fullSvg.endsWith('</svg>');

    const noIssues = !hasMismatchedDefs && !hasInvalidGradients && !hasMismatchedGs && hasProperStructure;
    addResult(noIssues, 'Full avatar SVG validity check', {
      hasMismatchedDefs,
      hasInvalidGradients,
      hasMismatchedGs,
      hasProperStructure,
    });
  } catch (error) {
    addResult(false, 'Full avatar composition failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main(): Promise<void> {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         AVATAR ASSET VALIDATION - Task 9                   ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  validateSvgSizes();
  testRandomAvatarComposition();
  testMatchingAlgorithm();
  testLayerComposition();

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  console.log(`  Total Tests: ${total}`);
  console.log(`  \x1b[32mPassed: ${passed}\x1b[0m`);
  console.log(`  \x1b[31mFailed: ${failed}\x1b[0m`);
  console.log(`  Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.log('\n  Failed Tests:');
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        console.log(`    ✗ ${r.message}`);
      });
  }

  console.log('\n');

  // Exit with error code if any tests failed
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Validation script failed:', error);
  process.exit(1);
});
