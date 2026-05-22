import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../src/models/Product.js";
import { getMongoUri } from "../src/utils/mongoUri.js";

dotenv.config();

/**
 * Script to list all existing products in the marketplace
 * This makes all farmer products visible to customers and other farmers
 */
async function listAllProducts() {
  try {
    const URI = getMongoUri();

    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");

    // Update all products to be listed and available
    const result = await Product.updateMany(
      {}, // Update all products
      {
        $set: {
          isListed: true,
          status: "available"
        }
      }
    );

    console.log(`\n✅ Updated ${result.modifiedCount} products`);
    console.log(`   - All products are now listed in the marketplace`);
    console.log(`   - All products are marked as available`);

    // Show summary
    const totalProducts = await Product.countDocuments();
    const listedProducts = await Product.countDocuments({ isListed: true });
    const availableProducts = await Product.countDocuments({ status: "available" });

    console.log(`\n📊 Summary:`);
    console.log(`   - Total products: ${totalProducts}`);
    console.log(`   - Listed products: ${listedProducts}`);
    console.log(`   - Available products: ${availableProducts}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error listing products:", error);
    process.exit(1);
  }
}

listAllProducts();
