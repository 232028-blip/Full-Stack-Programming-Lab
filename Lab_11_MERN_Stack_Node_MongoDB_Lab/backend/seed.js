require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

const seedProducts = async () => {
  await connectDB();

  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);

    console.log(`${createdProducts.length} products inserted successfully.`);
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
