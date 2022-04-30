import { describe, expect, test } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("/", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/api/v0")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text)).toStrictEqual({
          message:
            "Welcome to Yahoo! Calendar API. https://github.com/9sako6/yahoo-calendar-api",
        });
        done();
      });
  });
});
