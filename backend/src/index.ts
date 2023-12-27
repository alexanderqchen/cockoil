import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";

const app = express();
app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
