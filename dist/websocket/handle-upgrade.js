"use strict";
var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpgrade = void 0;
const ws_1 = require("ws");
const test_1 = require("@playwright/test");
const handle_open_1 = require("./handle-open");
const app_1 = require("../app");
const utils_1 = require("../utils");
const WEB_SOCKET_PATH = `${app_1.API_ENDPOINT}/login`;
const handleUpgrade = (request, socket, head) =>
  __awaiter(void 0, void 0, void 0, function* () {
    (0, utils_1.requestLog)(request);
    const browser = yield test_1.chromium.launch();
    const context = yield browser.newContext();
    const page = yield context.newPage();
    const webSocket = new ws_1.WebSocketServer({ noServer: true });
    webSocket.on(
      "connection",
      (ws) => (0, handle_open_1.handleOpen)(ws, browser, context, page),
    );
    if (request.url === WEB_SOCKET_PATH) {
      webSocket.handleUpgrade(request, socket, head, (ws) => {
        webSocket.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });
exports.handleUpgrade = handleUpgrade;
