import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "./AuthProvider";

export default function AuthBridge() {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { setUser, refreshAuth } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        const run = async () => {
            if (!isAuthenticated) {
                setUser(null);
                return;
            }

            try {
                const token = await getAccessTokenSilently();
                await fetch("/auth/exchange", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: "include",
                });
                await refreshAuth();
            } catch (e) {
                setUser(null);
            }
        };

        run();
    }, [isAuthenticated, isLoading, getAccessTokenSilently, setUser, refreshAuth]);

    return null;
}
