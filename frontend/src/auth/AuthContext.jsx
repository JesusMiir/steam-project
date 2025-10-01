import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshAuth = async () => {
        try {
            const res = await fetch('/auth/me', { credentials: 'include' });
            if (!res.ok) {
                setUser(null);
                return false;
            }
            const data = await res.json();
            setUser(data);
            return true;
        } catch {
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const role = (user?.role ?? 'guest').toLowerCase();

    return (
        <AuthCtx.Provider value={{ user, role, loading, refreshAuth, setUser }}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);
