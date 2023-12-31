import express from "express";
import Joi from "joi";
import { PayoutStatus } from "@prisma/client";
import prisma from "../helpers/prisma";

export const router = express.Router();

router.get("/", async (req, res) => {
  const querySchema = Joi.object({
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
    status: Joi.string()
      .uppercase()
      .valid(...Object.keys(PayoutStatus)),
    givenToId: Joi.number().integer().min(1),
  });

  const { error: queryError, value: query } = querySchema.validate(req.query);

  if (queryError) {
    return res.status(400).json({ error: { queryError } });
  }

  const { limit, offset, status, givenToId } = query;
  const where = {
    status,
    givenToId,
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
      givenTo: true,
    },
  };

  const [count, payouts] = await prisma.$transaction([
    prisma.payout.count({ where }),
    prisma.payout.findMany(prismaOptions),
  ]);

  return res.status(200).json({
    count,
    data: payouts,
  });
});

router.patch("/:payoutId", async (req, res) => {
  const paramsSchema = Joi.object({
    payoutId: Joi.number().integer().min(1),
  });
  const bodySchema = Joi.object({
    status: Joi.string()
      .uppercase()
      .valid(...Object.keys(PayoutStatus)),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (paramsError || bodyError) {
    return res.status(400).json({ error: { paramsError, bodyError } });
  }

  const { payoutId } = params;
  const { status } = body;

  const payout = await prisma.payout.update({
    where: {
      id: payoutId,
    },
    data: {
      status,
    },
  });

  return res.status(200).json(payout);
});
