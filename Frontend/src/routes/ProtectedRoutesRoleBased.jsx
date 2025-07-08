import { Navigate } from "react-router-dom";
import { getUserRoleFromToken } from "../utils";

export const RoleBasedRoute = ({ children, allowedRoles }) => {

    const userRole = getUserRoleFromToken();
    
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/Dashboard" replace />;
    }
    
    return children;
};
