import type { Browser } from "@playwright/test";
import { WebSocket } from "ws";

export const handleClose = async (
  ws: WebSocket,
  browser: Browser,
) => {
  await browser.close();
  ws.close();
};
