import { validationErrors } from "./validation_errors.ts";
import { assert, assertEquals } from "asserts";

Deno.test("valid object", () => {
  assert(validationErrors({ action: "userid", message: "9sako6@9sako6.com" }));
  assert(validationErrors({ action: "code", message: "123456" }));
});

Deno.test("error object", () => {
  assertEquals(validationErrors(null), [
    "Request is null.",
  ]);
  assertEquals(validationErrors({}), [
    "action property is missing.",
    "message property is missing.",
  ]);
  assertEquals(validationErrors({ message: "hello" }), [
    "action property is missing.",
  ]);
  assertEquals(validationErrors({ action: "userid" }), [
    "message property is missing.",
  ]);
  assertEquals(validationErrors({ action: "a", message: "hello" }), [
    "action property has invalid value.",
  ]);
});
