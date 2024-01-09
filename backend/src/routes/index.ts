import express, { RequestHandler } from "express";
import { auth } from "../helpers/auth";
import { router as ordersRouter } from "./orders";
import { router as payoutsRouter } from "./payouts";
import { router as usersRouter } from "./users";
import { router as rewardsRouter } from "./rewards";

export const router = express.Router();

const checkAuthorization: RequestHandler = async (req, res, next) => {
  const idToken = req.headers.authorization || "";

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid } = decodedToken;
  } catch (error) {
    console.log(error);
  }

  next();
};

router.use("/orders", ordersRouter);
router.use("/payouts", payoutsRouter);
router.use("/users", checkAuthorization, usersRouter);
router.use("/rewards", rewardsRouter);
