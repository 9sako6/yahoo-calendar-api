import { submitConfirmationCode } from "../../scraping";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { WebSocket } from "ws";
import { WebSocketResponseMessage } from "../../types";

export const handleConfirmationCode = async (
  ws: WebSocket,
  browser: Browser,
  context: BrowserContext,
  page: Page,
  code: string,
) => {
  const cookies = await submitConfirmationCode(context, page, code);
  browser.close();

  const successMessage: WebSocketResponseMessage = {
    type: "cookies",
    message: cookies,
  };

  ws.send(JSON.stringify(successMessage));
};
