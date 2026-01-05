/**
 * Custom Avatar System - Library Exports
 *
 * Core avatar functionality: defaults, storage, and matching.
 */

// Defaults and creation utilities
export {
  DEFAULT_AVATAR_CONFIG,
  AVATAR_SCHEMA_VERSION,
  getRandomValue,
  generateRandomAvatarConfig,
  generateRandomAvatarWithConstraints,
  createStoredAvatar,
  createDefaultStoredAvatar,
  createRandomStoredAvatar,
  normalizeAvatarConfig,
  normalizeStoredAvatar,
} from './defaults';

// Storage operations
export {
  // Types
  type AvatarSaveResult,
  type AvatarLoadResult,

  // Profile avatar operations
  saveUserAvatar,
  saveCurrentUserAvatar,
  saveCurrentUserAvatarConfig,
  loadUserAvatar,
  loadCurrentUserAvatar,
  deleteUserAvatar,
  deleteCurrentUserAvatar,
  hasUserAvatar,
  hasCurrentUserAvatar,

  // Post avatar operations
  updatePostTargetAvatar,
  loadPostTargetAvatar,

  // Batch operations
  loadMultipleUserAvatars,

  // Convenience object
  avatarStorage,
} from './storage';
