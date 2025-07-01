import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { isTokenActive, getUserToken } from "../utils";
import { Logout } from "../services/api/user/logoutServices";

export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = isTokenActive();

  useEffect(() => {
    const isDeletedSession = async () => {
      try {
        if (!isAuthenticated) {
          const token = getUserToken();
          if (token) {
            await Logout(token);
            localStorage.removeItem("userToken");
            toast.info("Tu sesión ha expirado, por favor inicia sesión nuevamente.");
          }
        }
      } catch (error) {
        
      }
    };

    isDeletedSession();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
