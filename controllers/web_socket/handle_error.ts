import type { Browser, Page } from "puppeteer";
import { sendMessage } from "./send_message.ts";
import { closeBrowserAndPage } from "/scraping";

export const handleError = async (
  ws: WebSocket,
  browser: Browser,
  page: Page,
  event: Event | ErrorEvent,
) => {
  if (event instanceof ErrorEvent) {
    console.error(event.message);

    sendMessage(ws, {
      type: "error",
      message: event.message,
    });
  }

  await closeBrowserAndPage(browser, page);
  ws.close();
};
