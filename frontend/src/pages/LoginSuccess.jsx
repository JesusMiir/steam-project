import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        const fetchUser = async () => {
            try {
                if (token) {
                    localStorage.setItem("token", token);

                    const res = await axios.get("http://localhost:3000/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const user = res.data;
                    localStorage.setItem("user", JSON.stringify(user)); // opcional
                    console.log("Usuario logueado:", user);

                    navigate("/"); // redirigir a la página principal
                }
            } catch (err) {
                console.error("Error al obtener usuario:", err);
                navigate("/login"); // redirige si hay error
            }
        };

        fetchUser();
    }, [location, navigate]);

    return <p>Procesando inicio de sesión...</p>;
};

export default LoginSuccess;
