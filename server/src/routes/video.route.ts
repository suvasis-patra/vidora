import { Router } from "express";

const router = Router();

// protected routes

router.route("/upload");
router.route("/videos");

export default router;
