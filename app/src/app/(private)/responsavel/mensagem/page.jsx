// "use client";

// import React, { useState, useEffect } from "react";
// import "../../../globals.css";
// import "../styles/mensagens.css";

// export default function EnviarMensagemResponsavel() {
//   const mensagens = [
//     {
//       id: 1,
//       valor: "condicao",
//       label: "Condições Especiais",
//       descricao: "Envie uma observação sobre o aluno para obter cuidados especiais",
//       backgroundColor: "bg-[#0070E0]",
//       bgSelected: "bg-blue-700",
//     },
//     {
//       id: 2,
//       valor: "obj",
//       label: "Objeto esquecido",
//       descricao: "O aluno esqueceu um objeto pessoal no ônibus",
//       backgroundColor: "bg-[#F88F01]",
//       bgSelected: "bg-amber-600",
//     },
//   ];

//   // Estados
//   const [selecionado, setSelecionado] = useState("falta");
//   const [filhos, setFilhos] = useState([]);
//   const [alunoSelecionado, setAlunoSelecionado] = useState("");
//   const [textoMensagem, setTextoMensagem] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Buscar filhos no carregamento do componente
// useEffect(() => {
//   const fetchFilhos = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/filhos", {
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Erro ao buscar filhos");
//       const data = await res.json();
//       setFilhos(data.infoFilhos);
//     } catch (error) {
//       console.error(error);
//       alert("Erro ao carregar lista de filhos.");
//     }
//   };

//   fetchFilhos();
// }, []);


//   // Atualiza seleção de motivo
//   const handleChange = (valor) => setSelecionado(valor);

//   // Enviar mensagem ao backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!alunoSelecionado) {
//       alert("Selecione um aluno.");
//       return;
//     }
//     if (!textoMensagem.trim()) {
//       alert("Digite uma mensagem.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3001/mensagensMotorista", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           aluno_id: alunoSelecionado,
//           mensagem: textoMensagem,
//           motivo: selecionado,
//           // não envia responsavel_id, pega do session no backend
//         }),
//       });

//       if (res.ok) {
//         alert("Mensagem enviada com sucesso!");
//         setTextoMensagem("");
//       } else {
//         const data = await res.json();
//         alert("Erro ao enviar mensagem: " + (data.erro || "Erro desconhecido"));
//       }
//     } catch (error) {
//       alert("Erro ao enviar mensagem.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <section className="informacoes">
//         <div className="page-indicador">
//           <h1>Enviar Mensagem</h1>
//           <hr />
//         </div>

//         <div className="p-4 space-y-4">
//           <form onSubmit={handleSubmit}>
//             <div className="box-motivos flex justify-between gap-4">{/*grid grid-cols-2 justify-center items-center gap-4*/}
//               {mensagens.map((msg) => (
//                 <label
//                   key={msg.valor}
//                   className={`card-msg cursor-pointer text-white border ${msg.backgroundColor} rounded-[2vw] transition-all text-left ${selecionado === msg.valor
//                       ? `selecionado ${msg.bgSelected} text-white border-blue-700`
//                       : `nao-selecionado  text-gray-800 hover:border-blue-400`
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name="motivo"
//                     value={msg.valor}
//                     checked={selecionado === msg.valor}
//                     onChange={() => handleChange(msg.valor)}
//                     className="hidden"
//                   />
//                   <h3>{msg.label}</h3>
//                   <p>{msg.descricao}</p>
//                 </label>
//               ))}
//             </div>

//             <div className="pt-4 flex flex-column">

//               <p className="mt-4">
//                 <strong>Motivo selecionado:</strong> {selecionado}
//               </p>

//               <div className="enviar-msg">
//                 <input
//                   name="mensagem"
//                   placeholder="Mensagem"
//                   value={textoMensagem}
//                   onChange={(e) => setTextoMensagem(e.target.value)}
//                 />
//               </div>

//               <select
//                 className="py-3 mt-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5"
//                 value={alunoSelecionado}
//                 onChange={(e) => setAlunoSelecionado(e.target.value)}
//                 required
//               >
//                 <option value="">Selecionar aluno</option>
//                 {filhos.length > 0
//                   ? filhos.map((filho) => (
//                     <option key={filho.id_aluno} value={filho.id_aluno}>
//                       {filho.nome_aluno} - {filho.nome_escola}
//                     </option>
//                   ))
//                   : (
//                     <>
//                       <option disabled>Carregando...</option>
//                     </>
//                   )}
//               </select>

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease"
//                 disabled={loading}
//               >
//                 {loading ? "Enviando..." : "Enviar Mensagem"}
//               </button>

