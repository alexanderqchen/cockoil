import express from "express";
import Joi from "joi";
import prisma from "../helpers/prisma";
import { isAdminUser } from "../helpers/auth";

export const router = express.Router();

router.patch("/:itemId", async (req, res) => {
  const paramsSchema = Joi.object({
    itemId: Joi.string().guid({
      version: "uuidv4",
    }),
  });
  const bodySchema = Joi.object({
    registeredById: Joi.string(),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );
  const { error: bodyError, value: body } = bodySchema.validate(req.body);

  if (paramsError || bodyError) {
    return res.status(400).json({ error: { paramsError, bodyError } });
  }

  const { itemId } = params;
  const { registeredById } = body;

  if (res.locals.userId !== registeredById && !isAdminUser(res.locals.userId)) {
    return res.status(401).json("Unauthorized");
  }

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      createdFrom: true,
    },
  });

  if (!item) {
    return res.status(400).json("Product does not exist");
  }
  if (item?.registeredById) {
    return res.status(400).json("Product already registered");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: registeredById,
    },
  });

  if (!user) {
    return res.status(400).json("User does not exist");
  }

  if (!user.referredById) {
    // For the first registered product, set the user's referredById
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        referredById: item.createdFrom.referredById,
      },
    });
  }

  const updatedItem = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      registeredById,
    },
  });

  return res.status(200).json(updatedItem);
});
