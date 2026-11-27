import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { env, isTest } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import deliveryZoneRoutes from "./routes/deliveryZones.js";
import orderRoutes from "./routes/orders.js";
import productRoutes from "./routes/products.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Requests with no Origin header (curl, server-to-server) are allowed.
        callback(null, !origin || env.corsOrigins.includes(origin));
      },
    }),
  );
  app.use(express.json({ limit: "100kb" }));
  if (!isTest) app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/delivery-zones", deliveryZoneRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
