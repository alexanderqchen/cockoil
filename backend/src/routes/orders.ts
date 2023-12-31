import express from "express";
import Joi from "joi";
import { OrderStatus } from "@prisma/client";
import prisma from "../helpers/prisma";

export const router = express.Router();

router.get("/", async (req, res) => {
  const querySchema = Joi.object({
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
    status: Joi.string()
      .uppercase()
      .valid(...Object.keys(OrderStatus)),
  });

  const { error: queryError, value: query } = querySchema.validate(req.query);

  if (queryError) {
    return res.status(400).json({ error: { queryError } });
  }

  const { limit, offset, status } = query;
  const where = {
    status,
  };
  const prismaOptions = {
    skip: offset,
    take: limit,
    orderBy: [
      {
        id: "desc",
      },
    ] as any,
    where,
  };

  const [count, orders] = await prisma.$transaction([
    prisma.order.count({ where }),
    prisma.order.findMany(prismaOptions),
  ]);

  return res.status(200).json({
    count,
    data: orders,
  });
});

router.patch("/:orderId", async (req, res) => {
  const paramsSchema = Joi.object({
    orderId: Joi.number().integer().min(1),
  });
  const bodySchema = Joi.object({
    status: Joi.string()
      .uppercase()
      .valid(...Object.keys(OrderStatus)),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (paramsError || bodyError) {
    return res.status(400).json({ error: { paramsError, bodyError } });
  }

  const { orderId } = params;
  const { status } = body;

  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  return res.status(200).json(order);
});
