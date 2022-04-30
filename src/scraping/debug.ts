import { Page } from "@playwright/test";

export const Debug = {
  saveScreenshot: async (page: Page, fileName: string) => {
    if (process.env.SCREENSHOT) {
      const path = `./screenshots/${fileName}`;
      await page.screenshot({ path });
    }
  },
};
