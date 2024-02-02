import express from "express";
import Joi from "joi";
import { PayoutMethod } from "@prisma/client";
import prisma from "../helpers/prisma";
import { checkAuthorization, isAdminUser } from "../helpers/auth";
import { createDiscountCode } from "../helpers/shopify";

export const router = express.Router();

router.post("", async (req, res) => {
  const bodySchema = Joi.object({
    id: Joi.string(),
    email: Joi.string().email(),
  });

  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (bodyError) {
    return res.status(400).json({ error: { bodyError } });
  }

  const { id, email } = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (existingUser) {
    return res.status(200).json("User already created");
  }

  const user = await prisma.user.create({
    data: {
      id,
      email,
    },
  });

  try {
    // Create Shopify discount code for user
    await createDiscountCode(id);
  } catch (error) {
    console.log(
      `Failed to create discount code for user ${id} with error: `,
      error
    );
  }

  return res.status(200).json(user);
});

router.get("/:userId", checkAuthorization, async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.string(),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );

  if (paramsError) {
    return res.status(400).json({ error: { paramsError } });
  }

  const { userId } = params;

  if (res.locals.userId !== userId && !isAdminUser(res.locals.userId)) {
    return res.status(401).json("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      internalItems: true,
    },
  });

  return res.status(200).json(user);
});

router.patch("/:userId", checkAuthorization, async (req, res) => {
  const paramsSchema = Joi.object({
    userId: Joi.string(),
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

  if (res.locals.userId !== userId && !isAdminUser(res.locals.userId)) {
    return res.status(401).json("Unauthorized");
  }

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
