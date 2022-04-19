import { Context } from "oak";

export const welcomeController = {
  index: (ctx: Context) => {
    ctx.response.body = { message: "Welcome to Yahoo! Calendar API" };
  },
};
