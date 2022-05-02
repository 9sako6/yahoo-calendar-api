import { WebSocketResponseMessage } from "~/types";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { RawData, WebSocket } from "ws";
import { isRequestValid } from "./is-request-valid";
import { validationErrors } from "./validation-errors";
import { handleUserId } from "./handle-userid";
import { handleConfirmationCode } from "./handle-confirmation-code";

export const handleMessage = async (
  ws: WebSocket,
  browser: Browser,
  context: BrowserContext,
  page: Page,
  data: RawData,
) => {
  let request: unknown;

  try {
    request = JSON.parse(data.toString());
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage: WebSocketResponseMessage = {
        type: "error",
        message: error.message,
      };
      ws.send(JSON.stringify(errorMessage));
    }
    return;
  }

  // Validate request.
  if (!isRequestValid(request)) {
    const errorMessage: WebSocketResponseMessage = {
      type: "error",
      message: validationErrors(request).join(" "),
    };
    ws.send(JSON.stringify(errorMessage));
    return;
  }

  const { action, message } = request;

  if (action === "userid") {
    await handleUserId(ws, page, message);
  } else if (action === "code") {
    await handleConfirmationCode(ws, browser, context, page, message);
  }
};
