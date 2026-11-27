import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { DeliveryZone } from "../src/models/DeliveryZone.js";
import { Product } from "../src/models/Product.js";
import { api, clearDatabase, createUser, startDatabase, stopDatabase } from "./helpers.js";

before(startDatabase);
after(stopDatabase);
beforeEach(clearDatabase);

const delivery = { address: "12 Example Street, Ojodu", landmark: "Butterfly", phoneNumber: "08012345678" };

async function setup() {
  await DeliveryZone.create({ name: "Butterfly", fee: 1500 });
  const [watch, shirt] = await Product.create([
    { name: "Watch", slug: "watch", price: 50000, category: "gadgets", stock: 3 },
    { name: "Shirt", slug: "shirt", price: 10000, category: "clothing", stock: 10 },
  ]);
  return { watch, shirt };
}

describe("orders", () => {
  it("prices orders from the database and reserves stock", async () => {
    const { watch, shirt } = await setup();
    const { token } = await createUser();

    const res = await api()
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          { productId: watch.id, quantity: 1, price: 1 }, // client price is ignored
          { productId: shirt.id, quantity: 2 },
          { productId: shirt.id, quantity: 1 },
        ],
        delivery,
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.order.subtotal, 50000 + 3 * 10000);
    assert.equal(res.body.order.delivery.fee, 1500);
    assert.equal(res.body.order.total, 81500);
    assert.equal(res.body.order.items.length, 2, "duplicate lines are merged");
    assert.equal((await Product.findById(shirt.id)).stock, 7);
  });

  it("refuses orders beyond available stock and rolls back reservations", async () => {
    const { watch, shirt } = await setup();
    const { token } = await createUser();

    const res = await api()
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ items: [{ productId: shirt.id, quantity: 2 }, { productId: watch.id, quantity: 4 }], delivery });

    assert.equal(res.status, 409);
    assert.equal((await Product.findById(shirt.id)).stock, 10);
    assert.equal((await Product.findById(watch.id)).stock, 3);
  });

  it("rejects unknown landmarks and requires login", async () => {
    const { watch } = await setup();
    const { token } = await createUser();
    const items = [{ productId: watch.id, quantity: 1 }];

    assert.equal((await api().post("/api/orders").send({ items, delivery })).status, 401);
    const res = await api()
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ items, delivery: { ...delivery, landmark: "Mars" } });
    assert.equal(res.status, 400);
  });

  it("lets customers see and cancel only their own orders", async () => {
    const { watch } = await setup();
    const alice = await createUser();
    const bob = await createUser();

    const created = await api()
      .post("/api/orders")
      .set("Authorization", `Bearer ${alice.token}`)
      .send({ items: [{ productId: watch.id, quantity: 2 }], delivery });
    const id = created.body.order.id;

    assert.equal((await api().get(`/api/orders/${id}`).set("Authorization", `Bearer ${bob.token}`)).status, 403);
    const mine = await api().get("/api/orders/mine").set("Authorization", `Bearer ${alice.token}`);
    assert.equal(mine.body.orders.length, 1);

    const cancelled = await api().post(`/api/orders/${id}/cancel`).set("Authorization", `Bearer ${alice.token}`);
    assert.equal(cancelled.body.order.status, "cancelled");
    assert.equal((await Product.findById(watch.id)).stock, 3, "stock is returned on cancel");
  });

  it("lets admins move orders through statuses and see stats", async () => {
    const { watch } = await setup();
    const customer = await createUser();
    const admin = await createUser({ role: "admin" });

    const created = await api()
      .post("/api/orders")
      .set("Authorization", `Bearer ${customer.token}`)
      .send({ items: [{ productId: watch.id, quantity: 1 }], delivery });
    const id = created.body.order.id;

    assert.equal((await api().get("/api/admin/orders").set("Authorization", `Bearer ${customer.token}`)).status, 403);

    const updated = await api()
      .patch(`/api/admin/orders/${id}`)
      .set("Authorization", `Bearer ${admin.token}`)
      .send({ status: "confirmed", paymentStatus: "paid" });
    assert.equal(updated.body.order.status, "confirmed");

    const stats = await api().get("/api/admin/stats").set("Authorization", `Bearer ${admin.token}`);
    assert.equal(stats.body.orders.confirmed, 1);
    assert.equal(stats.body.paidRevenue, 51500);
  });
});

describe("contact", () => {
  it("stores messages that admins can read", async () => {
    const res = await api()
      .post("/api/contact")
      .send({ fullName: "Tolu", email: "tolu@example.com", message: "Do you stock iPads?" });
    assert.equal(res.status, 201);

    const { token } = await createUser({ role: "admin" });
    const list = await api().get("/api/admin/messages?unread=true").set("Authorization", `Bearer ${token}`);
    assert.equal(list.body.total, 1);
  });
});
