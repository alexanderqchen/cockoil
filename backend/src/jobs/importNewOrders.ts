import dotenv from "dotenv";
dotenv.config();

import { Command, Option } from "@commander-js/extra-typings";
import { PrismaClient } from "@prisma/client";
import { fetchShopify } from "../helpers/fetch";
import { createRewardsForOrder } from "../helpers/rewards";
import {
  doesShopifyOrderExist,
  getReferredByForOrder,
} from "../helpers/shopify";

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
    // fulfillment_status: "unfulfilled",
  };

  if (createdAtMin) {
    params.created_at_min = createdAtMin.toISOString();
  }

  return new URLSearchParams(params);
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
    if (await doesShopifyOrderExist(shopifyOrder.id, prisma)) {
      continue;
    }

    const orderData = {
      shopifyOrderId: shopifyOrder.id.toString(),
      referredById: (
        await getReferredByForOrder(shopifyOrder.discount_codes, prisma)
      )?.id,
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

    console.log("Creating order", orderData);
    const rewards = await createRewardsForOrder(orderData, prisma);
    console.log("Created rewards");

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
