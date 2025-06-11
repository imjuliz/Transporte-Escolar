"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import MapaViagemResponsavel from "../../../../components/Mapa/MapaResponsavel.jsx";
import '../styles/rotas.css'

export default function RotaResponsavel() {
  const router = useRouter();

  const [infoFilhos, setInfoFilhos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [filhoSelecionado, setFilhoSelecionado] = useState(null);

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
        if (!data.infoFilhos || data.infoFilhos.length === 0) {
          setError("Nenhuma viagem ativa no momento.");
        } else {
          setInfoFilhos(data.infoFilhos);
          setFilhoSelecionado(data.infoFilhos[0].id_aluno || data.infoFilhos[0].alunoId); 
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading || carregando) return <div className="w-screen h-screen justify-items-center content-center"><p>Carregando dados da viagem...</p></div>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!infoFilhos) return <p>Nenhum dado encontrado.</p>;

  // filtra o filho selecionado
  const filhoAtual = infoFilhos.find((f) => f.id_aluno === filhoSelecionado);

  // pega a primeira viagem ativa do filho p mostrar no mapa 
  const viagem = filhoAtual?.viagens?.[0];

  const dadosMapa = viagem
    ? {
      origem: filhoAtual.pontoInicial || filhoAtual.viagens[0].pontoInicial,
      destino: filhoAtual.pontoFinal || filhoAtual.viagens[0].pontoFinal,
    }
    : null;

  return (
    <section className="relative h-screen w-screen justify-items-center content-center">
      {infoFilhos.length > 1 && (
        <nav className="flex gap-x-1 --prevent-on-load-init mt-4 mb-4" role="tablist">
          {infoFilhos.map((filho) => {
            const key = filho.id_aluno ?? filho.alunoId ?? filho.nome_aluno;
            const isSelected = filhoSelecionado === (filho.id_aluno ?? filho.alunoId);
            return (
              <div
                key={key}
                onClick={() => setFilhoSelecionado(filho.id_aluno ?? filho.alunoId)}
                className={`
              py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm rounded-full
              text-gray-500 hover:text-gray-800
              focus:outline-hidden focus:text-gray-800
              disabled:opacity-50 disabled:pointer-events-none
              ${isSelected ?
                    "rounded-full bg-gray-100 text-gray-800"
                    : ""}
            `}
                role="tab"
                aria-selected={isSelected}
                data-hs-tab={filho.nome_aluno || filho.nome || "tab"}
              >
                {filho.nome_aluno}
              </div>
            );
          })}
        </nav>
      )}

      {dadosMapa ? (
        <div style={{ height: "100%", width: "100%" }}>
          <MapaViagemResponsavel dados={dadosMapa} />
        </div>
      ) : (
        <div className='flex flex-col gap-10 items-center justify-center'>
          <Image
            src="/img/semViagensAndamento.svg"
            width={600}
            height={400}
            alt="Menino e menina esparando ônibus"
            className='404-img'
          />
          <p className="">Não há nenhuma viagem em andamento.</p>
          <button className="btn-viagens">
            <a href='./viagens'>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="seta" >
              <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className='text-viagens text-[#fff] no-underline m-0'>Ver viagens</p>
            </a>
          </button>
        </div>
      )}
    </section>

  );
}
