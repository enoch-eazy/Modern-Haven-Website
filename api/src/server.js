import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { assertRequiredEnv, env } from "./config/env.js";

assertRequiredEnv();
await connectDatabase(env.mongoUri);

const server = createApp().listen(env.port, () => {
  console.log(`Modern Haven API listening on http://localhost:${env.port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close();
  await disconnectDatabase();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
