import express from "express";
import { router as ordersRouter } from "./orders";
import { router as payoutsRouter } from "./payouts";

export const router = express.Router();

router.use("/orders", ordersRouter);
router.use("/payouts", payoutsRouter);
