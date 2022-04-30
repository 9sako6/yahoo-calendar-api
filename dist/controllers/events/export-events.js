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
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportEvents = void 0;
const fs_1 = __importDefault(require("fs"));
const test_1 = require("@playwright/test");
const export_ics_1 = require("../../scraping/export/export-ics");
const exportEvents = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.body.cookies;
    const year = String(req.body.year);
    const browser = yield test_1.chromium.launch();
    // The option `acceptDownloads` is necessary to download a file.
    const context = yield browser.newContext({ acceptDownloads: true });
    yield context.addCookies(cookies);
    const page = yield context.newPage();
    const downloadPath = `tmp/yahoo-calendar-${Date.now()}.ics`;
    yield (0, export_ics_1.exportIcs)(page, year, downloadPath);
    yield browser.close();
    const icsText = fs_1.default.readFileSync(downloadPath);
    if (!fs_1.default.existsSync(downloadPath)) {
      throw new Error("Fail to download an ics file from Yahoo! Calendar.");
    }
    fs_1.default.unlinkSync(downloadPath);
    // Send the file as text so that it is not downloaded on the client side.
    res.set({
      "Content-Type": "text/plain",
      "Content-Disposition": "inline",
    });
    res.send(icsText);
  });
exports.exportEvents = exportEvents;
