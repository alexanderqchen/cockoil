/*
  Warnings:

  - You are about to drop the `CashappInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaypalInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenmoInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CashappInfo" DROP CONSTRAINT "CashappInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaypalInfo" DROP CONSTRAINT "PaypalInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "VenmoInfo" DROP CONSTRAINT "VenmoInfo_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "payoutUsername" TEXT;

-- DropTable
DROP TABLE "CashappInfo";

-- DropTable
DROP TABLE "PaypalInfo";

-- DropTable
DROP TABLE "VenmoInfo";
