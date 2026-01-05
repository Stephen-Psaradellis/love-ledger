/**
 * Custom Avatar Matching Algorithm
 *
 * Enhanced matching for the new CustomAvatarConfig system.
 * Supports fuzzy matching for similar attributes.
 *
 * @example
 * ```tsx
 * import { compareAvatars, quickMatch, filterMatchingPosts } from 'lib/avatar/matching'
 *
 * const result = compareAvatars(targetAvatar, myAvatar)
 * console.log(result.score) // 0-100
 * console.log(result.quality) // 'excellent' | 'good' | 'fair' | 'poor'
 * ```
 */

import type {
  CustomAvatarConfig,
  StoredCustomAvatar,
  AvatarAttribute,
} from '../../components/avatar/types';
import {
  PRIMARY_ATTRIBUTES,
  SECONDARY_ATTRIBUTES,
  MATCHING_WEIGHTS,
} from '../../components/avatar/types';
import { getAttributeSimilarity } from '../../components/avatar/constants';
import { DEFAULT_AVATAR_CONFIG } from './defaults';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Match quality rating based on score
 */
export type MatchQuality = 'excellent' | 'good' | 'fair' | 'poor';

/**
 * Result of comparing two avatars
 */
export interface MatchResult {
  /** Match score from 0 to 100 */
  score: number;
  /** Quality rating based on score thresholds */
  quality: MatchQuality;
  /** Whether it meets the minimum threshold (default 60%) */
  isMatch: boolean;
  /** Breakdown of attribute matches */
  breakdown: {
    /** Primary attributes match percentage (0-100) */
    primaryScore: number;
    /** Secondary attributes match percentage (0-100) */
    secondaryScore: number;
    /** List of matching attribute names */
    matchingAttributes: AvatarAttribute[];
    /** List of partially matching attribute names (fuzzy) */
    partialMatchAttributes: AvatarAttribute[];
    /** List of non-matching attribute names */
    nonMatchingAttributes: AvatarAttribute[];
  };
}

/**
 * Configuration for the matching algorithm
 */
export interface MatchingConfig {
  /** Weight for primary attributes (0-1, default 0.6) */
  primaryWeight: number;
  /** Weight for secondary attributes (0-1, default 0.4) */
  secondaryWeight: number;
  /** Minimum score to be considered a match (0-100, default 60) */
  defaultThreshold: number;
  /** Enable fuzzy matching for similar values (default true) */
  useFuzzyMatching: boolean;
}

/**
 * Post with target avatar for filtering
 */
