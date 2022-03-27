import { Router } from "../deps.ts";
import { assertEquals } from "../test_deps.ts";
import { sessionsController } from "./sessions_controller.ts";
import { closeServer, setupServer } from "./test_helper.ts";

Deno.test({
  name: "new $connect",
  fn: async () => {
    const port = 8081;
    const abortController = new AbortController();
    const router = new Router();
    router.get("/", sessionsController.new);

    setupServer(port, abortController, router);

    const socket = new WebSocket(`ws://localhost:${port}/`);
    const messages: string[] = [];

    socket.onerror = (event) => {
      if (event instanceof ErrorEvent) {
        console.error(event.message);
      }
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      messages.push(event.data);
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    assertEquals(messages[0], "Info: Connection is established.");

    socket.close();
    closeServer(abortController);
  },
  sanitizeOps: false, // FIXME: resolve resoruce leak
  sanitizeResources: false, // FIXME: resolve resoruce leak
});

Deno.test({
  name: "new $message with userid action",
  fn: async () => {
    const port = 8082;
    const abortController = new AbortController();
    const router = new Router();
    router.get("/", sessionsController.new);

    setupServer(port, abortController, router);

    const socket = new WebSocket(`ws://localhost:${port}/`);
    const messages: string[] = [];

    socket.onerror = (event) => {
      if (event instanceof ErrorEvent) {
        console.error(event.message);
      }
    };
    socket.onmessage = (event: MessageEvent<string>) => {
      messages.push(event.data);
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    assertEquals(messages[0], "Info: Connection is established.");

    socket.send(JSON.stringify({
      action: "userid",
    }));

    await new Promise((resolve) => setTimeout(resolve, 100));

    assertEquals(messages[1], "Error: An empty message is invalid.");

    socket.send(JSON.stringify({
      action: "userid",
      message: "calendar_api_test",
    }));

    await new Promise((resolve) => setTimeout(resolve, 5000));

    assertEquals(messages[2], "Info: A confirmation code was sended.");

    socket.close();
    closeServer(abortController);
  },
  sanitizeOps: false, // FIXME: resolve resoruce leak
  sanitizeResources: false, // FIXME: resolve resoruce leak
});
