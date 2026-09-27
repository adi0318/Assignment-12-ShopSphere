import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LogOut, Package, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoggingOut(false);
    }
  };

  const isProductsPage = location.pathname === "/products";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
      
        <Link
          to="/products"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
            S
          </div>

          <span className="text-lg font-bold tracking-tight text-white">
            ShopSphere
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/products"
            className={`hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:flex ${
              isProductsPage
                ? "bg-slate-800/70 text-white"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Package size={16} />

            Products
          </Link>

          {user && (
            <>
              {/* User */}
              <div className="hidden items-center gap-3 border-l border-slate-800 pl-5 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                  <User size={16} className="text-slate-400" />
                </div>

                <div className="leading-tight">
                  <p className="text-xs text-slate-500">
                    Welcome back
                  </p>

                  <p className="mt-0.5 max-w-32 truncate text-sm font-medium text-white">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 sm:hidden">
                <span className="text-sm font-semibold text-slate-300">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Logout"
                className="group flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />

                <span className="hidden sm:inline">
                  {loggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
