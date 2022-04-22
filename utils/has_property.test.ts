import { hasProperty } from "./has_property.ts";
import { assertEquals } from "asserts";

Deno.test("check whether object has property", () => {
  assertEquals(hasProperty({ foo: "aaa" }, "foo"), true);
  assertEquals(hasProperty({ foo: "aaa" }, "bar"), false);
  assertEquals(hasProperty({}, "foo"), false);
});
