import express from "express";
import Joi from "joi";
import prisma from "../helpers/prisma";
import {
  doesShopifyOrderExist,
  getReferredByForOrder,
} from "../helpers/shopify";
import { createRewardsForOrder } from "../helpers/rewards";
import { generatePayoutsForUsers } from "../helpers/payouts";

export const router = express.Router();

router.post("/order-paid", async (req, res) => {
  console.log("Received webhook call to /order-paid");

  const bodySchema = Joi.object({
    id: Joi.number().required(),
    line_items: Joi.array().items(Joi.any()).default([]),
    discount_codes: Joi.array().items(Joi.any()).default([]),
    shipping_address: Joi.any(),
  });

  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (bodyError) {
    console.log("Webhook receiver failed with validation error:", {
      bodyError,
    });
    return res.status(400).json({ error: { bodyError } });
  }

  const { id, line_items, discount_codes, shipping_address } = body;

  if (await doesShopifyOrderExist(id, prisma)) {
    console.log(`Order object for Shopify order id ${id} already exists`);
    return res.status(400).json({
      error: {
        alreadyExistsError: `Order object for Shopify order id ${id} already exists`,
      },
    });
  }

  const orderData = {
    shopifyOrderId: id.toString(),
    referredById: (await getReferredByForOrder(discount_codes, prisma))?.id,
    shopifyItems: line_items.map(({ product_id }: { product_id: number }) =>
      product_id.toString()
    ),
    shippingName: shipping_address?.name,
    shippingAddress1: shipping_address?.address1,
    shippingAddress2: shipping_address?.address2,
    shippingCity: shipping_address?.city,
    shippingState: shipping_address?.province_code,
    shippingZip: shipping_address?.zip,
    shippingPhone: shipping_address?.phone,
  };

  const rewards = await createRewardsForOrder(orderData, prisma);

  const orderToCreate = {
    ...orderData,
    rewards: {
      create: rewards,
    },
  };

  console.log("Creating order:", orderToCreate);

  const order = await prisma.order.create({
    data: orderToCreate,
  });

  return res.status(200).json(order);
});

router.post("/create-payouts", async (req, res) => {
  console.log("Querying all users in db...");
  const users = await prisma.user.findMany();

  console.log(`Calculating payouts for ${users.length} users...`);
  const payoutsToCreate = await generatePayoutsForUsers(users, prisma);

  console.log("Payouts to create:");
  console.log(payoutsToCreate);

  let numPayoutsCreated = 0;

  console.log(`Creating ${payoutsToCreate.length} payouts...`);
  const createManyResponse = await prisma.payout.createMany({
    data: payoutsToCreate,
  });
  numPayoutsCreated = createManyResponse.count;

  console.log(
    `Created ${numPayoutsCreated} / ${payoutsToCreate.length} Payouts.`
  );

  return res.status(200).json(createManyResponse);
});
