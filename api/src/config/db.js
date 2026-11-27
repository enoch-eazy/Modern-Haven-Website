import mongoose from "mongoose";

let connecting;

/** Connects once and reuses the connection (serverless invocations share module state when warm). */
export async function connectDatabase(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  mongoose.set("strictQuery", true);
  connecting ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 }).catch((error) => {
    connecting = undefined; // let the next request retry
    throw error;
  });
  await connecting;
  return mongoose.connection;
}

export async function disconnectDatabase() {
  connecting = undefined;
  await mongoose.disconnect();
}
