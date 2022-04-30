import { Request } from "express";
import http from "http";

export const requestLog = (req: Request | http.IncomingMessage) => {
  console.log(`Path: ${req.url}, Time: ${new Date()}`);
};
