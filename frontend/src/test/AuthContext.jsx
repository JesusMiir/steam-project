// src/auth/AuthContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext({
    user: null,
    role: "guest",
    loading: false,
    logoutLocal: () => { },
});

export function AuthProvider({ children }) {
    // si ya tienes un provider en otro archivo, mantén tu lógica real aquí
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("guest");
    const [loading, setLoading] = useState(false);

    const logoutLocal = () => {
        setUser(null);
        setRole("guest");
    };

    const value = useMemo(
        () => ({ user, role, loading, logoutLocal }),
        [user, role, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
