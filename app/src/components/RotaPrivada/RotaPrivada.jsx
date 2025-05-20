"use client";
// protegendo as rotas no cliente. enquanto o next nao renderizar, ele esconde a pagina 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RotaPrivada({ children }) {
  const router = useRouter();

const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  } else {
    setLoading(false);
  }
}, []);

if (loading) return null; // ou um spinner
return <>{children}</>;
}