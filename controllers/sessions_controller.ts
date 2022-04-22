import { Context } from "oak";
import { openBrowserAndPage } from "/scraping";
import {
  handleClose,
  handleError,
  handleMessage,
  handleOpen,
} from "./web_socket/mod.ts";

export const sessionsController = {
  new: async (ctx: Context) => {
    const { browser, page } = await openBrowserAndPage();

    const socket = ctx.upgrade();

    socket.onopen = () => handleOpen(socket);
    socket.onerror = (event) => handleError(socket, browser, page, event);
    socket.onmessage = (event: MessageEvent<string>) =>
      handleMessage(socket, browser, page, event);
    socket.onclose = () => handleClose(socket, browser, page);
  },
};
