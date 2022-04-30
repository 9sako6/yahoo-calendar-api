import { Request, Response } from "express";

export const root = (_: Request, res: Response) => {
  res.json({
    message:
      "Welcome to Yahoo! Calendar API. https://github.com/9sako6/yahoo-calendar-api",
  });
};
