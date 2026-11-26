-- Backfill users.status from users.legacy_status, then drop the old column.
-- status wins when already set; legacy_status only fills NULL/blank status.
UPDATE users
   SET status = TRIM(legacy_status)
 WHERE (status IS NULL OR TRIM(status) = '')
   AND legacy_status IS NOT NULL
   AND TRIM(legacy_status) <> '';

-- No source of truth left: every user still gets an explicit status.
UPDATE users SET status = 'unknown' WHERE status IS NULL OR TRIM(status) = '';

ALTER TABLE users DROP COLUMN legacy_status;
