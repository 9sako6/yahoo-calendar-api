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
exports.handleMessage = void 0;
const is_request_valid_1 = require("./is-request-valid");
const validation_errors_1 = require("./validation-errors");
const handle_userid_1 = require("./handle-userid");
const handle_confirmation_code_1 = require("./handle-confirmation-code");
const handleMessage = (ws, browser, context, page, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let request;
    try {
      request = JSON.parse(data.toString());
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = {
          type: "error",
          message: error.message,
        };
        ws.send(JSON.stringify(errorMessage));
      }
      return;
    }
    // Validate request.
    if (!(0, is_request_valid_1.isRequestValid)(request)) {
      const errorMessage = {
        type: "error",
        message: (0, validation_errors_1.validationErrors)(request).join(" "),
      };
      ws.send(JSON.stringify(errorMessage));
      return;
    }
    const { action, message } = request;
    if (action === "userid") {
      yield (0, handle_userid_1.handleUserId)(ws, page, message);
    } else if (action === "code") {
      yield (0, handle_confirmation_code_1.handleConfirmationCode)(
        ws,
        browser,
        context,
        page,
        message,
      );
    }
  });
exports.handleMessage = handleMessage;
