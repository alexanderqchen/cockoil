import express from "express";
import Joi from "joi";
import { PrismaClient, OrderStatus } from "@prisma/client";
import type { OrderStatus as OrderStatusType } from "@prisma/client";
import { getPaginationOptions } from "../helpers/pagination";

export const router = express.Router();
const prisma = new PrismaClient();

const querySchema = Joi.object({
  limit: Joi.number().integer().min(1),
  offset: Joi.number().integer().min(0),
  status: Joi.string()
    .uppercase()
    .valid(...Object.keys(OrderStatus)),
});

router.get("/", async (req, res) => {
  const { error, value } = querySchema.validate(req.query);

  if (error) {
    return res.status(400).json({ error });
  }

  const { limit, offset, status } = value;

  const prismaOptions = {
    skip: offset,
    take: limit,
    where: {
      status,
    },
  };

  const orders = await prisma.order.findMany(prismaOptions);

  return res.json(orders);
});
