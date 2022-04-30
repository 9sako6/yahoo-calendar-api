import express from "express";
import { router } from "./router";
import { API_VERSION } from "./version";

export const API_ENDPOINT = `/api/${API_VERSION}`;

export const app = express();

// See http://expressjs.com/ja/4x/api.html#req.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(API_ENDPOINT, router);
