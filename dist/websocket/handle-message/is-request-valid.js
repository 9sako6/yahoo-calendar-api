"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestValid = void 0;
const utils_1 = require("../../utils");
/**
 * Expect the following two patterns.
 *
 * {"action": "userid", "message": "9sako6@9sako6.com"}
 * {"action": "code", "message": "123456"}
 */
const isRequestValid = (req) => {
  if (
    (0, utils_1.hasProperty)(req, "action") &&
    (0, utils_1.hasProperty)(req, "message") &&
    (req.action === "userid" || req.action === "code") &&
    typeof req.message === "string"
  ) {
    return true;
  } else {
    return false;
  }
};
exports.isRequestValid = isRequestValid;
