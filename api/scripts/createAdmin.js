// Creates an admin account, or promotes an existing account to admin.
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-password' npm run create-admin
// The values can also live in api/.env.
import { connectDatabase, disconnectDatabase } from "../src/config/db.js";
import { env } from "../src/config/env.js";
import { User } from "../src/models/User.js";

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;

if (!env.mongoUri || !email) {
  console.error("Set MONGODB_URI and ADMIN_EMAIL (and ADMIN_PASSWORD for a new account).");
  process.exit(1);
}

await connectDatabase(env.mongoUri);

const existing = await User.findOne({ email });
if (existing) {
  existing.role = "admin";
  await existing.save();
  console.log(`${email} is now an admin.`);
} else {
  if (!password || password.length < 12) {
    console.error("ADMIN_PASSWORD must be at least 12 characters for a new admin account.");
    process.exitCode = 1;
  } else {
    const user = new User({
      firstName: process.env.ADMIN_FIRST_NAME ?? "Store",
      lastName: process.env.ADMIN_LAST_NAME ?? "Admin",
      email,
      role: "admin",
    });
    await user.setPassword(password);
    await user.save();
    console.log(`Created admin account ${email}.`);
  }
}

await disconnectDatabase();
