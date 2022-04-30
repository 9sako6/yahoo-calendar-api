"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const websocket_1 = require("./websocket");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.app);
// Connection with WebSocket
server.on("upgrade", websocket_1.handleUpgrade);
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
