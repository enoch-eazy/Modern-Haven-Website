import dotenv from "dotenv";

dotenv.config({ quiet: true });

const list = (value, fallback) =>
  (value ?? fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  // MONGODB_URL is accepted too, because the storefront's .env already uses that name.
  mongoUri: process.env.MONGODB_URI ?? process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigins: list(process.env.CORS_ORIGINS, "http://localhost:4000,http://localhost:3000"),
};

export const isProduction = env.nodeEnv === "production";
export const isTest = env.nodeEnv === "test";

export function assertRequiredEnv() {
  const missing = [];
  if (!env.mongoUri) missing.push("MONGODB_URI");
  if (!env.jwtSecret) missing.push("JWT_SECRET");
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  if (isProduction && env.jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }
}
