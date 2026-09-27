import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

