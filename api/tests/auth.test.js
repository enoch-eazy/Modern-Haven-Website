import "./setup.js";
import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { OneTimeCode } from "../src/models/OneTimeCode.js";
import { User } from "../src/models/User.js";
import { outbox } from "../src/services/mailer.js";
import { OTP_MAX_ATTEMPTS } from "../src/services/otp.js";
import { api, clearDatabase, createUser, startDatabase, stopDatabase } from "./helpers.js";

before(startDatabase);
after(stopDatabase);
beforeEach(async () => {
  await clearDatabase();
  outbox.length = 0;
});

const newUser = {
  firstName: "Ada",
  lastName: "Obi",
  email: "Ada@Example.com",
  phoneNumber: "+2348012345678",
  password: "supersecret",
};

/** The 6-digit code from the most recent email sent to `email`. */
function lastCodeFor(email) {
  const mail = outbox.findLast((m) => m.to === email.toLowerCase());
  assert.ok(mail, `expected an email to ${email}`);
  return mail.text.match(/Your code: (\d{6})/)[1];
}

/** Lets a new code be requested straight away instead of waiting out the cooldown. */
const skipCooldown = () => OneTimeCode.updateMany({}, { issuedAt: new Date(Date.now() - 5 * 60 * 1000) });

async function registerAndVerify(user = newUser) {
  await api().post("/api/auth/register").send(user).expect(201);
  return api()
    .post("/api/auth/verify-email")
    .send({ email: user.email, code: lastCodeFor(user.email) })
    .expect(200);
}

describe("auth: sign up and email verification", () => {
  it("reports health", async () => {
    const res = await api().get("/api/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.database, "connected");
  });

  it("registers an unverified customer and emails a code, without issuing a token", async () => {
    const res = await api().post("/api/auth/register").send({ ...newUser, role: "admin" });
    assert.equal(res.status, 201);
    assert.deepEqual(res.body, { email: "ada@example.com", verificationRequired: true });

    const user = await User.findOne({ email: "ada@example.com" });
    assert.equal(user.role, "customer", "role must not be settable on register");
    assert.equal(user.emailVerified, false);

    assert.equal(outbox.length, 1);
    assert.match(outbox[0].subject, /^\d{6} is your Modern Haven verification code$/);
    assert.match(outbox[0].html, /Confirm your email/);
    assert.match(outbox[0].html, /Hi Ada,/);
  });

  it("verifies the email with the code and returns a token", async () => {
    const res = await registerAndVerify();
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, "ada@example.com");
    assert.equal(res.body.user.emailVerified, true);
    assert.equal(res.body.user.passwordHash, undefined);

    const me = await api().get("/api/auth/me").set("Authorization", `Bearer ${res.body.token}`);
    assert.equal(me.status, 200);
    assert.equal(me.body.user.firstName, "Ada");
  });

  it("blocks login until the email is verified", async () => {
    await api().post("/api/auth/register").send(newUser);
    const login = await api().post("/api/auth/login").send({ email: newUser.email, password: newUser.password });
    assert.equal(login.status, 403);
    assert.equal(login.body.code, "EMAIL_NOT_VERIFIED");

    // A wrong password must not reveal that the account is unverified.
    const wrong = await api().post("/api/auth/login").send({ email: newUser.email, password: "wrong-password" });
    assert.equal(wrong.status, 401);
  });

  it("rejects a wrong code and locks the code after too many attempts", async () => {
    await api().post("/api/auth/register").send(newUser);
    const right = lastCodeFor(newUser.email);
    const wrongCode = right === "000000" ? "111111" : "000000";

    for (let i = 0; i < OTP_MAX_ATTEMPTS; i += 1) {
      const res = await api().post("/api/auth/verify-email").send({ email: newUser.email, code: wrongCode });
      assert.equal(res.status, 400);
      assert.equal(res.body.code, "OTP_INVALID");
    }
    const locked = await api().post("/api/auth/verify-email").send({ email: newUser.email, code: right });
    assert.equal(locked.status, 400);
    assert.equal(locked.body.code, "OTP_EXPIRED", "the right code must not work once locked");
  });

  it("rejects expired codes", async () => {
    await api().post("/api/auth/register").send(newUser);
    await OneTimeCode.updateMany({}, { expiresAt: new Date(Date.now() - 1000) });
    const res = await api()
      .post("/api/auth/verify-email")
      .send({ email: newUser.email, code: lastCodeFor(newUser.email) });
    assert.equal(res.status, 400);
    assert.equal(res.body.code, "OTP_EXPIRED");
  });

  it("resends a code after the cooldown, and the new code replaces the old one", async () => {
    await api().post("/api/auth/register").send(newUser);
    const first = lastCodeFor(newUser.email);

    const tooSoon = await api().post("/api/auth/resend-verification").send({ email: newUser.email });
    assert.equal(tooSoon.status, 429);
    assert.equal(tooSoon.body.code, "OTP_COOLDOWN");

    await skipCooldown();
    await api().post("/api/auth/resend-verification").send({ email: newUser.email }).expect(200);
    const second = lastCodeFor(newUser.email);
    assert.equal(outbox.length, 2);

    if (first !== second) {
      const old = await api().post("/api/auth/verify-email").send({ email: newUser.email, code: first });
      assert.equal(old.status, 400);
    }
    await api().post("/api/auth/verify-email").send({ email: newUser.email, code: second }).expect(200);
  });

  it("answers resend requests for unknown emails without sending anything", async () => {
    const res = await api().post("/api/auth/resend-verification").send({ email: "nobody@example.com" });
    assert.equal(res.status, 200);
    assert.equal(outbox.length, 0);
  });

  it("lets an unverified account register again, but rejects verified duplicates", async () => {
    await api().post("/api/auth/register").send(newUser).expect(201);
    await api().post("/api/auth/register").send({ ...newUser, password: "a-new-password" }).expect(201);
    assert.equal(await User.countDocuments(), 1);

    await api()
      .post("/api/auth/verify-email")
      .send({ email: newUser.email, code: lastCodeFor(newUser.email) })
      .expect(200);
    await api().post("/api/auth/login").send({ email: newUser.email, password: "a-new-password" }).expect(200);

    const dup = await api().post("/api/auth/register").send(newUser);
    assert.equal(dup.status, 409);
  });

  it("treats existing accounts without the flag (e.g. admins) as verified", async () => {
    const { user } = await createUser({ role: "admin" });
    await User.collection.updateOne({ _id: user._id }, { $unset: { emailVerified: "" } });
    const login = await api().post("/api/auth/login").send({ email: user.email, password: "password123" });
    assert.equal(login.status, 200);
  });

  it("validates input", async () => {
    const res = await api().post("/api/auth/register").send({ ...newUser, password: "short", email: "nope" });
    assert.equal(res.status, 400);
    assert.ok(res.body.details.password);
    assert.ok(res.body.details.email);

    const badCode = await api().post("/api/auth/verify-email").send({ email: newUser.email, code: "12ab" });
    assert.equal(badCode.status, 400);
    assert.ok(badCode.body.details.code);
  });
});

