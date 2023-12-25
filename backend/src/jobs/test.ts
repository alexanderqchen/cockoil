import dotenv from "dotenv";
dotenv.config();

import { Command, Option } from "@commander-js/extra-typings";
import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { keyBy } from "lodash";
import { fetchShopify } from "../helpers/fetch";
import { getUserFromReferralCode } from "../helpers/referrals";
import { calculateReward } from "../helpers/rewards";
import productList from "../constants/products.json";

const prisma = new PrismaClient();

const run = async () => {
  await prisma.order.create({
    data: {
      shopifyOrderId: "test",
      referredById: undefined,
      items: ["7788387336433"],
      rewards: {
        create: [],
      },
    },
  });

  await prisma.order.createMany({
    data: {
      shopifyOrderId: "test",
      referredById: undefined,
      items: ["7788387336433"],
      rewards: {
        create: [],
      },
    },
  });
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
