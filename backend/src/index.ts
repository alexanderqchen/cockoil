import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

const app = express();
app.use(bodyParser.json());

app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
