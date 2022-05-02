import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export const handleAccessLog = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  logger.info(`Path: ${req.url}, Time: ${new Date()}`);
  next();
};
