import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/auth/me', { credentials: 'include' })
            .then(r => (r.ok ? r.json() : null))
            .then(data => setUser(data))
            .finally(() => setLoading(false));
    }, []);

    const role = user?.role ?? 'guest';

    return <AuthCtx.Provider value={{ user, role, loading, setUser }}>
        {children}
    </AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
