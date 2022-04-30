import { app } from "./app";
import { handleUpgrade } from "./websocket";
import http from "http";

const server = http.createServer(app);

// Connection with WebSocket
server.on("upgrade", handleUpgrade);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
