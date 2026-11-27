import mongoose from "mongoose";
import { z } from "zod";
import { badRequest } from "./httpError.js";

/** Parses `data` with a zod schema, throwing a 400 with field errors on failure. */
export function parse(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw badRequest("Validation failed", result.error.flatten().fieldErrors);
  }
  return result.data;
}

export const objectId = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value), { message: "Invalid id" });

export function assertObjectId(id, label = "id") {
  if (!mongoose.isValidObjectId(id)) throw badRequest(`Invalid ${label}`);
}

export const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
