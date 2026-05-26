import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(cors({ methods: ["GET", "POST"] }));

app.use(express.json());
app.use(urlRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
