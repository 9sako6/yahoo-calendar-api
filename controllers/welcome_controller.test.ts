import { Router } from "oak";
import { assertEquals } from "../test_deps.ts";
import { welcomeController } from "./welcome_controller.ts";
import { closeServer, setupServer } from "./test_helper.ts";

Deno.test("index action", async () => {
  const port = 8081;
  const abortController = new AbortController();
  const router = new Router();
  router.get("/", welcomeController.index);

  setupServer(port, abortController, router);

  const response = await fetch(`http://localhost:${port}/`);
  const jsonResponse = await response.json();

  assertEquals(response.status, 200);
  assertEquals(jsonResponse, { message: "Welcome to Yahoo! Calendar API" });

  closeServer(abortController);
});
