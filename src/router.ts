import { Router } from "express";
import { exportEvents, root } from "./controllers";

export const router = Router();

router.get("/", root);
router.post("/events/export", exportEvents);
