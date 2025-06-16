import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
