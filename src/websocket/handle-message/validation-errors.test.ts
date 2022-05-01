import { validationErrors } from "./validation-errors";
import { describe, expect, test } from "vitest";

describe("Validate WebSocket message", () => {
  test("valid object", () => {
    expect(validationErrors({ action: "userid", message: "9sako6@9sako6.com" }))
      .toStrictEqual([]);

    expect(validationErrors({ action: "code", message: "123456" }))
      .toStrictEqual([]);
  });

  test("error object", () => {
    expect(validationErrors(null)).toStrictEqual([
      "Request is null.",
    ]);
    expect(validationErrors({})).toStrictEqual([
      "action property is missing.",
      "message property is missing.",
    ]);
    expect(validationErrors({ message: "hello" })).toStrictEqual([
      "action property is missing.",
    ]);
    expect(validationErrors({ action: "userid" })).toStrictEqual([
      "message property is missing.",
    ]);
    expect(validationErrors({ action: "a", message: "hello" })).toStrictEqual([
      "action property has invalid value.",
    ]);
  });
});
