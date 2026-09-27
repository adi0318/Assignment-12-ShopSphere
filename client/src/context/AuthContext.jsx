import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.accessToken;

    localStorage.setItem("accessToken", token);
    setAccessToken(token);

    await getMe();
  };

  const getMe = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("accessToken");
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");

      setAccessToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMe();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
