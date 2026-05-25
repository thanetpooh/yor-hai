import { Router } from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";
import { getQrCode } from "../controllers/qrController.js";
import { shortenLimiter, qrLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/api/shorten",        shortenLimiter, shortenUrl);
router.get("/api/qr/:shortCode",   qrLimiter,      getQrCode);
router.get("/:shortCode",                          redirectUrl);

export default router;
