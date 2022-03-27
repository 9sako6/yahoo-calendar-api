import { closeServer, setupServer } from "./test_helper.ts";
import { Router } from "../deps.ts";
import { calendarsController } from "./calendars_controller.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test({
  name: "calendars#list",
  fn: async () => {
    const port = 8081;
    const abortController = new AbortController();
    const router = new Router();
    router.post("/", calendarsController.list);

    setupServer(port, abortController, router);

    const response = await fetch(`http://localhost:${port}/`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    assertEquals(
      JSON.parse(await response.text()),
      { "message": "cookies, year, month properties are required." },
    );

    closeServer(abortController);
  },
});
