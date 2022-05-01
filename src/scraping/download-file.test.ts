import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { Browser, chromium } from "@playwright/test";
import { downloadFile } from "./download-file";
import fs from "fs";

let browser: Browser;

describe("downloadFile", () => {
  beforeEach(async () => {
    browser = await chromium.launch();
  });

  afterEach(() => {
    if (browser) browser.close();

    if (fs.existsSync("tmp/downloadFile.test.json")) {
      fs.unlinkSync("tmp/downloadFile.test.json");
    }
  });

  test("A file is downloaded", async () => {
    // Download Yahoo! Calendar API OpenAPI schema.
    const url = "https://9sako6.github.io/yahoo-calendar-api/";

    const page = await browser.newPage();

    await page.goto(url);

    await downloadFile({
      page,
      downloadPath: "tmp/downloadFile.test.json",
      downloaderSelector: 'xpath=//a[contains(., "Download")]',
    });

    expect(fs.existsSync("tmp/downloadFile.test.json")).toBe(true);
  });
});
