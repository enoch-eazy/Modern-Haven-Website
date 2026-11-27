import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { Order } from "../models/Order.js";
import { cancelOrder, placeOrder } from "../services/orders.js";
import { badRequest, forbidden, notFound } from "../utils/httpError.js";
import { assertObjectId, objectId, parse } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

const createOrderSchema = z.object({
  items: z
    .array(z.object({ productId: objectId, quantity: z.number().int().min(1).max(50) }))
    .min(1, "Your cart is empty")
    .max(50),
  delivery: z.object({
    address: z.string().trim().min(5, "Enter your delivery address").max(300),
    landmark: z.string().trim().min(1, "Choose the closest landmark").max(80),
    phoneNumber: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
  }),
  notes: z.string().trim().max(500).optional(),
});

async function findOwnOrder(req) {
  assertObjectId(req.params.id, "order id");
  const order = await Order.findById(req.params.id);
  if (!order) throw notFound("Order not found");
  if (!order.user.equals(req.user._id) && req.user.role !== "admin") throw forbidden();
  return order;
}

router.post("/", async (req, res) => {
  const order = await placeOrder(req.user, parse(createOrderSchema, req.body));
  res.status(201).json({ order });
});

router.get("/mine", async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get("/:id", async (req, res) => {
  res.json({ order: await findOwnOrder(req) });
});

router.post("/:id/cancel", async (req, res) => {
  const order = await findOwnOrder(req);
  if (order.status !== "pending") {
    throw badRequest("Only pending orders can be cancelled. Please contact us for help.");
  }
  res.json({ order: await cancelOrder(order) });
});

export default router;
