import { Browser, BrowserContext, Page } from "@playwright/test";
import { WebSocket } from "ws";
import { WebSocketResponseMessage } from "../types";
import { handleMessage } from "./handle-message";
import { handleClose } from "./handle-close";
import { handleError } from "./handle-error";

export const handleOpen = (
  ws: WebSocket,
  browser: Browser,
  context: BrowserContext,
  page: Page,
) => {
  ws.on("message", (data) => handleMessage(ws, browser, context, page, data));
  ws.on("close", () => handleClose(ws, browser));
  ws.on("error", (error) => handleError(ws, browser, error));

  const openMessage: WebSocketResponseMessage = {
    type: "message",
    message: "Info: Connection is established.",
  };

  ws.send(JSON.stringify(openMessage));
};
