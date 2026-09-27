import { useEffect, useState } from "react";
import { Plus, Package, RefreshCw } from "lucide-react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const { user, loading: authLoading } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProduct(null);

    await fetchProducts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const isLoading = authLoading || loading;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/2 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-slate-800/20 blur-3xl" />

        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-slate-800/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="flex flex-col gap-6 border-b border-slate-800/70 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
              <Package size={16} />

              <span>Product Management</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              {user?.name
                ? `Welcome back, ${user.name}. Manage and keep track of your products here.`
                : "Browse and manage all available products."}
            </p>
          </div>

          {user && !showForm && (
            <button
              onClick={handleAddProduct}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition hover:bg-slate-200 sm:w-auto"
            >
              <Plus
                size={18}
                className="transition-transform group-hover:rotate-90"
              />

              Add Product
            </button>
          )}
        </section>

        {/* Product form */}
        {showForm && user && (
          <section className="mt-8">
            <ProductForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </section>
        )}

        {!showForm && !isLoading && !error && products.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {products.length}
              </span>{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex min-h-87.5 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900">
                <RefreshCw
                  size={18}
                  className="animate-spin text-slate-400"
                />
              </div>

              <p className="text-sm text-slate-500">
                Loading products...
              </p>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-red-400">
                  Unable to load products
                </p>

                <p className="mt-1 text-sm text-red-400/70">
                  {error}
                </p>
              </div>

              <button
                onClick={fetchProducts}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="mt-8 flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
              <Package size={22} className="text-slate-500" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-white">
              No products yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              There are currently no products available. Add your
              first product to get started.
            </p>

            {user && !showForm && (
              <button
                onClick={handleAddProduct}
                className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                <Plus size={17} />
                Add Product
              </button>
            )}
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && products.length > 0 && (
          <section className="mt-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isAuthenticated={!!user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Products;

