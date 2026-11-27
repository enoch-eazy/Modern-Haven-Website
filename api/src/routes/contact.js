import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { isTest } from "../config/env.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { parse } from "../utils/validate.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: () => isTest,
  message: { error: "Too many messages, please try again later" },
});

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Your name is required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phoneNumber: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please write a short message").max(4000),
});

router.post("/", contactLimiter, async (req, res) => {
  await ContactMessage.create(parse(contactSchema, req.body));
  res.status(201).json({ message: "Thanks! We'll get back to you soon." });
});

export default router;
