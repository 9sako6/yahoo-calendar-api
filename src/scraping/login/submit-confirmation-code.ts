import { BrowserContext, Page } from "@playwright/test";
import { Debug } from "../debug";

export const submitConfirmationCode = async (
  context: BrowserContext,
  page: Page,
  code: string,
) => {
  await Debug.saveScreenshot(
    page,
    "submit-confirmation-code:before-code-input.png",
  );

  // Input a verification code.
  await page.type('input[placeholder="確認コード"]', code);

  await Debug.saveScreenshot(
    page,
    "submit-confirmation-code:after-code-input.png",
  );

  // Click the "ログイン" button and wait for rendering.
  await page.locator(
    'xpath=//button[contains(., "ログイン")]',
  ).click();

  // const ads = await page.$$('xpath=//a[contains(., "ご利用中のサービスに戻る")]');
  // if (ads) {
  //   await page.locator(
  //     'xpath=//a[contains(., "ご利用中のサービスに戻る")]',
  //   ).click();
  // }
  // await page.waitForNavigation({ waitUntil: "networkidle" });
  await Debug.saveScreenshot(
    page,
    "submit-confirmation-code:after-code-submit-click.png",
  );
  await page.waitForURL(new RegExp("/.*calendar\.yahoo\.co\.jp.*"));

  await Debug.saveScreenshot(
    page,
    "submit-confirmation-code:after-code-submit.png",
  );

  return await context.cookies();
};
