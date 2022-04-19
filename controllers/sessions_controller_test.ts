import { Router } from "oak";
import { assertEquals } from "../test_deps.ts";
import { sessionsController } from "./sessions_controller.ts";
import { closeServer, setupServer } from "./test_helper.ts";

// NOTE: To avoid the error `WebSocket protocol error: Connection reset without closing handshake`,
// tests in one function.
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

    // Test to connect WebSocket connection.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    assertEquals(
      messages.pop(),
      JSON.stringify({
        type: "message",
        message: "Info: Connection is established.",
      }),
    );

    // Test invalid action.
    socket.send(JSON.stringify({
      action: "foo",
      message: "bar",
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assertEquals(
      messages.pop(),
      JSON.stringify({ type: "error", message: "Error: Invalid action." }),
    );

    // Test userid action with invalid message.
    socket.send(JSON.stringify({
      action: "userid",
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    assertEquals(
      messages.pop(),
      JSON.stringify({
        type: "error",
        message: "Error: An empty message is invalid.",
      }),
    );

    // FIXME: The following is failed in CI.
    // // Test userid action with valid message.
    // socket.send(JSON.stringify({
    //   action: "userid",
    //   message: "calendar_api_test",
    // }));

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // assertEquals(messages.pop(), "Info: A confirmation code was sended.");

    socket.close();
    closeServer(abortController);
  },
  sanitizeOps: false, // FIXME: resolve resoruce leak
  sanitizeResources: false, // FIXME: resolve resoruce leak
});
