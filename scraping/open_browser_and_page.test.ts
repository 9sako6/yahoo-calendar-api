import { openBrowserAndPage } from "./open_browser_and_page.ts";
import { closeBrowserAndPage } from "./close_browser_and_page.ts";
import { assert } from "../test_deps.ts";

Deno.test("open browser and page", async () => {
  const { browser, page } = await openBrowserAndPage();

  assert(browser.isConnected());
  assert(!page.isClosed());

  await closeBrowserAndPage(browser, page);
});
