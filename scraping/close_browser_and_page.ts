import { Browser, Page } from "puppeteer";

export const closeBrowserAndPage = async (
  browser: Browser,
  page: Page,
) => {
  if (!page.isClosed()) await page.close();
  if (browser.isConnected()) await browser.close();
};
