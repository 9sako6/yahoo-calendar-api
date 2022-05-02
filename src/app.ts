import express from "express";
import compression from "compression";
import { handleAccessLog } from "./logger";

export const createExpressApplication = () => {
  const app = express();

  // Use gzip compression.
  // See https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
  app.use(compression({
    // threshold: It is the byte threshold for the response
    // body size before considering compression, the default is 1 kB
    threshold: 1000,
  }));

  app.use(handleAccessLog);

  // See http://expressjs.com/ja/4x/api.html#req.body
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  return app;
};
