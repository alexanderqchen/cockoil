import express from "express";
import { checkAuthorization, checkAdminAuthorization } from "../helpers/auth";
import { router as ordersRouter } from "./orders";
import { router as payoutsRouter } from "./payouts";
import { router as usersRouter } from "./users";
import { router as rewardsRouter } from "./rewards";

export const router = express.Router();

router.use(
  "/orders",
  checkAuthorization,
  checkAdminAuthorization,
  ordersRouter
);
router.use("/payouts", checkAuthorization, payoutsRouter);
router.use("/users", usersRouter);
router.use("/rewards", checkAuthorization, rewardsRouter);
