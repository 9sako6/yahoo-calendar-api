import { Page } from "@playwright/test";
import { Debug } from "../debug";

export const submitUserId = async (page: Page, userId: string) => {
  await Debug.saveScreenshot(page, "submit-userid:before-userid-input.png");

  // Input a user ID or telephone number or email address.
  await page.type('input[placeholder="ID/携帯電話番号/メールアドレス"]', userId);

  await Debug.saveScreenshot(page, "submit-userid:after-userid-input.png");

  // Click the "次へ" button and wait for rendering.
  await page.locator(
    'xpath=//button[contains(., "次へ")]',
  ).click();

  // Wait a confirmation code form to check whether userId is submitted.
  await page.locator('input[placeholder="確認コード"]').waitFor({
    state: "visible",
  });

  await Debug.saveScreenshot(page, "submit-userid:after-userid-submit.png");

  return true;
};
