"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrors = void 0;
const utils_1 = require("../../utils");
const validationErrors = (req) => {
  const errorMessages = [];
  if (req === null) {
    return ["Request is null."];
  }
  if (!(0, utils_1.hasProperty)(req, "action")) {
    errorMessages.push("action property is missing.");
  } else if (!(req.action === "userid" || req.action === "code")) {
    errorMessages.push("action property has invalid value.");
  }
  if (!(0, utils_1.hasProperty)(req, "message")) {
    errorMessages.push("message property is missing.");
  }
  return errorMessages;
};
exports.validationErrors = validationErrors;
