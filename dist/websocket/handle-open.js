"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOpen = void 0;
const handle_message_1 = require("./handle-message");
const handle_close_1 = require("./handle-close");
const handle_error_1 = require("./handle-error");
const handleOpen = (ws, browser, context, page) => {
  ws.on(
    "message",
    (data) =>
      (0, handle_message_1.handleMessage)(ws, browser, context, page, data),
  );
  ws.on("close", () => (0, handle_close_1.handleClose)(ws, browser));
  ws.on(
    "error",
    (error) => (0, handle_error_1.handleError)(ws, browser, error),
  );
  const openMessage = {
    type: "message",
    message: "Info: Connection is established.",
  };
  ws.send(JSON.stringify(openMessage));
};
exports.handleOpen = handleOpen;
