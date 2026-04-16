-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "keyBenefits" TEXT[] DEFAULT ARRAY[]::TEXT[];
