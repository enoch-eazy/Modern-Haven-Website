import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { api, clearDatabase, startDatabase, stopDatabase } from "./helpers.js";

before(startDatabase);
after(stopDatabase);
beforeEach(clearDatabase);

const newUser = {
  firstName: "Ada",
  lastName: "Obi",
  email: "Ada@Example.com",
  phoneNumber: "+2348012345678",
  password: "supersecret",
};

describe("auth", () => {
  it("reports health", async () => {
    const res = await api().get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.database, "connected");
  });

  it("registers a customer and never returns the password hash", async () => {
    const res = await api().post("/api/auth/register").send({ ...newUser, role: "admin" });
    assert.equal(res.status, 201);
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, "ada@example.com");
    assert.equal(res.body.user.role, "customer", "role must not be settable on register");
    assert.equal(res.body.user.passwordHash, undefined);
  });

  it("rejects duplicate emails", async () => {
    await api().post("/api/auth/register").send(newUser);
    const res = await api().post("/api/auth/register").send(newUser);
    assert.equal(res.status, 409);
  });

  it("validates input", async () => {
    const res = await api().post("/api/auth/register").send({ ...newUser, password: "short", email: "nope" });
    assert.equal(res.status, 400);
    assert.ok(res.body.details.password);
    assert.ok(res.body.details.email);
  });

  it("logs in and returns the current user", async () => {
    await api().post("/api/auth/register").send(newUser);
    const login = await api().post("/api/auth/login").send({ email: "ada@example.com", password: "supersecret" });
    assert.equal(login.status, 200);

    const me = await api().get("/api/auth/me").set("Authorization", `Bearer ${login.body.token}`);
    assert.equal(me.status, 200);
    assert.equal(me.body.user.firstName, "Ada");
  });

  it("rejects wrong passwords and bad tokens", async () => {
    await api().post("/api/auth/register").send(newUser);
    const login = await api().post("/api/auth/login").send({ email: newUser.email, password: "wrong-password" });
    assert.equal(login.status, 401);

    const me = await api().get("/api/auth/me").set("Authorization", "Bearer not-a-token");
    assert.equal(me.status, 401);
  });
});
