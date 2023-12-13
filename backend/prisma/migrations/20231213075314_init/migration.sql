-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateEnum
CREATE TYPE "PayoutMethod" AS ENUM ('PAYPAL', 'VENMO', 'CASHAPP');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "referredBy" TEXT,
    "payoutMethod" "PayoutMethod",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "shopifyOrderId" TEXT NOT NULL,
    "referredById" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdFromId" INTEGER NOT NULL,
    "givenToId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "givenToId" INTEGER NOT NULL,
    "status" "PayoutStatus" NOT NULL DEFAULT 'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaypalInfo" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VenmoInfo" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CashappInfo" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_shopifyOrderId_key" ON "Order"("shopifyOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "PaypalInfo_userId_key" ON "PaypalInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VenmoInfo_userId_key" ON "VenmoInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CashappInfo_userId_key" ON "CashappInfo"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_createdFromId_fkey" FOREIGN KEY ("createdFromId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_givenToId_fkey" FOREIGN KEY ("givenToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_givenToId_fkey" FOREIGN KEY ("givenToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaypalInfo" ADD CONSTRAINT "PaypalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenmoInfo" ADD CONSTRAINT "VenmoInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashappInfo" ADD CONSTRAINT "CashappInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
