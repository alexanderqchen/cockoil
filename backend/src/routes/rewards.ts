import express from "express";
import Joi from "joi";
import { PayoutStatus } from "@prisma/client";
import prisma from "../helpers/prisma";

export const router = express.Router();

router.get("/", async (req, res) => {
  const querySchema = Joi.object({
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
    givenToId: Joi.number().integer().min(1),
  });

  const { error: queryError, value: query } = querySchema.validate(req.query);

  if (queryError) {
    return res.status(400).json({ error: { queryError } });
  }

  const { limit, offset, givenToId } = query;
  const where = {
    givenToId,
  };
  const prismaOptions = {
    skip: offset,
    take: limit,
    orderBy: [
      {
        createdAt: "desc",
      },
    ] as any,
    where,
    include: {
      createdFrom: true,
    },
  };

  const [count, rewards] = await prisma.$transaction([
    prisma.reward.count({ where }),
    prisma.reward.findMany(prismaOptions),
  ]);

  return res.status(200).json({
    count,
    data: rewards,
  });
});
