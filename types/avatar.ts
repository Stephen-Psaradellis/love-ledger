/**
 * Avatar Configuration Types
 *
 * @deprecated These types are from the legacy DiceBear avatar system.
 * The app now uses Ready Player Me avatars via StoredAvatar type.
 * These types are kept for backward compatibility with older code.
 */

/**
 * @deprecated Use StoredAvatar from components/ReadyPlayerMe instead
 */
export interface AvatarConfig {
  skinColor?: string
  hairColor?: string
  topType?: string
  facialHairType?: string
  facialHairColor?: string
  eyeType?: string
  eyebrowType?: string
  mouthType?: string
  clotheType?: string
  clotheColor?: string
  accessoriesType?: string
  graphicType?: string
}

/**
 * @deprecated Use StoredAvatar from components/ReadyPlayerMe instead
 */
export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skinColor: 'Light',
  hairColor: 'Brown',
  topType: 'ShortHairShortFlat',
  facialHairType: 'Blank',
  facialHairColor: 'Brown',
  eyeType: 'Default',
  eyebrowType: 'Default',
  mouthType: 'Default',
  clotheType: 'BlazerShirt',
  clotheColor: 'Blue',
  accessoriesType: 'Blank',
  graphicType: 'Blank',
}
