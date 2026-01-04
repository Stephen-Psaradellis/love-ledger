-- ============================================================================
-- Configure Spark Notifications
-- ============================================================================
-- Sets up the edge function URL for spark notifications
--
-- NOTE: This migration is superseded by 20251231100000_configure_edge_functions.sql
-- which configures all edge function URLs together.
-- The URL pattern is: https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-spark-notification

-- Skip if already configured by the newer migration
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM app_configuration WHERE key = 'spark_notification_url') THEN
    INSERT INTO app_configuration (key, value)
    VALUES ('spark_notification_url', 'PLACEHOLDER_URL_CONFIGURE_AFTER_DEPLOY');
  END IF;
END $$;
