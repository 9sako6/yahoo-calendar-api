import type { Browser, Page } from "puppeteer";
import { sendMessage } from "./send_message.ts";
import {
  accessCalendar,
  closeBrowserAndPage,
  submitConfirmationCode,
  submitUserId,
} from "/scraping";
import { isRequestValid } from "./handle_message/is_request_valid.ts";
import { validationErrors } from "./handle_message/validation_errors.ts";

const handleUserId = async (ws: WebSocket, page: Page, userId: string) => {
  await accessCalendar(page);
  const success = await submitUserId(page, userId);

  if (success) {
    sendMessage(ws, {
      type: "message",
      message: "A confirmation code was sended.",
    });
  } else {
    sendMessage(ws, {
      type: "error",
      message: "Fail to send a confirmation code.",
    });
  }
};

export const handleMessage = async (
  socket: WebSocket,
  browser: Browser,
  page: Page,
  event: MessageEvent<string>,
) => {
  let request: unknown;

  try {
    request = JSON.parse(event.data);
  } catch (e) {
    sendMessage(socket, { type: "error", message: e.message });
    return;
  }

  // Validate request.
  if (!isRequestValid(request)) {
    const errorMessages = validationErrors(request);
    sendMessage(socket, { type: "error", message: errorMessages.join(" ") });
    return;
  }

  const { action, message } = request;

  if (action === "userid") {
    await handleUserId(socket, page, message);
  } else if (action === "code") {
    const cookies = await submitConfirmationCode(page, message);

    await Deno.writeTextFile("./cookies.json", JSON.stringify(cookies));
    await closeBrowserAndPage(browser, page);
    sendMessage(socket, { type: "cookies", message: cookies });
  }
};
