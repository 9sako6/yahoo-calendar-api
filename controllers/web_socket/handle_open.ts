import { sendMessage } from "./send_message.ts";

export const handleOpen = (ws: WebSocket) => {
  const message = "Info: Connection is established.";

  sendMessage(ws, {
    type: "message",
    message,
  });
};
