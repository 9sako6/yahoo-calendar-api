import { Context, Status } from "oak";
import {
  accessCalendar,
  accessEventsListInMonth,
  closeBrowserAndPage,
  getEventsInMonth,
  openBrowserAndPage,
} from "../scraping/mod.ts";

export const calendarsController = {
  list: async (ctx: Context) => {
    const { cookies, year, month } = await ctx.request.body({ type: "json" })
      .value;

    if (!cookies || !year || !month) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = {
        message: "cookies, year, month properties are required.",
      };
      return;
    }

    const { browser, page } = await openBrowserAndPage();

    for (const cookie of cookies) {
      await page.setCookie(cookie);
    }

    const response = await accessCalendar(page);

    if (response.status() != 200) {
      ctx.response.status = response.status();
      ctx.response.body = await response.text();
      return;
    }

    await page.screenshot({
      path: "./screenshots/calendars#list.png",
    });

    await accessEventsListInMonth(page, year, month);

    const events = await getEventsInMonth(page, year, month);

    await closeBrowserAndPage(browser, page);

    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.body = events;
  },
};