export interface PostWithCustomAvatar {
  id: string;
  target_avatar_v2?: StoredCustomAvatar | CustomAvatarConfig | null;
  [key: string]: unknown;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default matching configuration
 */
export const DEFAULT_MATCHING_CONFIG: MatchingConfig = {
  primaryWeight: MATCHING_WEIGHTS.primary,
  secondaryWeight: MATCHING_WEIGHTS.secondary,
  defaultThreshold: 60,
  useFuzzyMatching: true,
};

/**
 * Score thresholds for quality ratings
 */
export const QUALITY_THRESHOLDS = {
  excellent: 85,
  good: 70,
  fair: 50,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Extract config from a StoredCustomAvatar or CustomAvatarConfig
 */
function extractConfig(
  avatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined
): CustomAvatarConfig | null {
  if (!avatar) return null;
  if ('config' in avatar && avatar.config) {
    return avatar.config;
  }
  if ('skinTone' in avatar) {
    return avatar as CustomAvatarConfig;
  }
  return null;
}

/**
 * Normalize an avatar config, filling in missing values with defaults
 */
function normalizeAvatar(
  avatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined
): CustomAvatarConfig {
  const config = extractConfig(avatar);
  if (!config) {
    return { ...DEFAULT_AVATAR_CONFIG };
  }
  return {
    ...DEFAULT_AVATAR_CONFIG,
    ...config,
  };
}

/**
 * Get the quality rating for a score
 */
function getQualityFromScore(score: number): MatchQuality {
  if (score >= QUALITY_THRESHOLDS.excellent) return 'excellent';
  if (score >= QUALITY_THRESHOLDS.good) return 'good';
  if (score >= QUALITY_THRESHOLDS.fair) return 'fair';
  return 'poor';
}

/**
 * Compare a single attribute between two avatars
 * Returns a score from 0 to 1 (supports fuzzy matching)
 */
function compareAttribute(
  attribute: AvatarAttribute,
  targetValue: string,
  consumerValue: string,
  useFuzzy: boolean
): number {
  // Exact match
  if (targetValue.toLowerCase() === consumerValue.toLowerCase()) {
    return 1;
  }

  // Fuzzy match
  if (useFuzzy) {
    return getAttributeSimilarity(attribute, targetValue, consumerValue);
  }

  return 0;
}

/**
 * Calculate match percentage for a set of attributes
 */
function calculateAttributeGroupScore(
  targetAvatar: CustomAvatarConfig,
  consumerAvatar: CustomAvatarConfig,
  attributes: readonly AvatarAttribute[],
  useFuzzy: boolean
): {
  score: number;
  matching: AvatarAttribute[];
  partial: AvatarAttribute[];
  nonMatching: AvatarAttribute[];
} {
  const matching: AvatarAttribute[] = [];
  const partial: AvatarAttribute[] = [];
  const nonMatching: AvatarAttribute[] = [];
  let totalScore = 0;

  for (const attr of attributes) {
    const targetVal = targetAvatar[attr] as string;
    const consumerVal = consumerAvatar[attr] as string;
    const attrScore = compareAttribute(attr, targetVal, consumerVal, useFuzzy);

    if (attrScore >= 1) {
      matching.push(attr);
    } else if (attrScore > 0) {
      partial.push(attr);
    } else {
      nonMatching.push(attr);
    }

    totalScore += attrScore;
  }

  const score =
    attributes.length > 0 ? (totalScore / attributes.length) * 100 : 0;

  return { score, matching, partial, nonMatching };
}

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

/**
 * Compare two avatars and calculate a match score
 *
 * @param targetAvatar - The avatar from the post's target_avatar_v2 field
 * @param consumerAvatar - The consumer's own avatar from their profile
 * @param threshold - Minimum score to be considered a match (default: 60)
 * @param config - Optional matching configuration
 * @returns Detailed match result with score, quality, and breakdown
 */
export function compareAvatars(
  targetAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  consumerAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  threshold: number = DEFAULT_MATCHING_CONFIG.defaultThreshold,
  config: Partial<MatchingConfig> = {}
): MatchResult {
  const matchConfig = { ...DEFAULT_MATCHING_CONFIG, ...config };

  // Normalize both avatars
  const normalizedTarget = normalizeAvatar(targetAvatar);
  const normalizedConsumer = normalizeAvatar(consumerAvatar);

  // Calculate primary attributes score
  const primaryResult = calculateAttributeGroupScore(
    normalizedTarget,
    normalizedConsumer,
    PRIMARY_ATTRIBUTES,
    matchConfig.useFuzzyMatching
  );

  // Calculate secondary attributes score
  const secondaryResult = calculateAttributeGroupScore(
    normalizedTarget,
    normalizedConsumer,
    SECONDARY_ATTRIBUTES,
    matchConfig.useFuzzyMatching
  );

  // Calculate weighted final score
  const finalScore = Math.round(
    primaryResult.score * matchConfig.primaryWeight +
      secondaryResult.score * matchConfig.secondaryWeight
  );

  return {
    score: finalScore,
    quality: getQualityFromScore(finalScore),
    isMatch: finalScore >= threshold,
    breakdown: {
      primaryScore: Math.round(primaryResult.score),
      secondaryScore: Math.round(secondaryResult.score),
      matchingAttributes: [
        ...primaryResult.matching,
        ...secondaryResult.matching,
      ],
      partialMatchAttributes: [
        ...primaryResult.partial,
        ...secondaryResult.partial,
      ],
      nonMatchingAttributes: [
        ...primaryResult.nonMatching,
        ...secondaryResult.nonMatching,
      ],
    },
  };
}

/**
 * Quick boolean check if two avatars match
 */
export function quickMatch(
  targetAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  consumerAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  threshold: number = DEFAULT_MATCHING_CONFIG.defaultThreshold
): boolean {
  const normalizedTarget = normalizeAvatar(targetAvatar);
  const normalizedConsumer = normalizeAvatar(consumerAvatar);

  // Quick check on primary attributes only
  const primaryResult = calculateAttributeGroupScore(
    normalizedTarget,
    normalizedConsumer,
    PRIMARY_ATTRIBUTES,
    true
  );

  // If primary score is excellent, it's definitely a match
  if (primaryResult.score >= QUALITY_THRESHOLDS.excellent) {
    return true;
  }

  // If primary score is very low, it's definitely not a match
  if (primaryResult.score < 30) {
    return false;
  }

  // For borderline cases, do the full calculation
  const result = compareAvatars(targetAvatar, consumerAvatar, threshold);
  return result.isMatch;
}

/**
 * Filter an array of posts to only those matching the consumer's avatar
 */
export function filterMatchingPosts<T extends PostWithCustomAvatar>(
  consumerAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  posts: T[],
  threshold: number = DEFAULT_MATCHING_CONFIG.defaultThreshold
): T[] {
  if (!posts || posts.length === 0) {
    return [];
  }

  return posts
    .map((post) => ({
      post,
      result: compareAvatars(post.target_avatar_v2, consumerAvatar, threshold),
    }))
    .filter(({ result }) => result.isMatch)
    .sort((a, b) => b.result.score - a.result.score)
    .map(({ post }) => post);
}

/**
 * Get posts with their match scores
 */
export function getPostsWithMatchScores<T extends PostWithCustomAvatar>(
  consumerAvatar: StoredCustomAvatar | CustomAvatarConfig | null | undefined,
  posts: T[]
): Array<{ post: T; match: MatchResult }> {
  if (!posts || posts.length === 0) {
    return [];
  }

  return posts
    .map((post) => ({
      post,
      match: compareAvatars(post.target_avatar_v2, consumerAvatar),
    }))
    .sort((a, b) => b.match.score - a.match.score);
}

/**
 * Get a human-readable match description
 */
export function getMatchDescription(result: MatchResult): string {
  const qualityLabel = {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
  }[result.quality];

  return `${result.score}% match - ${qualityLabel}`;
}

/**
 * Human-readable attribute names
 */
const ATTRIBUTE_LABELS: Record<AvatarAttribute, string> = {
  skinTone: 'skin tone',
  hairColor: 'hair color',
  hairStyle: 'hairstyle',
  facialHair: 'facial hair',
  facialHairColor: 'facial hair color',
  faceShape: 'face shape',
  eyeShape: 'eye shape',
  eyeColor: 'eye color',
  eyebrowStyle: 'eyebrow style',
  noseShape: 'nose shape',
  mouthExpression: 'expression',
  bodyShape: 'body type',
  heightCategory: 'height',
  topType: 'top style',
  topColor: 'top color',
  bottomType: 'bottom style',
  bottomColor: 'bottom color',
  glasses: 'glasses',
  headwear: 'headwear',
};

/**
 * Get matching attributes as a human-readable string
 */
export function explainMatch(result: MatchResult): string {
  const { matchingAttributes, partialMatchAttributes } = result.breakdown;

  if (matchingAttributes.length === 0 && partialMatchAttributes.length === 0) {
    return 'No matching features';
  }

  // Combine exact and partial matches, prioritizing exact
  const allMatches = [
    ...matchingAttributes.map((attr) => ATTRIBUTE_LABELS[attr]),
    ...partialMatchAttributes
      .slice(0, 2)
      .map((attr) => `similar ${ATTRIBUTE_LABELS[attr]}`),
  ].slice(0, 3);

  if (allMatches.length === 1) {
    return `${allMatches[0]} matches`;
  }

  if (allMatches.length === 2) {
    return `${allMatches[0]} and ${allMatches[1]} match`;
  }

  const lastAttr = allMatches.pop();
  return `${allMatches.join(', ')}, and ${lastAttr} match`;
}

/**
 * Get a color code for displaying match quality
 */
export function getMatchQualityColor(quality: MatchQuality): string {
  const colors: Record<MatchQuality, string> = {
    excellent: '#34C759',
    good: '#FF6B47',
    fair: '#FF9500',
    poor: '#8E8E93',
  };
  return colors[quality];
}

/**
 * Get a color code for a match score
 */
export function getMatchScoreColor(score: number): string {
  return getMatchQualityColor(getQualityFromScore(score));
}
