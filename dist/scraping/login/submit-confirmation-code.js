"use strict";
var __awaiter = (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitConfirmationCode = void 0;
const debug_1 = require("../debug");
const submitConfirmationCode = (context, page, code) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-confirmation-code:before-code-input.png",
    );
    // Input a verification code.
    yield page.type('input[placeholder="確認コード"]', code);
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-confirmation-code:after-code-input.png",
    );
    // Click the "ログイン" button and wait for rendering.
    yield page.locator('xpath=//button[contains(., "ログイン")]').click();
    // const ads = await page.$$('xpath=//a[contains(., "ご利用中のサービスに戻る")]');
    // if (ads) {
    //   await page.locator(
    //     'xpath=//a[contains(., "ご利用中のサービスに戻る")]',
    //   ).click();
    // }
    // await page.waitForNavigation({ waitUntil: "networkidle" });
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-confirmation-code:after-code-submit-click.png",
    );
    yield page.waitForURL(new RegExp("/.*calendar\.yahoo\.co\.jp.*"));
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-confirmation-code:after-code-submit.png",
    );
    return yield context.cookies();
  });
exports.submitConfirmationCode = submitConfirmationCode;
