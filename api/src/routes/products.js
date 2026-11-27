import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { AUDIENCES, CATEGORIES, Product } from "../models/Product.js";
import { notFound } from "../utils/httpError.js";
import { uniqueSlug } from "../utils/slugify.js";
import { escapeRegex, parse } from "../utils/validate.js";

const router = Router();

const SORTS = {
  newest: { createdAt: -1 },
  "price-asc": { price: 1, createdAt: -1 },
  "price-desc": { price: -1, createdAt: -1 },
  name: { name: 1 },
};

const booleanParam = z.enum(["true", "false"]).transform((value) => value === "true");

const listQuerySchema = z.object({
  category: z.enum(CATEGORIES).optional(),
  audience: z.enum(AUDIENCES).optional(),
  subcategory: z.string().trim().toLowerCase().max(60).optional(),
  q: z.string().trim().max(100).optional(),
  featured: booleanParam.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z.enum(Object.keys(SORTS)).default("newest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});

const imageUrl = z
  .string()
  .trim()
  .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), {
    message: "Images must be absolute URLs or paths starting with /",
  });

const productSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().max(4000).default(""),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().min(0).optional(),
  category: z.enum(CATEGORIES),
  audience: z.enum(AUDIENCES).default("unisex"),
  subcategory: z.string().trim().toLowerCase().max(60).optional(),
  images: z.array(imageUrl).max(10).default([]),
  stock: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  tags: z.array(z.string().trim().toLowerCase().max(40)).max(20).default([]),
});

// For updates every field is optional and no defaults are applied.
const productUpdateSchema = productSchema
  .extend({
    description: z.string().max(4000),
    audience: z.enum(AUDIENCES),
    images: z.array(imageUrl).max(10),
    stock: z.number().int().min(0),
    featured: z.boolean(),
    isActive: z.boolean(),
    tags: z.array(z.string().trim().toLowerCase().max(40)).max(20),
  })
  .partial();

/** Shoppers only ever see active products; admins can ask for everything. */
function visibilityFilter(req) {
  return req.user?.role === "admin" && req.query.includeInactive === "true" ? {} : { isActive: true };
}

async function optionalAuth(req, res, next) {
  if (!req.get("authorization")) return next();
  return requireAuth(req, res, next);
}

router.get("/", optionalAuth, async (req, res) => {
  const query = parse(listQuerySchema, req.query);
  const filter = { ...visibilityFilter(req) };
  if (query.category) filter.category = query.category;
  if (query.audience) filter.audience = query.audience;
  if (query.subcategory) filter.subcategory = query.subcategory;
  if (query.featured !== undefined) filter.featured = query.featured;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filter.price = {};
    if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
    if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
  }
  if (query.q) {
    const pattern = new RegExp(escapeRegex(query.q), "i");
    filter.$or = [{ name: pattern }, { description: pattern }, { tags: pattern }];
  }

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(SORTS[query.sort])
      .skip((query.page - 1) * query.limit)
      .limit(query.limit),
    Product.countDocuments(filter),
  ]);

  res.json({
    items,
    page: query.page,
    limit: query.limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / query.limit)),
  });
});

router.get("/categories", async (_req, res) => {
  const counts = await Product.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: { category: "$category", audience: "$audience" }, count: { $sum: 1 } } },
  ]);
  const categories = CATEGORIES.map((category) => {
    const rows = counts.filter((row) => row._id.category === category);
    return {
      category,
      count: rows.reduce((sum, row) => sum + row.count, 0),
      audiences: Object.fromEntries(rows.map((row) => [row._id.audience, row.count])),
    };
  });
  res.json({ categories, audiences: AUDIENCES });
});

router.get("/:idOrSlug", optionalAuth, async (req, res) => {
  const { idOrSlug } = req.params;
  const match = mongoose.isValidObjectId(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };
  const product = await Product.findOne({ ...match, ...visibilityFilter(req) });
  if (!product) throw notFound("Product not found");
  res.json({ product });
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const data = parse(productSchema, req.body);
  const product = await Product.create({ ...data, slug: await uniqueSlug(Product, data.name) });
  res.status(201).json({ product });
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  const data = parse(productUpdateSchema, req.body);
  const product = await Product.findById(req.params.id);
  if (!product) throw notFound("Product not found");
  if (data.name && data.name !== product.name) {
    product.slug = await uniqueSlug(Product, data.name, product._id);
  }
  product.set(data);
  await product.save();
  res.json({ product });
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw notFound("Product not found");
  res.status(204).end();
});

export default router;
