import { WebSocketResponseMessage } from "/types";

export const sendMessage = (
  ws: WebSocket,
  message: WebSocketResponseMessage,
) => {
  ws.send(JSON.stringify(message));
};
