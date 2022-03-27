import { Router } from "./deps.ts";
import { VERSION } from "./api_version.ts";
import { welcomeController } from "./controllers/welcome_controller.ts";
import { sessionsController } from "./controllers/sessions_controller.ts";
import { calendarsController } from "./controllers/calendars_controller.ts";

export const router = new Router({
  prefix: `/api/${VERSION}`,
});

router.get("/", welcomeController.index);
router.get("/sessions/new", sessionsController.new);
router.post("/calendars", calendarsController.list);
