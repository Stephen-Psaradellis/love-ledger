/**
 * Avatar Cache System
 *
 * Multi-level caching for composed avatar SVGs.
 * Level 1: In-memory LRU cache (fast)
 * Level 2: AsyncStorage (persistent)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CustomAvatarConfig, AvatarView } from '../types';

// =============================================================================
// Configuration
// =============================================================================

const CACHE_CONFIG = {
  /** Maximum items in memory cache */
  memoryMaxSize: 100,
  /** Storage key prefix */
  storagePrefix: 'avatar_cache_',
  /** Maximum items in persistent storage */
  maxStorageItems: 500,
  /** Cache TTL in days */
  ttlDays: 30,
} as const;

// =============================================================================
// Cache Key Generation
// =============================================================================

/**
 * Generate a hash from avatar config for cache key
 */
function hashConfig(config: CustomAvatarConfig, view: AvatarView): string {
  // Create a deterministic string from config
  const configString = JSON.stringify({
    ...config,
    _view: view,
  });

  // Simple hash function (djb2)
  let hash = 5381;
  for (let i = 0; i < configString.length; i++) {
    hash = (hash * 33) ^ configString.charCodeAt(i);
  }

  // Convert to base36 for shorter string
  return (hash >>> 0).toString(36);
}

/**
 * Generate a full cache key
 */
function getCacheKey(config: CustomAvatarConfig, view: AvatarView): string {
  return `${CACHE_CONFIG.storagePrefix}${view}_${hashConfig(config, view)}`;
}

// =============================================================================
// LRU Memory Cache
// =============================================================================

interface CacheEntry {
  svg: string;
  timestamp: number;
}

class LRUCache {
  private cache: Map<string, CacheEntry>;
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.svg;
  }

  set(key: string, svg: string): void {
    // Delete if exists (will be re-added at end)
    this.cache.delete(key);

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value;
      if (oldest) {
        this.cache.delete(oldest);
      }
    }

    this.cache.set(key, {
      svg,
      timestamp: Date.now(),
    });
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

// Singleton memory cache
const memoryCache = new LRUCache(CACHE_CONFIG.memoryMaxSize);

// =============================================================================
// Persistent Storage Cache
// =============================================================================

interface StoredCacheEntry {
  svg: string;
  timestamp: number;
  view: AvatarView;
}

/**
 * Get from persistent storage
 */
async function getFromStorage(key: string): Promise<string | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    const entry: StoredCacheEntry = JSON.parse(data);

    // Check TTL
    const ttlMs = CACHE_CONFIG.ttlDays * 24 * 60 * 60 * 1000;
    if (Date.now() - entry.timestamp > ttlMs) {
      // Expired, remove it
      AsyncStorage.removeItem(key).catch(() => {});
      return null;
    }

    return entry.svg;
  } catch {
    return null;
  }
}

/**
 * Save to persistent storage
 */
async function saveToStorage(
  key: string,
  svg: string,
  view: AvatarView
): Promise<void> {
  try {
    const entry: StoredCacheEntry = {
      svg,
      timestamp: Date.now(),
      view,
    };
    await AsyncStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.warn('[avatar/cache] Failed to save to storage:', error);
  }
}

/**
 * Remove from persistent storage
 */
async function removeFromStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

// =============================================================================
// Public API
// =============================================================================

export interface AvatarCacheResult {
  svg: string | null;
  source: 'memory' | 'storage' | 'miss';
}

/**
 * Get a cached avatar SVG
 */
export async function getCachedAvatar(
  config: CustomAvatarConfig,
  view: AvatarView
): Promise<AvatarCacheResult> {
  const key = getCacheKey(config, view);

  // Check memory cache first
  const memorySvg = memoryCache.get(key);
  if (memorySvg) {
    return { svg: memorySvg, source: 'memory' };
  }

  // Check persistent storage
  const storageSvg = await getFromStorage(key);
  if (storageSvg) {
    // Promote to memory cache
    memoryCache.set(key, storageSvg);
    return { svg: storageSvg, source: 'storage' };
  }

  return { svg: null, source: 'miss' };
}

/**
 * Cache an avatar SVG
 */
export async function cacheAvatar(
  config: CustomAvatarConfig,
  view: AvatarView,
  svg: string
): Promise<void> {
  const key = getCacheKey(config, view);

  // Save to memory cache
  memoryCache.set(key, svg);

  // Save to persistent storage (async, don't await)
  saveToStorage(key, svg, view);
}

/**
 * Invalidate cache for a specific config
 */
export async function invalidateCache(
  config: CustomAvatarConfig,
  view?: AvatarView
): Promise<void> {
  const views: AvatarView[] = view ? [view] : ['portrait', 'fullBody'];

  for (const v of views) {
    const key = getCacheKey(config, v);
    memoryCache.delete(key);
    await removeFromStorage(key);
  }
}

/**
 * Clear all avatar caches
 */
export async function clearAllCaches(): Promise<void> {
  // Clear memory cache
  memoryCache.clear();

  // Clear storage cache
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter((key) =>
      key.startsWith(CACHE_CONFIG.storagePrefix)
    );
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch (error) {
    console.warn('[avatar/cache] Failed to clear storage cache:', error);
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  memorySize: number;
  storageSize: number;
}> {
  let storageSize = 0;

  try {
    const allKeys = await AsyncStorage.getAllKeys();
    storageSize = allKeys.filter((key) =>
      key.startsWith(CACHE_CONFIG.storagePrefix)
    ).length;
  } catch {
    // Ignore errors
  }

  return {
    memorySize: memoryCache.size,
    storageSize,
  };
}

/**
 * Prune expired entries from storage
 */
export async function pruneExpiredCache(): Promise<number> {
  let pruned = 0;

  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter((key) =>
      key.startsWith(CACHE_CONFIG.storagePrefix)
    );

    const ttlMs = CACHE_CONFIG.ttlDays * 24 * 60 * 60 * 1000;
    const keysToRemove: string[] = [];

    for (const key of cacheKeys) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        try {
          const entry: StoredCacheEntry = JSON.parse(data);
          if (Date.now() - entry.timestamp > ttlMs) {
            keysToRemove.push(key);
          }
        } catch {
          // Invalid entry, remove it
          keysToRemove.push(key);
        }
      }
    }

    if (keysToRemove.length > 0) {
      await AsyncStorage.multiRemove(keysToRemove);
      pruned = keysToRemove.length;
    }
  } catch (error) {
    console.warn('[avatar/cache] Failed to prune cache:', error);
  }

  return pruned;
}

// =============================================================================
// Hook-friendly Functions
// =============================================================================

/**
 * Synchronously check if avatar is in memory cache
 */
export function isInMemoryCache(
  config: CustomAvatarConfig,
  view: AvatarView
): boolean {
  const key = getCacheKey(config, view);
  return memoryCache.has(key);
}

/**
 * Synchronously get from memory cache only
 */
export function getFromMemoryCache(
  config: CustomAvatarConfig,
  view: AvatarView
): string | null {
  const key = getCacheKey(config, view);
  return memoryCache.get(key);
}

/**
 * Synchronously set to memory cache only
 */
export function setToMemoryCache(
  config: CustomAvatarConfig,
  view: AvatarView,
  svg: string
): void {
  const key = getCacheKey(config, view);
  memoryCache.set(key, svg);
}
