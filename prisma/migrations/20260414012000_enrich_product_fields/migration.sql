-- Add benefits column with a temporary default for existing rows
ALTER TABLE "Product" ADD COLUMN "benefits" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Migrate existing keyBenefits data into benefits
UPDATE "Product"
SET "benefits" = "keyBenefits"
WHERE "keyBenefits" IS NOT NULL;

-- Drop old keyBenefits column
ALTER TABLE "Product" DROP COLUMN "keyBenefits";

-- Remove default to match schema intent
ALTER TABLE "Product" ALTER COLUMN "benefits" DROP DEFAULT;
