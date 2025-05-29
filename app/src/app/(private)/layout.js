
"use client"
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PrivateLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) {
      router.replace("/login");
    } else {
      const userObj = JSON.parse(user);
      const tipoNaRota = pathname.split("/")[1]; // Ex: 'administrador', 'aluno'
      if ( userObj.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== 
      tipoNaRota.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
        router.replace("/login");
      } else {
        setUsuario(userObj);
      }
    }
    setTimeout(() => setCarregando(false), 200);
  }, [pathname]);

  if (carregando || !usuario) {
    return (
      <div className="loading-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <>
      {children}
    </>
  );
}
