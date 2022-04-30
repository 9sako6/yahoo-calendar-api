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
exports.submitUserId = void 0;
const debug_1 = require("../debug");
const submitUserId = (page, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-userid:before-userid-input.png",
    );
    // Input a user ID or telephone number or email address.
    yield page.type('input[placeholder="ID/携帯電話番号/メールアドレス"]', userId);
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-userid:after-userid-input.png",
    );
    // Click the "次へ" button and wait for rendering.
    yield page.locator('xpath=//button[contains(., "次へ")]').click();
    // Wait a confirmation code form to check whether userId is submitted.
    yield page.locator('input[placeholder="確認コード"]').waitFor({
      state: "visible",
    });
    yield debug_1.Debug.saveScreenshot(
      page,
      "submit-userid:after-userid-submit.png",
    );
    return true;
  });
exports.submitUserId = submitUserId;
