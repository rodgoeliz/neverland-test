/* eslint-disable no-console */
require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mainRouter } from "./routes";
import { seed } from "./utils/populate";

try {
  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(
    cors({
      origin: process.env.REACT_APP_ENDPOINT,
      credentials: true,
    })
  );

  app.use(mainRouter);

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );

  mongoose.set("useFindAndModify", false);
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONDO_DB_CLUSTER_NAME}/${process.env.MONGO_DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then(() => seed(1000))
    .catch((error) => {
      console.log(error);
      throw error;
    });
} catch (err) {
  console.error(err);
}
