import express from "express";
import { router as ordersRouter } from "./orders";
import { router as payoutsRouter } from "./payouts";
import { router as usersRouter } from "./users";
import { router as rewardsRouter } from "./rewards";

export const router = express.Router();

router.use("/orders", ordersRouter);
router.use("/payouts", payoutsRouter);
router.use("/users", usersRouter);
router.use("/rewards", rewardsRouter);
