import dotenv from "dotenv";
dotenv.config();

import { Command, Option } from "@commander-js/extra-typings";
import { PrismaClient } from "@prisma/client";
import { keyBy } from "lodash";
import { fetchShopify } from "../helpers/fetch";
import { getUserFromReferralCode } from "../helpers/referrals";
import { calculateReward } from "../helpers/rewards";
import productList from "../constants/products.json";

type OrderData = {
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

const products = keyBy(productList, "id");

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
    fulfillment_status: "unfulfilled",
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

const createRewardsForOrder = async (
  order: OrderData,
  prisma: PrismaClient
) => {
  let maximumDiscount = 0;

  order.shopifyItems.forEach((productId) => {
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

  const rewards = [];

  while (referredById) {
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
  }

  return rewards;
};

const run = async () => {
  const params = createShopifyParams();

  console.log("Fetching order data from Shopify...");
  console.log(`/admin/api/2023-10/orders.json?${params}`);
  const shopifyOrders = (
    await fetchShopify(`/admin/api/2023-10/orders.json?${params}`)
  ).orders;

  console.log(`Fetched ${shopifyOrders.length} orders from Shopify`);

  if (options.verbose) {
    console.log(JSON.stringify(shopifyOrders, null, 2));
  }

  /**
   * Create Orders objects
   */
  const ordersToCreate = [];

  for (const shopifyOrder of shopifyOrders) {
    if (await doesOrderExist(shopifyOrder)) {
      continue;
    }

    const orderData = {
      shopifyOrderId: shopifyOrder.id.toString(),
      referredById: (await getReferredByForOrder(shopifyOrder))?.id,
      shopifyItems: shopifyOrder.line_items.map(
        ({ product_id }: { product_id: number }) => product_id.toString()
      ),
      shippingName: shopifyOrder.shipping_address?.name,
      shippingAddress1: shopifyOrder.shipping_address?.address1,
      shippingAddress2: shopifyOrder.shipping_address?.address2,
      shippingCity: shopifyOrder.shipping_address?.city,
      shippingState: shopifyOrder.shipping_address?.province_code,
      shippingZip: shopifyOrder.shipping_address?.zip,
      shippingPhone: shopifyOrder.shipping_address?.phone,
    };

    const rewards = await createRewardsForOrder(orderData, prisma);

    ordersToCreate.push({
      ...orderData,
      rewards: {
        create: rewards,
      },
    });
  }

  let numOrdersCreated = 0;

  console.log(`Creating ${ordersToCreate.length} new orders...`);
  if (options.verbose) {
    console.log(JSON.stringify(ordersToCreate, null, 2));
  }

  if (!options.dryrun) {
    for (const orderToCreate of ordersToCreate) {
      await prisma.order.create({
        data: orderToCreate,
      });
      numOrdersCreated++;
    }
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
