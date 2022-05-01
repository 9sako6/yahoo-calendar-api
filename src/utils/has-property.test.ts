import { hasProperty } from "./has-property";
import { describe, expect, test } from "vitest";

describe("Test hasProperty", () => {
  test("check whether object has property", () => {
    expect(hasProperty({ foo: "aaa" }, "foo")).toBe(true);
    expect(hasProperty({ foo: "aaa" }, "bar")).toBe(false);
    expect(hasProperty({}, "foo")).toBe(false);
  });
});
