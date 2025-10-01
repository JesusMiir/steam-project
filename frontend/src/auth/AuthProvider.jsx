import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        // hidrata rápido desde localStorage al cargar
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });
    const [loading, setLoading] = useState(true);

    const refreshAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                return false;
            }

            const res = await fetch(`${API}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setUser(null);
                return false;
            }

            const data = await res.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            return true;
        } catch (err) {
            console.error("refreshAuth error:", err);
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const role = (user?.role ?? "guest").toLowerCase();

    const logoutLocal = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthCtx.Provider
            value={{ user, role, loading, refreshAuth, setUser, logoutLocal }}
        >
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);
