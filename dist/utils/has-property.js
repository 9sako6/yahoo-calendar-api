"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProperty = void 0;
function hasProperty(obj, key) {
  return obj instanceof Object && key in obj;
}
exports.hasProperty = hasProperty;
