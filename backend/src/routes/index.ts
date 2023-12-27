import express from "express";
import { router as ordersRouter } from "./orders";

export const router = express.Router();

router.use("/orders", ordersRouter);
