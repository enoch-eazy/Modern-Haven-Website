// Vercel serverless entry point. vercel.json rewrites every path here, and Express routes it as usual.
// For any other host, use `npm start` (src/server.js) instead.
import { createApp } from "../src/app.js";
import { connectDatabase } from "../src/config/db.js";
import { assertRequiredEnv, env } from "../src/config/env.js";

assertRequiredEnv();
const app = createApp();

export default async function handler(req, res) {
  try {
    await connectDatabase(env.mongoUri);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Still answer CORS preflights and the health check (which then reports "disconnected"),
    // so an outage is easy to diagnose and browsers see a readable error instead of a CORS failure.
    const path = (req.url ?? "").split("?")[0];
    if (req.method === "OPTIONS" || path === "/api/health") return app(req, res);
    const origin = req.headers.origin;
    if (origin && env.corsOrigins.includes(origin)) res.setHeader("Access-Control-Allow-Origin", origin);
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "The store is temporarily unavailable. Please try again shortly." }));
  }
  return app(req, res);
}
