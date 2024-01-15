import express from "express";
import Joi from "joi";
import prisma from "../helpers/prisma";
import { checkAuthorization, isAdminUser } from "../helpers/auth";

export const router = express.Router();

router.get("/:itemId", checkAuthorization, async (req, res) => {
  const paramsSchema = Joi.object({
    itemId: Joi.string().guid({
      version: "uuidv4",
    }),
  });

  const { error: paramsError, value: params } = paramsSchema.validate(
    req.params
  );

  if (paramsError) {
    return res.status(400).json({ error: { paramsError } });
  }

  const { itemId } = params;

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });

  return res.status(200).json({
    userId: item?.registeredById,
  });
});
