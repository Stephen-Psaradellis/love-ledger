-- ============================================================================
-- Migration: Custom Avatar System
-- ============================================================================
--
-- This migration adds support for the new custom SVG avatar system,
-- replacing the ReadyPlayerMe integration (clean break - no data migration).
--
-- Changes:
-- 1. Adds 'avatar' JSONB column to profiles for user's own avatar
-- 2. Adds 'avatar_version' INTEGER column for schema versioning
-- 3. Adds 'target_avatar_v2' JSONB column to posts for target description
-- 4. Drops all legacy RPM columns (no data to migrate)
--
-- The new avatar format stores StoredCustomAvatar:
-- {
--   id: string (UUID),
--   version: number,
--   config: {
--     skinTone, hairColor, hairStyle, facialHair, faceShape,
--     eyeShape, eyeColor, eyebrowStyle, noseShape, mouthExpression,
--     bodyShape, heightCategory, topType, topColor, bottomType, bottomColor,
--     glasses, headwear, facialHairColor
--   },
--   createdAt: string (ISO date),
--   updatedAt: string (ISO date)
-- }
-- ============================================================================

-- Add avatar column to profiles (user's own avatar for matching)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar JSONB DEFAULT NULL;
    COMMENT ON COLUMN profiles.avatar IS 'User own avatar config (StoredCustomAvatar) for matching purposes';
  END IF;
END $$;

-- Add avatar_version column to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_version'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_version INTEGER DEFAULT 1;
    COMMENT ON COLUMN profiles.avatar_version IS 'Version number for avatar schema migrations';
  END IF;
END $$;

-- Add target_avatar_v2 column to posts (describing the person seen)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'posts' AND column_name = 'target_avatar_v2'
  ) THEN
    ALTER TABLE posts ADD COLUMN target_avatar_v2 JSONB DEFAULT NULL;
    COMMENT ON COLUMN posts.target_avatar_v2 IS 'Target avatar description (StoredCustomAvatar) for matching';
  END IF;
END $$;

-- Create index for avatar-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_avatar_exists
  ON profiles ((avatar IS NOT NULL));

CREATE INDEX IF NOT EXISTS idx_posts_target_avatar_v2_exists
  ON posts ((target_avatar_v2 IS NOT NULL));

-- ============================================================================
-- Drop legacy RPM columns (no data to migrate - clean break)
-- ============================================================================

-- First, drop views that depend on legacy columns
DROP VIEW IF EXISTS event_attendees CASCADE;
DROP VIEW IF EXISTS fellow_regulars CASCADE;

-- Drop legacy RPM columns from profiles
ALTER TABLE profiles DROP COLUMN IF EXISTS rpm_avatar;
ALTER TABLE profiles DROP COLUMN IF EXISTS rpm_avatar_id;
ALTER TABLE profiles DROP COLUMN IF EXISTS avatar_config;
ALTER TABLE profiles DROP COLUMN IF EXISTS own_avatar;

-- Drop legacy columns from posts
ALTER TABLE posts DROP COLUMN IF EXISTS target_rpm_avatar;
ALTER TABLE posts DROP COLUMN IF EXISTS target_avatar;

-- Log migration completion
DO $$
BEGIN
  RAISE NOTICE 'Custom avatar migration completed - RPM columns dropped, new avatar system ready';
END $$;
