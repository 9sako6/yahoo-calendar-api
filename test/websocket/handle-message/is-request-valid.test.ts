import { isRequestValid } from "../../../src/websocket/handle-message/is-request-valid";
import { describe, expect, test } from "vitest";

describe("", () => {
  test("valid object", () => {
    expect(isRequestValid({ action: "userid", message: "9sako6@9sako6.com" }))
      .toBe(true);
    expect(isRequestValid({ action: "code", message: "123456" })).toBe(true);
  });

  test("error object", () => {
    expect(isRequestValid(null)).toBe(false);
    expect(isRequestValid({})).toBe(false);
    expect(isRequestValid({ message: "hello" })).toBe(false);
    expect(isRequestValid({ action: "userid" })).toBe(false);
    expect(isRequestValid({ action: "a", message: "hello" })).toBe(false);
  });
});
