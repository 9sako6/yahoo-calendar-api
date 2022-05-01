import { describe, expect, test } from "vitest";
import request from "supertest";
import { createExpressApplication } from "./app";

describe("Gzip compression", () => {
  test("Gzip compression is enabled", (done) => {
    const app = createExpressApplication();

    app.get("/gzip", (_, res) => {
      res.send("a".repeat(1000));
    });

    request(app).get("/gzip").then((response) => {
      expect(response.header["content-encoding"]).toBe("gzip");
      done();
    });
  });

  test("Gzip compression is disabled", (done) => {
    const app = createExpressApplication();

    app.get("/gzip", (_, res) => {
      res.send("a".repeat(999));
    });

    request(app).get("/gzip").then((response) => {
      expect(response.header["content-encoding"]).toBe(undefined);
      done();
    });
  });
});
