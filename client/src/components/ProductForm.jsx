import { useEffect, useState } from "react";
import {
  Package,
  FileText,
  IndianRupee,
  Boxes,
  Tag,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";

import api from "../services/api";

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const isEditMode = !!product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        category: product.category || "",
        stock: product.stock ?? "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    }

    setErrors({});
    setMessage("");
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (message) {
      setMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});
    setMessage("");
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (isEditMode) {
        await api.put(`/products/${product._id}`, data);
        setMessage("Product updated successfully.");
      } else {
        await api.post("/products", data);
        setMessage("Product created successfully.");
      }

      onSuccess();
    } catch (error) {
      const responseData = error.response?.data;

      if (responseData?.errors) {
        const fieldErrors = {};

        responseData.errors.forEach((item) => {
          fieldErrors[item.path] = item.msg;
        });

        setErrors(fieldErrors);
      } else {
        setMessage(
          responseData?.message || "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field) => `
    w-full rounded-xl border bg-slate-950/70 py-3.5 text-sm text-white
    outline-none transition placeholder:text-slate-600
    ${
      errors[field]
        ? "border-red-500/50 focus:border-red-400"
        : "border-slate-800 focus:border-slate-500"
    }
  `;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl shadow-black/10 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800/70 px-6 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950">
            <Package size={18} className="text-slate-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update the details of your product."
                : "Add a new product to your inventory."}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
          aria-label="Close"
        >
          <X size={17} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-7">
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Product Name
            </label>

            <div className="relative">
              <Package
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`${inputClasses("name")} pl-11 pr-4`}
              />
            </div>

            {errors.name && (
              <p className="mt-2 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <span className="text-xs text-slate-600">
                {formData.description.length}/500
              </span>
            </div>

            <div className="relative">
              <FileText
                size={17}
                className="absolute left-3.5 top-4 text-slate-500"
              />

              <textarea
                id="description"
                name="description"
                rows="4"
                maxLength="500"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                className={`${inputClasses(
                  "description"
                )} resize-none px-11`}
              />
            </div>

            {errors.description && (
              <p className="mt-2 text-xs text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className={`${inputClasses("price")} pl-10 pr-4`}
                />
              </div>

              {errors.price && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Stock
              </label>

              <div className="relative">
                <Boxes
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className={`${inputClasses("stock")} pl-11 pr-4`}
                />
              </div>

              {errors.stock && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Category
            </label>

            <div className="relative">
              <Tag
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                className={`${inputClasses("category")} pl-11 pr-4`}
              />
            </div>

            {errors.category && (
              <p className="mt-2 text-xs text-red-400">
                {errors.category}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
            <CheckCircle2
              size={17}
              className="shrink-0 text-emerald-400"
            />

            <p className="text-sm text-emerald-400">
              {message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-800/70 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-slate-800 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {isEditMode ? "Update Product" : "Add Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

