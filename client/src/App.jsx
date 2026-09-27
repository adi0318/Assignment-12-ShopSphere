import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },

  // Default route
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },

  // Optional fallback
  {
    path: "*",
    element: <Navigate to="/products" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

