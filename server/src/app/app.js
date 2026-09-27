import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes.js";
import productRoutes from "../routes/products.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://assignment-12-shop-sphere.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "ShopSphere API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
