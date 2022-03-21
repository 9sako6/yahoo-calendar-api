import { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const submitUserId = async (
  page: Page,
  userId: string,
) => {
  // Input a user ID or telephone number or email address.
  console.log("Input a user ID or telephone number or email address.");
  await page.type('input[placeholder="ID/携帯電話番号/メールアドレス"]', userId);

  await page.screenshot({ path: "./screenshots/after-input-userid.png" });

  // Click the "次へ" button and wait for rendering.
  const [submitUserIdButton] = await page.$x('//button[contains(., "次へ")]');
  await Promise.all([
    page.waitForNavigation(),
    submitUserIdButton.click(),
  ]);

  await page.screenshot({
    path: "./screenshots/after-click-userid-submit-button.png",
  });
  const cookies = await page.cookies();
  return cookies;
};
