import { Router } from "express";
import { describe, expect, test } from "vitest";
import { listRoutes } from "../../src/middleware/list-routes";

describe("listRoutes", () => {
  test("List all routes", () => {
    const router = Router();
    router.get("/", () => {});
    router.post("/foo", () => {});
    router.patch("/foo/bar", () => {});

    expect(listRoutes(router).sort()).toStrictEqual([
      "/",
      "/foo",
      "/foo/bar",
    ]);
  });
});
