import { DeliveryZone } from "../models/DeliveryZone.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { badRequest, conflict } from "../utils/httpError.js";

/**
 * Creates an order for `user`. Prices and the delivery fee always come from the
 * database, never from the request. Stock is reserved with conditional updates
 * and released again if any line can't be fulfilled.
 */
export async function placeOrder(user, { items, delivery, notes }) {
  // Merge duplicate lines for the same product.
  const quantities = new Map();
  for (const { productId, quantity } of items) {
    quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
  }

  const products = await Product.find({ _id: { $in: [...quantities.keys()] }, isActive: true });
  const byId = new Map(products.map((product) => [product.id, product]));
  const missing = [...quantities.keys()].filter((id) => !byId.has(id));
  if (missing.length) throw badRequest("Some products are no longer available", { productIds: missing });

  const zone = await DeliveryZone.findOne({ name: delivery.landmark, isActive: true });
  if (!zone) throw badRequest("We don't deliver to that landmark yet");

  const reserved = [];
  try {
    for (const [productId, quantity] of quantities) {
      const result = await Product.updateOne(
        { _id: productId, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
      );
      if (result.modifiedCount !== 1) {
        throw conflict(`Not enough stock for "${byId.get(productId).name}"`);
      }
      reserved.push([productId, quantity]);
    }

    const orderItems = [...quantities].map(([productId, quantity]) => {
      const product = byId.get(productId);
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
      };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return await Order.create({
      user: user._id,
      items: orderItems,
      delivery: { ...delivery, landmark: zone.name, fee: zone.fee },
      subtotal,
      total: subtotal + zone.fee,
      notes,
    });
  } catch (error) {
    await restock(reserved);
    throw error;
  }
}

export async function restock(lines) {
  await Promise.all(
    lines.map(([productId, quantity]) =>
      Product.updateOne({ _id: productId }, { $inc: { stock: quantity } }),
    ),
  );
}

/** Cancels an order and returns its items to stock. No-op if already cancelled. */
export async function cancelOrder(order) {
  if (order.status === "cancelled") return order;
  order.status = "cancelled";
  await order.save();
  await restock(order.items.map((item) => [item.product, item.quantity]));
  return order;
}
