require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Lab 11 Ecommerce API is running",
    endpoints: ["/api/products", "/api/products/:id"]
  });
});

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
