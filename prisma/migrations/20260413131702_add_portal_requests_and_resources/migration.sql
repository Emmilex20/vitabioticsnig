-- CreateEnum
CREATE TYPE "PortalRequestType" AS ENUM ('PHARMACY_TRAINING', 'SAMPLE_DAY', 'DOCTOR_CME_CPD', 'DOCTOR_SAMPLE_REQUEST');

-- CreateEnum
CREATE TYPE "PortalResourceAudience" AS ENUM ('DOCTOR', 'PHARMACIST', 'BOTH');

-- CreateTable
CREATE TABLE "PortalRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PortalRequestType" NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "phone" TEXT,
    "location" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "audience" "PortalResourceAudience" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortalRequest_userId_idx" ON "PortalRequest"("userId");

-- CreateIndex
CREATE INDEX "PortalRequest_type_idx" ON "PortalRequest"("type");

-- AddForeignKey
ALTER TABLE "PortalRequest" ADD CONSTRAINT "PortalRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