describe("auth: login", () => {
  it("logs in a verified user and rejects wrong passwords and bad tokens", async () => {
    await registerAndVerify();
    const login = await api().post("/api/auth/login").send({ email: "ada@example.com", password: "supersecret" });
    assert.equal(login.status, 200);
    assert.ok(login.body.token);

    const wrong = await api().post("/api/auth/login").send({ email: newUser.email, password: "wrong-password" });
    assert.equal(wrong.status, 401);

    const me = await api().get("/api/auth/me").set("Authorization", "Bearer not-a-token");
    assert.equal(me.status, 401);
  });
});

describe("auth: forgot and reset password", () => {
  it("emails a reset code and resets the password with it", async () => {
    const { body: verified } = await registerAndVerify();

    const forgot = await api().post("/api/auth/forgot-password").send({ email: newUser.email });
    assert.equal(forgot.status, 200);
    const mail = outbox.at(-1);
    assert.match(mail.subject, /password reset code/);
    assert.match(mail.html, /Reset your password/);

    await new Promise((resolve) => setTimeout(resolve, 1100)); // so the reset lands in a later second than the old token
    const reset = await api()
      .post("/api/auth/reset-password")
      .send({ email: newUser.email, code: lastCodeFor(newUser.email), password: "brand-new-pass" });
    assert.equal(reset.status, 200);

    await api().post("/api/auth/login").send({ email: newUser.email, password: newUser.password }).expect(401);
    await api().post("/api/auth/login").send({ email: newUser.email, password: "brand-new-pass" }).expect(200);

    const oldSession = await api().get("/api/auth/me").set("Authorization", `Bearer ${verified.token}`);
    assert.equal(oldSession.status, 401, "tokens issued before the reset must stop working");
  });

  it("gives the same answer for unknown emails and sends nothing", async () => {
    const res = await api().post("/api/auth/forgot-password").send({ email: "nobody@example.com" });
    assert.equal(res.status, 200);
    assert.equal(outbox.length, 0);

    const reset = await api()
      .post("/api/auth/reset-password")
      .send({ email: "nobody@example.com", code: "123456", password: "brand-new-pass" });
    assert.equal(reset.status, 400);
    assert.equal(reset.body.code, "OTP_INVALID");
  });

  it("does not accept a verification code as a reset code", async () => {
    await api().post("/api/auth/register").send(newUser);
    const res = await api()
      .post("/api/auth/reset-password")
      .send({ email: newUser.email, code: lastCodeFor(newUser.email), password: "brand-new-pass" });
    assert.equal(res.status, 400);
  });

  it("verifies an unverified account when its password is reset", async () => {
    await api().post("/api/auth/register").send(newUser);
    await api().post("/api/auth/forgot-password").send({ email: newUser.email }).expect(200);
    await api()
      .post("/api/auth/reset-password")
      .send({ email: newUser.email, code: lastCodeFor(newUser.email), password: "brand-new-pass" })
      .expect(200);
    await api().post("/api/auth/login").send({ email: newUser.email, password: "brand-new-pass" }).expect(200);
  });
});
