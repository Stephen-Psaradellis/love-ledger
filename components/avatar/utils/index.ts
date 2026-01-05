/**
 * Avatar Utilities - Exports
 */

export {
  getCachedAvatar,
  cacheAvatar,
  invalidateCache,
  clearAllCaches,
  getCacheStats,
  pruneExpiredCache,
  isInMemoryCache,
  getFromMemoryCache,
  setToMemoryCache,
  type AvatarCacheResult,
} from './cache';
