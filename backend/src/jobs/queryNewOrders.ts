import dotenv from "dotenv";
dotenv.config();

import { Command, Option } from "@commander-js/extra-typings";
import { PrismaClient } from "@prisma/client";
import type { Order } from "@prisma/client";
import { fetchShopify } from "../helpers/fetch";
import { getUserFromReferralCode } from "../helpers/referrals";
import { calculateReward } from "../helpers/rewards";

const prisma = new PrismaClient();

const program = new Command()
  .addOption(
    new Option("--timeframe <string>", "Timeframe over which to process orders")
      .choices(["day", "week", "month", "forever"] as const)
      .default("week")
  )
  .addOption(new Option("--dryrun", "If you don't want to create any objects"))
  .addOption(new Option("--verbose", "Print orders to create"))
  .parse();
const options = program.opts();

const createShopifyParams = () => {
  const now = new Date();
  let createdAtMin;

  if (options.timeframe === "day") {
    createdAtMin = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );
  } else if (options.timeframe === "week") {
    createdAtMin = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
  } else if (options.timeframe === "month") {
    createdAtMin = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
  } else if (options.timeframe === "forever") {
    createdAtMin = null;
  }

  const params: any = {
    financial_status: "paid",
  };

  if (createdAtMin) {
    params.created_at_min = createdAtMin.toISOString();
  }

  return new URLSearchParams(params);
};

const doesOrderExist = async (shopifyOrder: any) => {
  const order = await prisma.order.findUnique({
    where: {
      shopifyOrderId: shopifyOrder.id.toString(),
    },
  });

  return !!order;
};

const getReferredByForOrder = (shopifyOrder: any) => {
  let referredBy = null;

  const discountCode = shopifyOrder.discount_codes.find(
    ({ code }: { code: string }) => code.split("_")[0] === "xrefer"
  );
  if (discountCode) {
    referredBy = getUserFromReferralCode(discountCode.code, prisma);
  }

  return referredBy;
};

// TODO: Finish this and integrate into script
const createRewardsForOrder = async (order: Order, prisma: PrismaClient) => {
  const maximumDiscount = 100; // Should come from constant file or new model

  let referredById = order.referredById;
  let distance = 0;

  while (referredById) {
    const user = await prisma.user.findUnique({
      where: {
        id: referredById,
      },
    });

    if (!user) {
      break;
    }

    const reward = await prisma.reward.create({
      data: {
        createdFromId: order.id,
        givenToId: user.id,
        amount: calculateReward(maximumDiscount, distance),
      },
    });

    console.log("Created reward: ", reward);

    referredById = user.referredById;
    distance++;
  }
};

const run = async () => {
  const params = createShopifyParams();
  const shopifyOrders = (
    await fetchShopify(`/admin/api/2023-10/orders.json?${params}`)
  ).orders;

  const ordersToCreate = [];

  for (const shopifyOrder of shopifyOrders) {
    if (await doesOrderExist(shopifyOrder)) {
      continue;
    }

    ordersToCreate.push({
      shopifyOrderId: shopifyOrder.id.toString(),
      referredBy: await getReferredByForOrder(shopifyOrder),
    });
  }

  let numOrdersCreated = 0;

  if (options.verbose) {
    console.log("Creating these orders:");
    console.log(ordersToCreate);
  }

  if (!options.dryrun) {
    const { count } = await prisma.order.createMany({
      data: ordersToCreate,
    });
    numOrdersCreated = count;
  }

  console.log(
    `Created ${numOrdersCreated} out of ${ordersToCreate.length} orders.`
  );
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
