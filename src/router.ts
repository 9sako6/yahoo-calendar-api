import { Router } from "express";
import { exportEvents, root } from "./controllers";
import { requestLog } from "./utils";

export const router = Router();

router.use((req, _res, next) => {
  requestLog(req);
  next();
});

router.get("/", root);
router.post("/events/export", exportEvents);
