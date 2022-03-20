import { Context } from "../deps.ts";

export const welcomeController = {
  index: (ctx: Context) => {
    ctx.response.body = { message: "Welcome to Yahoo! Calendar API" };
  },
};
