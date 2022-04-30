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
exports.exportIcs = void 0;
const debug_1 = require("../debug");
const download_file_1 = require("../download-file");
const exportIcs = (page, year, downloadPath) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto("https://calendar.yahoo.co.jp/event/export");
    yield debug_1.Debug.saveScreenshot(page, "ics:after-page-access.png");
    // Input year.
    yield page.type('input[placeholder="年を入力"]', year);
    yield debug_1.Debug.saveScreenshot(page, "ics:after-year-input.png");
    yield (0, download_file_1.downloadFile)({
      page,
      downloaderSelector: 'xpath=//button[contains(., "ダウンロード")]',
      downloadPath,
    });
  });
exports.exportIcs = exportIcs;
