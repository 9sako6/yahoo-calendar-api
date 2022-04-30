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
exports.handleUserId = void 0;
const scraping_1 = require("../../scraping");
const scraping_2 = require("../../scraping");
const handleUserId = (ws, page, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto(scraping_2.YAHOO_LOGIN_URL);
    const success = yield (0, scraping_1.submitUserId)(page, userId);
    if (success) {
      const successMessage = {
        type: "message",
        message: "A confirmation code was sended.",
      };
      ws.send(JSON.stringify(successMessage));
    } else {
      const errorMessage = {
        type: "error",
        message: "Fail to send a confirmation code.",
      };
      ws.send(JSON.stringify(errorMessage));
    }
  });
exports.handleUserId = handleUserId;
