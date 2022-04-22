import { Protocol } from "puppeteer";

export type WebSocketRequestMessage = {
  action: "userid" | "code";
  message: string;
};

export type WebSocketResponseMessage = {
  type: "message" | "error";
  message: string;
} | {
  type: "cookies";
  message: Protocol.Network.Cookie[];
};
