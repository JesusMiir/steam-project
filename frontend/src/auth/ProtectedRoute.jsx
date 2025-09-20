import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { hasMinRole } from "./roles";

export default function ProtectedRoute({ minRole = "user", children }) {
    const { role, loading } = useAuth();
    const loc = useLocation();

    if (loading) return null; // opcional: spinner
    if (!hasMinRole(role, minRole)) {
        return <Navigate to="/login" state={{ from: loc }} replace />;
    }
    return children;
}
