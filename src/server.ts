import { createExpressApplication } from "./app";
import { handleUpgrade } from "./websocket";
import { router } from "./router";
import { API_VERSION } from "./version";
import http from "http";

export const API_ENDPOINT = `/api/${API_VERSION}`;

const app = createExpressApplication();

// Routing
app.use(API_ENDPOINT, router);

const server = http.createServer(app);

// Connection with WebSocket
server.on("upgrade", handleUpgrade);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });
}

export { app };
