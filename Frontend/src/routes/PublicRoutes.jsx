import { Navigate } from "react-router-dom";
import { isTokenActive } from "../utils";

export const PublicRoutes = ({ children }) => {
  const isAuthenticated = isTokenActive();
  if (isAuthenticated) {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
};
