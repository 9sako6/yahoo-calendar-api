import { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { beginningOfMonth } from "./beginning_of_month.ts";

export const accessEventsListInMonth = async (
  page: Page,
  year: number,
  month: number,
) => {
  const [_, response] = await Promise.all([
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
    page.goto(
      `https://calendar.yahoo.co.jp/month?mode=list&date=${
        beginningOfMonth(year, month)
      }`,
    ),
  ]);

  return response;
};
