import express from "express";
import Joi from "joi";
import prisma from "../helpers/prisma";
import { isAdminUser } from "../helpers/auth";

export const router = express.Router();

router.get("/", async (req, res) => {
  const querySchema = Joi.object({
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
    givenToId: Joi.string(),
  });

  const { error: queryError, value: query } = querySchema.validate(req.query);

  if (queryError) {
    return res.status(400).json({ error: { queryError } });
  }

  const { limit, offset, givenToId } = query;

  if (res.locals.userId !== givenToId && !isAdminUser(res.locals.userId)) {
    return res.status(401).json("Unauthorized");
  }

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
