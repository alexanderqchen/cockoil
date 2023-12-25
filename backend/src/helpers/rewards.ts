import type { Order, PrismaClient } from "@prisma/client";

export const calculateReward = (maxDiscount: number, distance: number) => {
  const x = maxDiscount / 3;

  return Math.floor(x / Math.pow(2, distance));
};
