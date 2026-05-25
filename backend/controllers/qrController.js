import QRCode from "qrcode";
import { env } from "../config/env.js";
import { getUrl } from "../models/urlModel.js";
import { qrParamsSchema, qrQuerySchema } from "../validators/qrValidator.js";

// GET /api/qr/:shortCode
export async function getQrCode(req, res) {
  try {
    const paramsResult = qrParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      return res.status(400).json({ errors: paramsResult.error.issues });
    }

    const queryResult = qrQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
      return res.status(400).json({ errors: queryResult.error.issues });
    }

    const { shortCode } = paramsResult.data;
    const { format } = queryResult.data;

    const originalUrl = await getUrl(shortCode);
    if (!originalUrl) {
      return res.status(404).json({
        message: "Short URL not found or expired",
      });
    }

    const shortUrl = `${env.BASE_URL}/${shortCode}`;

    if (format === "svg") {
      const svg = await QRCode.toString(shortUrl, { type: "svg" });
      res.setHeader("Content-Type", "image/svg+xml");
      return res.status(200).send(svg);
    }

    const buffer = await QRCode.toBuffer(shortUrl, {
      type: "png",
      errorCorrectionLevel: "H",
      margin: 2,
      width: 300,
    });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "public, max-age=86400"); // cache 24h (QR won't change)
    return res.status(200).send(buffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
