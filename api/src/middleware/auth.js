import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { forbidden, unauthorized } from "../utils/httpError.js";

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
}

/** Requires a valid `Authorization: Bearer <token>` header and loads `req.user`. */
export async function requireAuth(req, _res, next) {
  const header = req.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) throw unauthorized();

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw unauthorized("Invalid or expired token");
  }

  // Load the user on every request so role changes and deleted accounts take effect immediately.
  const user = await User.findById(payload.sub);
  if (!user) throw unauthorized("Account no longer exists");
  req.user = user;
  next();
}

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== "admin") throw forbidden();
  next();
}
