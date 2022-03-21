import { assert } from "../test_deps.ts";
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { closeBrowserAndPage } from "./close_browser_and_page.ts";

Deno.test("close browser and page", async () => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();

  assert(browser.isConnected());
  assert(!page.isClosed());

  await closeBrowserAndPage(browser, page);

  assert(!browser.isConnected());
  assert(page.isClosed());

  // Call twice and the condition remained the same.
  await closeBrowserAndPage(browser, page);

  assert(!browser.isConnected());
  assert(page.isClosed());
});
