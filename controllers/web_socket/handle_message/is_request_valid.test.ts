import { isRequestValid } from "./is_request_valid.ts";
import { assert, assertEquals } from "asserts";

Deno.test("valid object", () => {
  assert(isRequestValid({ action: "userid", message: "9sako6@9sako6.com" }));
  assert(isRequestValid({ action: "code", message: "123456" }));
});

Deno.test("error object", () => {
  assertEquals(isRequestValid(null), false);
  assertEquals(isRequestValid({}), false);
  assertEquals(isRequestValid({ message: "hello" }), false);
  assertEquals(isRequestValid({ action: "userid" }), false);
  assertEquals(isRequestValid({ action: "a", message: "hello" }), false);
});
