import type { Browser } from "@playwright/test";
import { WebSocket } from "ws";
import { WebSocketResponseMessage } from "../types";

export const handleError = async (
  ws: WebSocket,
  browser: Browser,
  error: Error,
) => {
  await browser.close();

  const errorMessage: WebSocketResponseMessage = {
    type: "error",
    message: error.message,
  };
  ws.send(JSON.stringify(errorMessage));
  ws.close();
};