//             </div>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import "../../../globals.css";
import "../styles/mensagens.css";

export default function EnviarMensagemResponsavel() {
  const mensagens = [
    {
      id: 1,
      valor: "condicao",
      label: "Condições Especiais",
      descricao: "Envie uma observação sobre o aluno para obter cuidados especiais",
      backgroundColor: "bg-[#0070E0]",
      bgSelected: "bg-blue-700",
    },
    {
      id: 2,
      valor: "obj",
      label: "Objeto esquecido",
      descricao: "O aluno esqueceu um objeto pessoal no ônibus",
      backgroundColor: "bg-[#F88F01]",
      bgSelected: "bg-amber-600",
    },
  ];

  const [selecionado, setSelecionado] = useState("falta");
  const [filhos, setFilhos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [textoMensagem, setTextoMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const fetchFilhos = async () => {
      try {
        const res = await fetch("http://localhost:3001/filhos", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar filhos");
        const data = await res.json();
        setFilhos(data.infoFilhos);
      } catch (error) {
        console.error(error);
        setMensagemStatus({ tipo: "erro", texto: "Erro ao carregar lista de filhos." });
      }
    };

    fetchFilhos();
  }, []);

  const handleChange = (valor) => setSelecionado(valor);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alunoSelecionado) {
      setMensagemStatus({ tipo: "erro", texto: "Selecione um aluno." });
      return;
    }
    if (!textoMensagem.trim()) {
      setMensagemStatus({ tipo: "erro", texto: "Digite uma mensagem." });
      return;
    }

    setLoading(true);
    setMensagemStatus({ tipo: "", texto: "" });

    try {
      const res = await fetch("http://localhost:3001/mensagensMotorista", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          aluno_id: alunoSelecionado,
          mensagem: textoMensagem,
          motivo: selecionado,
        }),
      });

      if (res.ok) {
        setMensagemStatus({ tipo: "sucesso", texto: "Mensagem enviada com sucesso!" });
        setTextoMensagem("");
      } else {
        const data = await res.json();
        setMensagemStatus({
          tipo: "erro",
          texto: "Erro ao enviar mensagem: " + (data.erro || "Erro desconhecido"),
        });
      }
    } catch (error) {
      setMensagemStatus({ tipo: "erro", texto: "Erro ao enviar mensagem." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="informacoes">
      <div className="page-indicador">
        <h1>Enviar Mensagem</h1>
        <hr />
      </div>

      <div className="p-4 space-y-4">

        <form onSubmit={handleSubmit}>
          <div className="box-motivos flex justify-between gap-4">
            {mensagens.map((msg) => (
              <label
                key={msg.valor}
                className={`card-msg cursor-pointer text-white border ${msg.backgroundColor} rounded-[2vw] transition-all text-left ${
                  selecionado === msg.valor
                    ? `selecionado ${msg.bgSelected} text-white border-blue-700`
                    : `nao-selecionado  text-gray-800 hover:border-blue-400`
                }`}
              >
                <input
                  type="radio"
                  name="motivo"
                  value={msg.valor}
                  checked={selecionado === msg.valor}
                  onChange={() => handleChange(msg.valor)}
                  className="hidden"
                />
                <h3>{msg.label}</h3>
                <p>{msg.descricao}</p>
              </label>
            ))}
          </div>

          <div className="pt-4 flex flex-column">
            <p className="mt-4">
              <strong>Motivo selecionado:</strong> {selecionado}
            </p>

            <div className="enviar-msg">
              <input
                name="mensagem"
                placeholder="Mensagem"
                value={textoMensagem}
                onChange={(e) => setTextoMensagem(e.target.value)}
              />
            </div>

            <select
              className="py-3 mt-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5"
              value={alunoSelecionado}
              onChange={(e) => setAlunoSelecionado(e.target.value)}
              required
            >
              <option value="">Selecionar aluno</option>
              {filhos.length > 0 ? (
                filhos.map((filho) => (
                  <option key={filho.id_aluno} value={filho.id_aluno}>
                    {filho.nome_aluno} - {filho.nome_escola}
                  </option>
                ))
              ) : (
                <option disabled>Carregando...</option>
              )}
            </select>
            { /* mensagem de erro ou sucesso */}
              {mensagemStatus.texto && (
          <div className={`p-3 rounded-md text-white mb-4`}><p className='msg-status'>{mensagemStatus.texto}</p>
          </div>
        )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
