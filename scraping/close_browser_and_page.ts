import * as puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const closeBrowserAndPage = async (
  browser: puppeteer.Browser,
  page: puppeteer.Page,
) => {
  if (!page.isClosed()) await page.close();
  if (browser.isConnected()) await browser.close();
};
