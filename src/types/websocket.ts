import type { Cookie } from "@playwright/test";

export type WebSocketRequestMessage = {
  action: "userid" | "code";
  message: string;
};

export type WebSocketResponseMessage = {
  type: "message" | "error";
  message: string;
} | {
  type: "cookies";
  message: Cookie[];
};
