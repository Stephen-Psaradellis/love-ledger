/**
 * Location Search Components Index
 * Central export file for all location search and discovery components
 *
 * This module provides:
 * - UI Components: SearchBar, VenueCard, PopularVenues
 * - Skeleton Components: VenueCardSkeleton, PopularVenuesSkeleton
 * - Preset Variants: CompactVenueCard, VenueCardNoDistance, VenueCardListItem
 */

// ============================================================================
// UI Components
// ============================================================================

export { SearchBar } from './SearchBar'
export { VenueCard } from './VenueCard'
export { PopularVenues } from './PopularVenues'

// ============================================================================
// Skeleton Components
// ============================================================================

export { VenueCardSkeleton } from './VenueCard'
export { PopularVenuesSkeleton } from './PopularVenues'

// ============================================================================
// Preset Variants
// ============================================================================

export { CompactVenueCard, VenueCardNoDistance, VenueCardListItem } from './VenueCard'

// ============================================================================
// Types
// ============================================================================

export type { SearchBarProps } from './SearchBar'
export type {
  VenueCardProps,
  VenueCardSkeletonProps,
  VenueCardListItemProps,
} from './VenueCard'
export type {
  PopularVenuesProps,
  PopularVenuesSkeletonProps,
} from './PopularVenues'
