import { Application, Router } from "../deps.ts";
import { assertEquals } from "../test_deps.ts";
import { welcomeController } from "./welcome_controller.ts";

Deno.test("index action", async () => {
  const app = new Application();
  const router = new Router();
  const abortController = new AbortController();
  const { signal } = abortController;
  const port = 8081;

  router.get("/", welcomeController.index);
  app.use(router.routes());

  app.listen({ port, signal });

  const response = await fetch(`http://localhost:${port}/`);
  const jsonResponse = await response.json();

  assertEquals(response.status, 200);
  assertEquals(jsonResponse, { message: "Welcome to Yahoo! Calendar API" });

  abortController.abort();
});
