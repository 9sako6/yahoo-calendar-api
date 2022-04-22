import { assertEquals } from "../../../test_deps.ts";
import { lastDate } from "./last_date.ts";

Deno.test("last date in month", () => {
  assertEquals(lastDate(2022, 2), 28);
  assertEquals(lastDate(2022, 3), 31);
  assertEquals(lastDate(2022, 4), 30);
});
