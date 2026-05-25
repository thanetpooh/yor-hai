import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";
import { shortenLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/api/shorten", shortenLimiter, shortenUrl);
router.get("/:shortCode", redirectUrl);

export default router;
