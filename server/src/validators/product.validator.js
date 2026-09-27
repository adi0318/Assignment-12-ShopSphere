import { body, param } from "express-validator";

const createProductValidator = [ 
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters long"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Product description must be at least 10 characters long"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Product name must be at least 2 characters long"),

    body("description")
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage(
            "Product description must be at least 10 characters long"
        ),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a valid positive number"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body().custom((body) => {
        const fields = [
            "name",
            "description",
            "price",
            "category",
            "stock",
        ];

        const hasField = fields.some(
            (field) => body[field] !== undefined
        );

        if (!hasField) {
            throw new Error(
                "At least one product field is required for update"
            );
        }

        return true;
    }),
];

const productIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid product ID"),
];

export { createProductValidator, updateProductValidator, productIdValidator };
