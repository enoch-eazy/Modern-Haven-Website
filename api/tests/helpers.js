import "./setup.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { createApp } from "../src/app.js";
import { User } from "../src/models/User.js";
import { signToken } from "../src/middleware/auth.js";

let mongo;

export async function startDatabase() {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await Promise.all(Object.values(mongoose.models).map((model) => model.init()));
}

export async function stopDatabase() {
  await mongoose.disconnect();
  await mongo?.stop();
}

export async function clearDatabase() {
  await Promise.all(Object.values(mongoose.connection.collections).map((c) => c.deleteMany({})));
}

export const api = () => request(createApp());

let counter = 0;
export async function createUser({ role = "customer", ...overrides } = {}) {
  counter += 1;
  const user = new User({
    firstName: "Test",
    lastName: `User${counter}`,
    email: `user${counter}@example.com`,
    role,
    ...overrides,
  });
  await user.setPassword("password123");
  await user.save();
  return { user, token: signToken(user) };
}
