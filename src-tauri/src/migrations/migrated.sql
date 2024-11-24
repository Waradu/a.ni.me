ALTER TABLE animes
ADD COLUMN migrated BOOL DEFAULT true;

UPDATE animes
SET migrated = false;