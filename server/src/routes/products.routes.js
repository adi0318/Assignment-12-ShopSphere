import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "../validators/product.validator.js";

const router = express.Router();

/**
 * @POST /api/products/
 * Create product
 */

router.post("/", authenticate, createProductValidator, createProduct);

/**
 * @GET /api/product/
 * Get all products
 */
router.get("/", getProducts);

/**
 * @GET /api/product/:id
 * Get single product
 */
router.get("/:id", productIdValidator, getProduct);

/**
 * @PUT /api/product/:id
 */
router.put(
  "/:id",
  authenticate,
  productIdValidator,
  updateProductValidator,
  updateProduct
);

/**
 * @DELETE /api/product/:id
 */
router.delete("/:id", authenticate, productIdValidator, deleteProduct);

export default router;
