import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { Product } from "../src/models/Product.js";
import { api, clearDatabase, createUser, startDatabase, stopDatabase } from "./helpers.js";

before(startDatabase);
after(stopDatabase);
beforeEach(clearDatabase);

const phone = {
  name: "Smart Phone X",
  description: "A very smart phone",
  price: 250000,
  category: "gadgets",
  audience: "unisex",
  stock: 5,
};

describe("products", () => {
  it("only lets admins create products", async () => {
    const { token: customer } = await createUser();
    const { token: admin } = await createUser({ role: "admin" });

    assert.equal((await api().post("/api/products").send(phone)).status, 401);
    assert.equal((await api().post("/api/products").set("Authorization", `Bearer ${customer}`).send(phone)).status, 403);

    const res = await api().post("/api/products").set("Authorization", `Bearer ${admin}`).send(phone);
    assert.equal(res.status, 201);
    assert.equal(res.body.product.slug, "smart-phone-x");
    assert.ok(res.body.product.id);
  });

  it("gives duplicate names unique slugs", async () => {
    const { token } = await createUser({ role: "admin" });
    await api().post("/api/products").set("Authorization", `Bearer ${token}`).send(phone);
    const res = await api().post("/api/products").set("Authorization", `Bearer ${token}`).send(phone);
    assert.equal(res.body.product.slug, "smart-phone-x-2");
  });

  it("filters, searches, sorts and hides inactive products", async () => {
    await Product.create([
      { ...phone, slug: "a" },
      { name: "Red Dress", slug: "b", price: 20000, category: "clothing", audience: "women" },
      { name: "Blue Shirt", slug: "c", price: 15000, category: "clothing", audience: "men" },
      { name: "Hidden", slug: "d", price: 1, category: "clothing", isActive: false },
    ]);

    const clothing = await api().get("/api/products?category=clothing&sort=price-asc");
    assert.deepEqual(clothing.body.items.map((p) => p.name), ["Blue Shirt", "Red Dress"]);
    assert.equal(clothing.body.total, 2);

    const search = await api().get("/api/products?q=dress");
    assert.deepEqual(search.body.items.map((p) => p.name), ["Red Dress"]);

    const bySlug = await api().get("/api/products/b");
    assert.equal(bySlug.body.product.name, "Red Dress");
    assert.equal((await api().get("/api/products/d")).status, 404);

    assert.equal((await api().get("/api/products?category=shoes")).status, 400);
  });

  it("updates and deletes products", async () => {
    const { token } = await createUser({ role: "admin" });
    const created = await api().post("/api/products").set("Authorization", `Bearer ${token}`).send(phone);
    const id = created.body.product.id;

    const updated = await api()
      .patch(`/api/products/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Smart Phone Y", price: 199000 });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.product.slug, "smart-phone-y");
    assert.equal(updated.body.product.price, 199000);
    assert.equal(updated.body.product.stock, 5, "omitted fields are unchanged");

    assert.equal((await api().delete(`/api/products/${id}`).set("Authorization", `Bearer ${token}`)).status, 204);
    assert.equal((await api().get(`/api/products/${id}`)).status, 404);
  });

  it("returns category counts", async () => {
    await Product.create([
      { ...phone, slug: "a" },
      { name: "Red Dress", slug: "b", price: 20000, category: "clothing", audience: "women" },
    ]);
    const res = await api().get("/api/products/categories");
    const gadgets = res.body.categories.find((c) => c.category === "gadgets");
    assert.equal(gadgets.count, 1);
  });
});
