import { nanoid } from "nanoid";
import { env } from "../config/env.js";
import { urlSchema } from "../validators/urlValidator.js";
import { saveUrl, getUrl } from "../models/urlModel.js";
// POST /api/shorten
export async function shortenUrl(req, res) {
  try {
    const result = urlSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues,
      });
    }

    const { url } = result.data;

    let shortCode;
    let success = null;

    while (!success) {
      shortCode = nanoid(6);
      success = await saveUrl(shortCode, url);
    }

    return res.status(201).json({
      originalUrl: url,
      shortUrl: `${env.BASE_URL}/${shortCode}`,
      expiresIn: "30 days",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// GET /:shortCode
export async function redirectUrl(req, res) {
  try {
    const { shortCode } = req.params;

    const url = await getUrl(shortCode);

    if (!url) {
      return res.status(404).json({
        message: "Short URL not found or expired",
      });
    }

    return res.redirect(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
