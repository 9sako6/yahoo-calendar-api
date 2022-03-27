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

    try {
      const messages: string[] = [];
      socket.onerror = (event) => {
        if (event instanceof ErrorEvent) {
          console.error(event.message);
        }
      };
      socket.onmessage = (event: MessageEvent<string>) => {
        messages.push(event.data);
      };

      await new Promise((resolve) => setTimeout(resolve, 100));

      assertEquals(messages[0], "Info: Connection is established.");
    } finally {
      socket.close();
      closeServer(abortController);
    }
  },
  sanitizeOps: false, // FIXME: resolve resoruce leak
  sanitizeResources: false, // FIXME: resolve resoruce leak
});
