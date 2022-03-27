import { Context } from "../deps.ts";
import {
  accessCalendar,
  closeBrowserAndPage,
  openBrowserAndPage,
  submitConfirmationCode,
  submitUserId,
} from "../scraping/mod.ts";
import { Browser, Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const sessionsController = {
  new: async (ctx: Context) => {
    const handleOpen = () => {
      socket.send("Info: Connection is established.");
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
      try {
        JSON.parse(event.data);
      } catch (e) {
        socket.send(`Error: ${e.message}`);
        return;
      }

      const { action, message } = JSON.parse(event.data);

      if (!message) {
        socket.send("Error: An empty message is invalid.");
        return;
      }

      if (action === "userid") {
        await accessCalendar(page);
        const success = await submitUserId(page, message);

        if (success) {
          socket.send("Info: A confirmation code was sended.");
        } else {
          socket.send("Error: Fail to send a confirmation code.");
        }
      } else if (action === "code") {
        const cookies = await submitConfirmationCode(page, message);

        await Deno.writeTextFile("./cookies.json", JSON.stringify(cookies));
        await closeBrowserAndPage(browser, page);
        socket.send(JSON.stringify(cookies));
      } else {
        socket.send("Error: Invalid action.");
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
