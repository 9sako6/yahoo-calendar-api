import { assertEquals } from "../../../test_deps.ts";
import { dateFromJPString } from "./date_from_jp_string.ts";

Deno.test("last date in month", () => {
  assertEquals(dateFromJPString("3/21 (月)"), 21);
  assertEquals(dateFromJPString("3/1 (火)"), 1);
  assertEquals(dateFromJPString("aaa"), -1);
});
