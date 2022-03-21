import { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";

export const submitConfirmationCode = async (
  page: Page,
  code: string,
) => {
  // Input a verification code.
  console.log("Input a verification code.");
  await page.type('input[placeholder="確認コード"]', code);

  await page.screenshot({
    path: "./screenshots/after-inpupt-code.png",
  });

  // Click the "ログイン" button and wait for rendering.
  const [loginButton] = await page.$x('//button[contains(., "ログイン")]');
  await Promise.all([
    page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
    loginButton.click(),
  ]);

  // 広告が表示された場合に閉じる。
  const [backLink] = await page.$x('//a[contains(., "ご利用中のサービスに戻る")]');
  if (backLink) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: ["load", "networkidle2"] }),
      backLink.click(),
    ]);
  }

  await page.screenshot({
    path: "./screenshots/after-login.png",
  });

  return await page.cookies();
};
