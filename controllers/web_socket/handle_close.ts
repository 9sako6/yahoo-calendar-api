import type { Browser, Page } from "puppeteer";
import { closeBrowserAndPage } from "/scraping";

export const handleClose = async (
  ws: WebSocket,
  browser: Browser,
  page: Page,
) => {
  await closeBrowserAndPage(browser, page);
  ws.close();
};
