import { Router } from "express";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { ORDER_STATUSES, Order, PAYMENT_STATUSES } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { ROLES, User } from "../models/User.js";
import { cancelOrder } from "../services/orders.js";
import { badRequest, notFound } from "../utils/httpError.js";
import { assertObjectId, escapeRegex, parse } from "../utils/validate.js";

// Everything here backs the upcoming admin console.
const router = Router();
router.use(requireAuth, requireAdmin);

const pagination = {
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
};

async function paginate(Model, filter, { page, limit }, sort = { createdAt: -1 }, populate) {
  let query = Model.find(filter).sort(sort).skip((page - 1) * limit).limit(limit);
  if (populate) query = query.populate(populate);
  const [items, total] = await Promise.all([query, Model.countDocuments(filter)]);
  return { items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

router.get("/stats", async (_req, res) => {
  const [products, lowStock, customers, ordersByStatus, revenue, unreadMessages] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Product.countDocuments({ isActive: true, stock: { $lte: 5 } }),
    User.countDocuments({ role: "customer" }),
    Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Order.aggregate([
      { $match: { status: { $ne: "cancelled" }, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
    ContactMessage.countDocuments({ isRead: false }),
  ]);
  res.json({
    products,
    lowStock,
    customers,
    orders: Object.fromEntries(ORDER_STATUSES.map((status) => [
      status,
      ordersByStatus.find((row) => row._id === status)?.count ?? 0,
    ])),
    paidRevenue: revenue[0]?.total ?? 0,
    unreadMessages,
  });
});

router.get("/orders", async (req, res) => {
  const query = parse(z.object({ ...pagination, status: z.enum(ORDER_STATUSES).optional() }), req.query);
  const filter = query.status ? { status: query.status } : {};
  res.json(await paginate(Order, filter, query, { createdAt: -1 }, { path: "user", select: "firstName lastName email phoneNumber" }));
});

router.patch("/orders/:id", async (req, res) => {
  assertObjectId(req.params.id, "order id");
  const data = parse(
    z.object({ status: z.enum(ORDER_STATUSES).optional(), paymentStatus: z.enum(PAYMENT_STATUSES).optional() }),
    req.body,
  );
  const order = await Order.findById(req.params.id);
  if (!order) throw notFound("Order not found");
  if (order.status === "cancelled" && data.status && data.status !== "cancelled") {
    throw badRequest("Cancelled orders can't be reopened");
  }

  if (data.paymentStatus) order.paymentStatus = data.paymentStatus;
  if (data.status === "cancelled") {
    await cancelOrder(order); // returns items to stock and saves
  } else {
    if (data.status) order.status = data.status;
    await order.save();
  }
  res.json({ order });
});

router.get("/users", async (req, res) => {
  const query = parse(
    z.object({ ...pagination, role: z.enum(ROLES).optional(), q: z.string().trim().max(100).optional() }),
    req.query,
  );
  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.q) {
    const pattern = new RegExp(escapeRegex(query.q), "i");
    filter.$or = [{ firstName: pattern }, { lastName: pattern }, { email: pattern }];
  }
  res.json(await paginate(User, filter, query));
});

router.patch("/users/:id/role", async (req, res) => {
  assertObjectId(req.params.id, "user id");
  const { role } = parse(z.object({ role: z.enum(ROLES) }), req.body);
  if (req.user._id.equals(req.params.id) && role !== "admin") {
    throw badRequest("You can't remove your own admin access");
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) throw notFound("User not found");
  res.json({ user });
});

router.get("/messages", async (req, res) => {
  const query = parse(z.object({ ...pagination, unread: z.enum(["true", "false"]).optional() }), req.query);
  const filter = query.unread === "true" ? { isRead: false } : {};
  res.json(await paginate(ContactMessage, filter, query));
});

router.patch("/messages/:id", async (req, res) => {
  assertObjectId(req.params.id, "message id");
  const { isRead } = parse(z.object({ isRead: z.boolean() }), req.body);
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead }, { new: true });
  if (!message) throw notFound("Message not found");
  res.json({ message });
});

export default router;
