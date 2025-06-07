"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MapaViagemResponsavel from "../../../../components/Mapa/MapaResponsavel.jsx";
import '../styles/rotas.css'

export default function RotaResponsavel() {
  const router = useRouter();

  const [dadosViagem, setDadosViagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function checarSessao() {
      try {
        const res = await fetch("http://localhost:3001/validar-sessao", {
          credentials: "include",
        });
        if (res.ok) {
          setUsuarioLogado(true);
        } else {
          setUsuarioLogado(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao validar sessão:", error);
        setUsuarioLogado(false);
        router.push("/login");
      } finally {
        setCarregando(false);
      }
    }
    checarSessao();
  }, [router]);

  useEffect(() => {
    fetch("http://localhost:3001/viagem-mapa", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((data) => {
        console.log("Resposta da API /viagem-mapa:", data);
        setDadosViagem(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading || carregando) return <p>Carregando dados da viagem...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!dadosViagem || !Array.isArray(dadosViagem.dados) || dadosViagem.dados.length === 0)
    return <p>Nenhuma viagem ativa no momento.</p>;

  return (
    <section className="relative w-screen">
      <MapaViagemResponsavel
        dados={{
          origem: dadosViagem.dados[0].pontoInicial,
          destino: dadosViagem.dados[0].pontoFinal,
        }}
      />

    </section>
  );
}
