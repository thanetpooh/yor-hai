import { z } from "zod";

export const urlSchema = z.object({
  url: z.url({
    protocol: /^https$/,
  }),
});
