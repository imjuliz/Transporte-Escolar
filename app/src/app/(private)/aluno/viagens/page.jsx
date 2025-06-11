// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';
// import MapaViagemResponsavel from "../../../../components/Mapa/MapaResponsavel.jsx";
// import '../styles/rotas.css'

// export default function RotaAluno() {
//   const router = useRouter();

//   const [infoFilhos, setInfoFilhos] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [usuarioLogado, setUsuarioLogado] = useState(null);
//   const [carregando, setCarregando] = useState(true);
//   const [filhoSelecionado, setFilhoSelecionado] = useState(null);

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
//         // Espera-se que data.infoFilhos seja o array dos filhos com suas viagens
//         if (!data.infoFilhos || data.infoFilhos.length === 0) {
//           setError("Nenhuma viagem ativa no momento.");
//         } else {
//           setInfoFilhos(data.infoFilhos);
//           setFilhoSelecionado(data.infoFilhos[0].id_aluno || data.infoFilhos[0].alunoId); // use o que bater
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading || carregando) return <p>Carregando dados da viagem...</p>;
//   if (error) return <p className="text-red-500">Erro: {error}</p>;
//   if (!infoFilhos) return <p>Nenhum dado encontrado.</p>;

//   // Filtra o filho selecionado
//   const filhoAtual = infoFilhos.find((f) => f.id_aluno === filhoSelecionado);

//   // Pega a primeira viagem ativa do filho para mostrar no mapa (ajuste conforme quiser)
//   const viagem = filhoAtual?.viagens?.[0];

//   // Dados para o mapa: tem que conter pontoInicial e pontoFinal no seu backend para cada viagem
//   // Se não tiver, adapte conforme seu retorno do backend
//   const dadosMapa = viagem
//     ? {
//       origem: filhoAtual.pontoInicial || filhoAtual.viagens[0].pontoInicial, // ajustar conforme seu dado
//       destino: filhoAtual.pontoFinal || filhoAtual.viagens[0].pontoFinal,
//     }: null;
//   return (
//     <section className="relative h-screen w-screen">
//       {infoFilhos.length > 1 && (
//         <nav className="flex gap-x-1 --prevent-on-load-init mt-4 mb-4" role="tablist">
//           {infoFilhos.map((filho) => {
//             const key = filho.id_aluno ?? filho.alunoId ?? filho.nome_aluno;
//             const isSelected = filhoSelecionado === (filho.id_aluno ?? filho.alunoId);
//             return (
//               <div
//                 key={key}
//                 onClick={() => setFilhoSelecionado(filho.id_aluno ?? filho.alunoId)}
//                 className={`
//               py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm rounded-full
//               text-gray-500 hover:text-gray-800
//               focus:outline-hidden focus:text-gray-800
//               dark:text-neutral-500
//               disabled:opacity-50 disabled:pointer-events-none
//               ${isSelected ?
//                     "rounded-full bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200"
//                     : ""} `}
//                 role="tab"
//                 aria-selected={isSelected}
//                 data-hs-tab={filho.nome_aluno || filho.nome || "tab"} >
//                 {filho.nome_aluno}
//               </div>
//             );})}
//         </nav>)}
//       {dadosMapa ? (
//         <div style={{ height: "100%", width: "100%" }}>
//           <MapaViagemResponsavel dados={dadosMapa} />
//         </div> ) : (
//         <div className='flex flex-col gap-10 items-center justify-center'>
//           <Image
//             src="/img/semViagensAndamento.svg"
//             width={600}
//             height={400}
//             alt="Menino e menina esparando ônibus"
//             className='404-img'/>
//           <p>Não há nenhuma viagem em andamento.</p>
//           <button className="btn-viagens" href='/responsavel/viagens'>
//             <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="seta" >
//               <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <p className='text-[#fff] no-underline m-0'>Ver viagens</p>
//           </button>
//         </div>)}
//     </section> );}
"use client";
import '../styles/rotas.css'
import { useRef, useEffect, useState } from "react";

export default function Viagens() {
  // busca dados do back
  const [viagens, setViagens] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('todos'); // Estado da aba ativa

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

  {/*CHAMA AS VIAGENS CADASTRTADAS PARA ESTE ALUNO*/}
  useEffect(() => {
    fetch("http://localhost:3001/viagem-mapa", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then((data) => {
        setViagens(data.infoViagens || []);
      })
      .catch((error) => {
        console.error('Erro ao carregar viagens do viagem:', error);
        setViagens([]);
      });
  }, []);

  // p deixar a primeira letra da primeira palavra em maiusculo
  function primeiraLetraMaiuscula(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Função para filtrar viagens pelo status conforme a aba
  function filtrarViagensPorAba(viagens, aba) {
    if (aba === 'todos') return viagens;
    if (aba === 'agendada') return viagens.filter(v => v.status.toLowerCase() === 'agendada');
    if (aba === 'em andamento') return viagens.filter(v => v.status.toLowerCase() === 'em andamento');
    if (aba === 'concluida') return viagens.filter(v => v.status.toLowerCase() === 'concluída');
    return viagens;
  }

  return (
    <section className="relative h-screen w-screen">
      {/*.MAP DAS VIAGENS*/}
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
              dark:text-neutral-500
              disabled:opacity-50 disabled:pointer-events-none
              ${isSelected ?
                    "rounded-full bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200"
                    : ""} `}
                role="tab"
                aria-selected={isSelected}
                data-hs-tab={filho.nome_aluno || filho.nome || "tab"} >
                {filho.nome_aluno}
              </div>
            );})}
        </nav>)}
      {dadosMapa ? (
        <div style={{ height: "100%", width: "100%" }}>
          <MapaViagemResponsavel dados={dadosMapa} />
        </div> ) : (
        <div className='flex flex-col gap-10 items-center justify-center'>
          <Image
            src="/img/semViagensAndamento.svg"
            width={600}
            height={400}
            alt="Menino e menina esparando ônibus"
            className='404-img'/>
          <p>Não há nenhuma viagem em andamento.</p>
          <button className="btn-viagens" href='/responsavel/viagens'>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="seta" >
              <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className='text-[#fff] no-underline m-0'>Ver viagens</p>
          </button>
        </div>)}
    </section> );}
