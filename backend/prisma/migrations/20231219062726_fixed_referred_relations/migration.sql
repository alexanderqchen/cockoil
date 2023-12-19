/*
  Warnings:

  - You are about to drop the column `referredBy` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_referredById_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "referredById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referredBy",
ADD COLUMN     "referredById" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
