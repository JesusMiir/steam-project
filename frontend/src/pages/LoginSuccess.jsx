import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginSuccess() {
    const nav = useNavigate();
    const { refreshAuth } = useAuth();

    useEffect(() => {
        (async () => {
            await refreshAuth();           // <- carga /auth/me y guarda en contexto
            nav("/", { replace: true });   // <- vuelve al Home
        })();
    }, [refreshAuth, nav]);

    return <p>Logging in...</p>;
}
