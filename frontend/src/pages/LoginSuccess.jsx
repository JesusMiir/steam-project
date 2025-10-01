import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function LoginSuccess() {
    const [params] = useSearchParams();
    const { refreshAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            localStorage.setItem("token", token);
            localStorage.removeItem("user");
            refreshAuth().then(() => navigate("/"));
        } else {
            navigate("/login");
        }
    }, [params, refreshAuth, navigate]);

    return <div>Iniciando sesión…</div>;
}
