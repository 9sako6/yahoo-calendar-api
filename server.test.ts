import { Application } from "oak";
import { router } from "./router.ts";
import { VERSION } from "./api_version.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("Run the API server", async () => {
  const app = new Application();
  const abortController = new AbortController();
  const { signal } = abortController;
  const port = 8081;

  app.use(router.routes());

  app.listen({ port, signal });

  // GET /
  const response = await fetch(`http://localhost:${port}/api/${VERSION}/`);
  await response.json();

  assertEquals(response.status, 200);

  abortController.abort();
});
