/**
 * Avatar Types - Legacy Re-exports
 *
 * This file provides backward compatibility for code that imports
 * from types/avatar. The new avatar system is in components/avatar/types.
 *
 * @deprecated Import directly from 'components/avatar/types' instead.
 */

// Re-export new types for backward compatibility
export type { CustomAvatarConfig as AvatarConfig } from '../components/avatar/types';
export type { StoredCustomAvatar as StoredAvatar } from '../components/avatar/types';

// Re-export the default config from lib/avatar/defaults
export { DEFAULT_AVATAR_CONFIG } from '../lib/avatar/defaults';
