import { Edit3, Trash2, Package, Boxes } from "lucide-react";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  isAuthenticated,
}) => {
  return (
    <div className="group flex h-full min-h-71.25 flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/5 backdrop-blur-sm transition hover:border-slate-700 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
              <Package size={15} className="text-slate-400" />
            </div>

            <h2 className="truncate text-base font-semibold text-white">
              {product.name}
            </h2>
          </div>

          <p className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-400">
            {product.description || "No description available."}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-slate-700/80 bg-slate-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-400">
          {product.category}
        </span>
      </div>

      <div className="my-5 h-px bg-slate-800/80" />

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Price
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-white">
            ₹{product.price}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">
          <Boxes size={15} className="text-slate-500" />

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-600">
              Stock
            </p>

            <p className="text-sm font-semibold text-slate-300">
              {product.stock}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-5">
        {isAuthenticated ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/30 px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <Edit3 size={15} />
              Edit
            </button>

            <button
              onClick={() => onDelete(product._id)}
              className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/10"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        ) : (
          <div className="h-10.5" />
        )}
      </div>
    </div>
  );
};

export default ProductCard;

