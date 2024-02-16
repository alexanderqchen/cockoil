import { keyBy } from "lodash";
import type { PrismaClient } from "@prisma/client";
import productList from "../constants/products.json";

const products = keyBy(productList, "id");

export type OrderData = {
  shopifyOrderId: string;
  referredById: string | undefined;
  shopifyItems: string[];
  shippingName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
};

export const calculateReward = (maxDiscount: number, distance: number) => {
  const x = maxDiscount / 3;

  return Math.floor(x / Math.pow(2, distance));
};

export const createRewardsForOrder = async (
  order: OrderData,
  prisma: PrismaClient
) => {
  let maximumDiscount = 0;

  order?.shopifyItems?.forEach((productId) => {
    if (!(productId in products)) {
      console.log(`Unrecognized product id ${productId}`);
    } else {
      maximumDiscount += products[productId].maximumDiscount;
    }
  });

  if (maximumDiscount === 0) {
    console.log(
      `No rewards to create for Shopify order ${order.shopifyOrderId}`
    );
    return [];
  }

  let referredById = order.referredById || null;
  // let referredById = 2 as number | null; // For testing purposes
  let distance = 0;
  let seenUsers = new Set();

  const rewards = [];

  while (referredById && !seenUsers.has(referredById)) {
    const user = await prisma.user.findUnique({
      where: {
        id: referredById,
      },
    });

    if (!user) {
      break;
    }

    rewards.push({
      amount: calculateReward(maximumDiscount, distance),
      givenToId: referredById,
    });

    referredById = user.referredById;
    distance++;
    seenUsers.add(user.id);
  }

  return rewards;
};
