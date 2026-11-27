// Vercel serverless entry point. vercel.json rewrites every path here, and Express routes it as usual.
// For any other host, use `npm start` (src/server.js) instead.
import { createApp } from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";
import { assertRequiredEnv, env } from "../src/config/env.js";

assertRequiredEnv();
const app = createApp();

export default async function handler(req, res) {
  await connectDatabase(env.mongoUri);
  return app(req, res);
}
