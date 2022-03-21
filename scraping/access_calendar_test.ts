import { accessCalendar } from "./access_calendar.ts";
import { openBrowserAndPage } from "./open_browser_and_page.ts";
import { closeBrowserAndPage } from "./close_browser_and_page.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("access Yahoo! calendar", async () => {
  const { browser, page } = await openBrowserAndPage();

  const response = await accessCalendar(page);
  assertEquals(response.status(), 200);

  await closeBrowserAndPage(browser, page);
});
