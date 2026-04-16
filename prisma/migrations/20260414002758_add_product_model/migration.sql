-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('WOMEN', 'MEN', 'KIDS', 'PREGNANCY');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "oldPrice" DOUBLE PRECISION,
    "shortDescription" TEXT NOT NULL,
    "badge" TEXT,
    "sku" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
