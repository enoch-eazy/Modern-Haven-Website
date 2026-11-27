// Seeds delivery zones and starter products.
//   npm run seed         adds anything missing, leaves existing records alone
//   npm run seed:reset   deletes ALL products and delivery zones first
import { connectDatabase, disconnectDatabase } from "../src/config/db.js";
import { env } from "../src/config/env.js";
import { DeliveryZone } from "../src/models/DeliveryZone.js";
import { Product } from "../src/models/Product.js";
import { slugify } from "../src/utils/slugify.js";
import { deliveryZones, products } from "./seedData.js";

if (!env.mongoUri) {
  console.error("Set MONGODB_URI in api/.env first.");
  process.exit(1);
}

await connectDatabase(env.mongoUri);

if (process.argv.includes("--reset")) {
  await Promise.all([Product.deleteMany({}), DeliveryZone.deleteMany({})]);
  console.log("Cleared products and delivery zones.");
}

let zonesAdded = 0;
for (const zone of deliveryZones) {
  const result = await DeliveryZone.updateOne({ name: zone.name }, { $setOnInsert: zone }, { upsert: true });
  zonesAdded += result.upsertedCount;
}

let productsAdded = 0;
for (const product of products) {
  const slug = slugify(product.name);
  const result = await Product.updateOne({ slug }, { $setOnInsert: { ...product, slug } }, { upsert: true });
  productsAdded += result.upsertedCount;
}

console.log(`Added ${zonesAdded} delivery zones and ${productsAdded} products.`);
await disconnectDatabase();
