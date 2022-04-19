import { Page } from "puppeteer";

export const accessCalendar = async (
  page: Page,
) => {
  const [_, response] = await Promise.all([
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
    page.goto("https://calendar.yahoo.co.jp/"),
  ]);

  return response;
};
