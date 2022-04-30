import { hasProperty } from "../../utils";

export const validationErrors = (req: unknown) => {
  const errorMessages: string[] = [];
  if (req === null) {
    return ["Request is null."];
  }

  if (!hasProperty(req, "action")) {
    errorMessages.push("action property is missing.");
  } else if (!(req.action === "userid" || req.action === "code")) {
    errorMessages.push("action property has invalid value.");
  }

  if (!hasProperty(req, "message")) {
    errorMessages.push("message property is missing.");
  }

  return errorMessages;
};
