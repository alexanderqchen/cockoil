import express from "express";
import Joi from "joi";
import { OrderStatus } from "@prisma/client";
import prisma from "../helpers/prisma";
import type { Item } from "@prisma/client";

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
    include: {
      internalItems: true,
    },
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

router.get("/:orderId", async (req, res) => {
  const paramsSchema = Joi.object({
    orderId: Joi.number().integer().min(1),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );

  if (paramsError) {
    return res.status(400).json({ error: { paramsError } });
  }

  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      internalItems: true,
    },
  });

  return res.status(200).json(order);
});

router.patch("/:orderId", async (req, res) => {
  const paramsSchema = Joi.object({
    orderId: Joi.number().integer().min(1),
  });
  const bodySchema = Joi.object({
    status: Joi.string()
      .uppercase()
      .valid(...Object.keys(OrderStatus)),
    internalItemIds: Joi.array().items(
      Joi.string().guid({
        version: "uuidv4",
      })
    ),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (paramsError || bodyError) {
    return res.status(400).json({ error: { paramsError, bodyError } });
  }

  const { orderId } = params;
  const { status, internalItemIds } = body;

  let order;

  if (internalItemIds) {
    // Check if any itemIds already exist
    const duplicateItem = await prisma.item.findFirst({
      where: {
        id: {
          in: internalItemIds,
        },
        createdFromId: {
          not: orderId,
        },
      },
    });

    if (duplicateItem) {
      return res
        .status(400)
        .json({ error: { duplicateItemError: duplicateItem.id } });
    }

    // Bulk create items
    const itemsToCreate = [] as Item[];

    internalItemIds.forEach((itemId: string) =>
      itemsToCreate.push({
        id: itemId,
        createdFromId: orderId,
        registeredById: null,
      })
    );

    const [deleteResponse, createResponse, updateResponse] =
      await prisma.$transaction([
        prisma.item.deleteMany({
          where: {
            createdFromId: orderId,
          },
        }),
        prisma.item.createMany({
          data: itemsToCreate,
        }),
        prisma.order.update({
          where: {
            id: orderId,
          },
          data: {
            ...(status && { status }),
          },
        }),
      ]);
    order = updateResponse;
  } else {
    order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...(status && { status }),
      },
    });
  }

  return res.status(200).json(order);
});
