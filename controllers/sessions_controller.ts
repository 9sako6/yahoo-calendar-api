import { Context, Status } from "../deps.ts";
import {
  closeBrowserAndPage,
  sendConfirmationCode,
  submitConfirmationCode,
} from "../scraping/mod.ts";
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const sessionsController = {
  new: async (ctx: Context) => {
    const userId = ctx.request.url.searchParams.get("userid");

    if (!userId) {
      ctx.response.body = { message: "userid property is missing." };
      ctx.response.status = Status.BadRequest;
      return;
    }

    const handleOpen = () => {
      console.log("Connection is established.");
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
    ) => {
      const code = event.data;
      const cookies = await submitConfirmationCode(page, code);

      await Deno.writeTextFile("./cookies.json", JSON.stringify(cookies));
      await closeBrowserAndPage(browser, page);
      socket.send(JSON.stringify(cookies));
    };

    const handleClose = async () => {
      console.log("Connection is closed.");
      await closeBrowserAndPage(browser, page);
    };

    const socket = ctx.upgrade();
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();

    socket.onopen = handleOpen;
    socket.onerror = (event) => handleError(event);
    socket.onmessage = (event: MessageEvent<string>) => handleMessage(event);
    socket.onclose = handleClose;

    await sendConfirmationCode(page, userId);
  },
};
