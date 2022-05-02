import http from "http";
import { WebSocketServer } from "ws";
import { Duplex } from "stream";
import { chromium } from "@playwright/test";
import { handleOpen } from "./handle-open";
import { API_ENDPOINT } from "../server";

const WEB_SOCKET_PATH = `${API_ENDPOINT}/login`;

export const handleUpgrade = async (
  request: http.IncomingMessage,
  socket: Duplex,
  head: Buffer,
) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const webSocket = new WebSocketServer({ noServer: true });

  webSocket.on("connection", (ws) => handleOpen(ws, browser, context, page));

  if (request.url === WEB_SOCKET_PATH) {
    webSocket.handleUpgrade(request, socket, head, (ws) => {
      webSocket.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
};
