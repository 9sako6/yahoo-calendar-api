import { WebSocketRequestMessage } from "~/types";
import { hasProperty } from "~/utils";

/**
 * Expect the following two patterns.
 *
 * {"action": "userid", "message": "9sako6@9sako6.com"}
 * {"action": "code", "message": "123456"}
 */
export const isRequestValid = (
  req: unknown,
): req is WebSocketRequestMessage => {
  if (
    hasProperty(req, "action") &&
    hasProperty(req, "message") &&
    (req.action === "userid" || req.action === "code") &&
    typeof req.message === "string"
  ) {
    return true;
  } else {
    return false;
  }
};
