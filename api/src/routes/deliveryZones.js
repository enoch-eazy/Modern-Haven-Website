import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { DeliveryZone } from "../models/DeliveryZone.js";
import { notFound } from "../utils/httpError.js";
import { parse } from "../utils/validate.js";

const router = Router();

const zoneSchema = z.object({
  name: z.string().trim().min(1).max(80),
  fee: z.number().int().min(0),
  isActive: z.boolean().default(true),
});

router.get("/", async (_req, res) => {
  const zones = await DeliveryZone.find({ isActive: true }).sort({ name: 1 });
  res.json({ zones });
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const zone = await DeliveryZone.create(parse(zoneSchema, req.body));
  res.status(201).json({ zone });
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const data = parse(zoneSchema.partial(), req.body);
  const zone = await DeliveryZone.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!zone) throw notFound("Delivery zone not found");
  res.json({ zone });
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const zone = await DeliveryZone.findByIdAndDelete(req.params.id);
  if (!zone) throw notFound("Delivery zone not found");
  res.status(204).end();
});

export default router;
