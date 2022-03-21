import { Browser, Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const closeBrowserAndPage = async (
  browser: Browser,
  page: Page,
) => {
  if (!page.isClosed()) await page.close();
  if (browser.isConnected()) await browser.close();
};
