import { Page } from "@playwright/test";
import { Debug } from "../debug";
import { downloadFile } from "../download-file";

export const exportIcs = async (
  page: Page,
  year: string,
  downloadPath: string,
) => {
  await page.goto("https://calendar.yahoo.co.jp/event/export");

  await Debug.saveScreenshot(
    page,
    "ics:after-page-access.png",
  );

  // Input year.
  await page.type('input[placeholder="年を入力"]', year);

  await Debug.saveScreenshot(
    page,
    "ics:after-year-input.png",
  );

  await downloadFile({
    page,
    downloaderSelector: 'xpath=//button[contains(., "ダウンロード")]',
    downloadPath,
  });
};
