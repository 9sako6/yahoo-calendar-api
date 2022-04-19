import { Context } from "oak";
import {
  accessCalendar,
  closeBrowserAndPage,
  openBrowserAndPage,
  submitConfirmationCode,
  submitUserId,
} from "../scraping/mod.ts";
import { Browser, Page } from "puppeteer";

export const sessionsController = {
  new: async (ctx: Context) => {
    const handleOpen = () => {
      socket.send(
        JSON.stringify({
          type: "message",
          message: "Info: Connection is established.",
        }),
      );
    };

    const handleError = async (event: Event | ErrorEvent) => {
      if (event instanceof ErrorEvent) {
        console.log(event.message);
      }
      await closeBrowserAndPage(browser, page);
      socket.close();
    };

    const handleMessage = async (
      event: MessageEvent<string>,
      page: Page,
    ) => {
      // NOTE: `event.data` is expected the following two patterns.
      // {"action": "userid", "message": "<your_user_id>"}
      // {"action": "code", "message": "<confirmation_code>"}

      // Response structure.
      // {"type": "error" | "message" | "cookies", "message": string}
      try {
        JSON.parse(event.data);
      } catch (e) {
        socket.send(
          JSON.stringify({ type: "error", message: `Error: ${e.message}` }),
        );
        return;
      }

      const { action, message } = JSON.parse(event.data);

      if (!message) {
        socket.send(
          JSON.stringify({
            type: "error",
            message: "Error: An empty message is invalid.",
          }),
        );
        return;
      }

      if (action === "userid") {
        await accessCalendar(page);
        const success = await submitUserId(page, message);

        if (success) {
          socket.send(
            JSON.stringify({
              type: "message",
              message: "Info: A confirmation code was sended.",
            }),
          );
        } else {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Error: Fail to send a confirmation code.",
            }),
          );
        }
      } else if (action === "code") {
        const cookies = await submitConfirmationCode(page, message);

        await Deno.writeTextFile("./cookies.json", JSON.stringify(cookies));
        await closeBrowserAndPage(browser, page);
        socket.send(JSON.stringify({ type: "cookies", message: cookies }));
      } else {
        socket.send(
          JSON.stringify({ type: "error", message: "Error: Invalid action." }),
        );
      }
    };

    const handleClose = async (browser: Browser, page: Page) => {
      await closeBrowserAndPage(browser, page);
      socket.close();
    };
    const { browser, page } = await openBrowserAndPage();

    const socket = ctx.upgrade();

    socket.onopen = handleOpen;
    socket.onerror = (event) => handleError(event);
    socket.onmessage = (event: MessageEvent<string>) =>
      handleMessage(event, page);
    socket.onclose = () => handleClose(browser, page);
  },
};
