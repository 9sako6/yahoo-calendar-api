import { submitUserId } from "../../scraping";
import { Page } from "@playwright/test";
import { WebSocket } from "ws";
import { YAHOO_LOGIN_URL } from "../../scraping";
import { WebSocketResponseMessage } from "../../types";

export const handleUserId = async (
  ws: WebSocket,
  page: Page,
  userId: string,
) => {
  await page.goto(YAHOO_LOGIN_URL);

  const success = await submitUserId(page, userId);

  if (success) {
    const successMessage: WebSocketResponseMessage = {
      type: "message",
      message: "A confirmation code was sended.",
    };

    ws.send(JSON.stringify(successMessage));
  } else {
    const errorMessage: WebSocketResponseMessage = {
      type: "error",
      message: "Fail to send a confirmation code.",
    };

    ws.send(JSON.stringify(errorMessage));
  }
};
