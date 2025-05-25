"use client"
import "../../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrivateLayout({ children }) {
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("usuario");

        if (!user) {
            router.replace("/login"); // redireciona para o login
        } else {
            setUsuario(JSON.parse(user));
        }
        setTimeout(() => setCarregando(false), 200); // atraso p garantir que o estado atualize antes da renderização
    }, []);

    if (carregando || !usuario) {
        return (
            <div className="loading-screen">
                <p>Carregando...</p>
            </div>
        );
    }
}