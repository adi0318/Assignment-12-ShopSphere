import { validationResult } from "express-validator";
import productModel from "../models/product.model.js";

/**
 * @description Creating a product
 */

const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, description, price, category, stock } = req.body;

  try {
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      seller: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Create product error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @description getting all products
 */

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Get products error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @description getting a single product
 */

const getProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("Get product error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @description Updating a product
 */

const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { name, description, price, category, stock } = req.body;

    if (name !== undefined) {
      product.name = name;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Update product error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * @description Deleting a product
 */

const deleteProduct = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await productModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Delete product error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };