import { Page } from "@playwright/test";

type DownloadFileParams = {
  page: Page;
  downloaderSelector: string;
  downloadPath: string;
};

export const downloadFile = async (
  { page, downloaderSelector, downloadPath }: DownloadFileParams,
) => {
  const [download] = await Promise.all([
    // Start waiting for the download
    page.waitForEvent("download"),
    // Perform the action that initiates download
    page.locator(downloaderSelector).click(),
  ]);

  await download.saveAs(downloadPath);
};
