import express from "express";
import Joi from "joi";
import { PayoutMethod } from "@prisma/client";
import prisma from "../helpers/prisma";

export const router = express.Router();

router.get("/:userId", async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.number().integer().min(1),
  });
  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  if (paramsError) {
    return res.status(400).json({ error: { paramsError } });
  }

  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return res.status(200).json(user);
});

router.patch("/:userId", async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.number().integer().min(1),
  });
  const bodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    payoutMethod: Joi.string()
      .uppercase()
      .valid(...Object.keys(PayoutMethod)),
    payoutUsername: Joi.string(),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (paramsError || bodyError) {
    return res.status(400).json({ error: { paramsError, bodyError } });
  }

  const { userId } = params;
  const { name, email, payoutMethod, payoutUsername } = body;

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      payoutMethod,
      payoutUsername,
    },
  });

  return res.status(200).json(user);
});
