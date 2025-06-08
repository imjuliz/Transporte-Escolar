// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import MapaViagemResponsavel from "../../../../components/Mapa/MapaResponsavel.jsx";
// import '../styles/rotas.css'

// export default function RotaResponsavel() {
//   const router = useRouter();

//   const [dadosViagem, setDadosViagem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [usuarioLogado, setUsuarioLogado] = useState(null);
//   const [carregando, setCarregando] = useState(true);

//   useEffect(() => {
//     async function checarSessao() {
//       try {
//         const res = await fetch("http://localhost:3001/validar-sessao", {
//           credentials: "include",
//         });
//         if (res.ok) {
//           setUsuarioLogado(true);
//         } else {
//           setUsuarioLogado(false);
//           router.push("/login");
//         }
//       } catch (error) {
//         console.error("Erro ao validar sessão:", error);
//         setUsuarioLogado(false);
//         router.push("/login");
//       } finally {
//         setCarregando(false);
//       }
//     }
//     checarSessao();
//   }, [router]);

//   useEffect(() => {
//     fetch("http://localhost:3001/viagem-mapa", {
//       method: "GET",
//       credentials: "include",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Erro ao buscar dados");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Resposta da API /viagem-mapa:", data);
//         setDadosViagem(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading || carregando) return <p>Carregando dados da viagem...</p>;
//   if (error) return <p>Erro: {error}</p>;
//   if (!dadosViagem || !Array.isArray(dadosViagem.dados) || dadosViagem.dados.length === 0)
//     return <p>Nenhuma viagem ativa no momento.</p>;

//   return (
//     <section className="relative w-screen">
//       <MapaViagemResponsavel
//         dados={{
//           origem: dadosViagem.dados[0].pontoInicial,
//           destino: dadosViagem.dados[0].pontoFinal,
//         }}
//       />

//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
        // Espera-se que data.infoFilhos seja o array dos filhos com suas viagens
        if (!data.infoFilhos || data.infoFilhos.length === 0) {
          setError("Nenhuma viagem ativa no momento.");
        } else {
          setInfoFilhos(data.infoFilhos);
          setFilhoSelecionado(data.infoFilhos[0].id_aluno || data.infoFilhos[0].alunoId); // use o que bater
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading || carregando) return <p>Carregando dados da viagem...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!infoFilhos) return <p>Nenhum dado encontrado.</p>;

  // Filtra o filho selecionado
  const filhoAtual = infoFilhos.find((f) => f.id_aluno === filhoSelecionado);

  // Pega a primeira viagem ativa do filho para mostrar no mapa (ajuste conforme quiser)
  const viagem = filhoAtual?.viagens?.[0];

  // Dados para o mapa: tem que conter pontoInicial e pontoFinal no seu backend para cada viagem
  // Se não tiver, adapte conforme seu retorno do backend
  const dadosMapa = viagem
    ? {
      origem: filhoAtual.pontoInicial || filhoAtual.viagens[0].pontoInicial, // ajustar conforme seu dado
      destino: filhoAtual.pontoFinal || filhoAtual.viagens[0].pontoFinal,
    }
    : null;

  return (
    <section className="relative w-screen">
  {infoFilhos.length > 1 && (
    <nav className="flex gap-x-1 --prevent-on-load-init" role="tablist">
      <div className="mb-4 inline-flex gap-x-1">
        {infoFilhos.map((filho) => {
          const key = filho.id_aluno ?? filho.alunoId ?? filho.nome_aluno;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilhoSelecionado(filho.id_aluno ?? filho.alunoId)}
              className={`
                py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm rounded-full 
                text-gray-500 hover:text-gray-800
                focus:outline-hidden focus:text-gray-800
                dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200
                disabled:opacity-50 disabled:pointer-events-none
                ${filhoSelecionado === (filho.id_aluno ?? filho.alunoId)
                  ? "hs-tab-active:bg-gray-100 hs-tab-active:hover:bg-gray-100 hs-tab-active:focus:bg-gray-100 hs-tab-active:text-gray-800 dark:hs-tab-active:bg-neutral-700 dark:hs-tab-active:focus:bg-neutral-700 dark:hs-tab-active:hover:bg-neutral-700 dark:hs-tab-active:text-neutral-200 active"
                  : ""}
              `}
              role="tab"
              aria-selected={filhoSelecionado === (filho.id_aluno ?? filho.alunoId)}
              data-hs-tab={filho.nome_aluno || filho.nome || "tab"}
            >
              {filho.nome_aluno}
            </button>
          );
        })}
      </div>
    </nav>
  )}

  {dadosMapa ? (
    <div style={{ height: "100%", width: "100%" }}>
      <MapaViagemResponsavel dados={dadosMapa} />
    </div>
  ) : (
    <p>Nenhuma viagem ativa para este filho no momento.</p>
  )}
</section>

  );
}
