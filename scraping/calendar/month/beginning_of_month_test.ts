import { beginningOfMonth } from "./beginning_of_month.ts";
import { assertEquals } from "../../../test_deps.ts";

Deno.test("beginning of month date", () => {
  assertEquals(beginningOfMonth(2022, 12), "20221201");
  assertEquals(beginningOfMonth(2022, 3), "20220301");
});
