// "use client";

// import { usePathname } from 'next/navigation';
// import { useRef, useEffect, useState } from "react";
// import Image from 'next/image'
// import '../../../globals.css';
// import './incidentes2.css'

// export default function incidentes() {

//     const incidentes = [
//         {
//             id: 1,
//             valor: 'congestionamento',
//             label: 'Congestionamento',
//             descricao: 'O embarque dos alunos irá atrazar alguns minutos',
//             backgroundColor: 'bg-[#DB3056]',
//             bgSelected: 'bg-rose-800',
// imagem: '/img/bolinhasVermelha.svg'
//         },
//         {
//             id: 2,
//             valor: 'rota',
//             label: 'Mudança de rota',
//             descricao: 'Ocorreu uma mudança de rota no trajeto',
//             backgroundColor: 'bg-[#76BF4C]',
//             bgSelected: 'bg-lime-600',
//             imagem: '/img/bolinhasVerde.svg'
//         },
//         {
//             id: 3,
//             valor: 'emergencia',
//             label: 'Emergência médica',
//             descricao: 'Um aluno passou mal no trajeto de ida/volta.',
//             backgroundColor: 'bg-[#0070E0]',
//             bgSelected: 'bg-blue-700',
//             imagem: '/img/bolinhasAzul.svg'
//         },
//         {
//             id: 4,
//             valor: 'veiculo',
//             label: 'Problema no veículo',
//             descricao: 'Ocorreu um problema mecânico no ônibus escolar.',
//             backgroundColor: 'bg-[#F88F01]',
//             bgSelected: 'bg-amber-600',
//             imagem: '/img/bolinhasAmarela.svg'
//         }
//     ];

//     const [selecionado, setSelecionado] = useState('falta'); //guarda a opção que está selecionada

//     const handleChange = (valor) => {
//         setSelecionado(valor); //atualiza a seleção
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = {};
//          try {
//             const response = await fetch('http://localhost:3001/enviarIncidente', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: /*JSON.stringify(formData)*/{
//                     remetente: req.session.usuario.email,
//                     tipo: selecionado,
//                     mensagem:form.mensagem
//                 },
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setResposta(JSON.stringify(data, null, 2));

//         } catch (error) {
//             console.error('Erro:', error);
//         }
//     };
//     //colocar aqui as lógicas de motorista enviar a mensagem, pode ser direto pro aluno ou para todos os alunos do ônibus da viagem

//     return (
//         <>
//             <section className='informacoes'>
//         <div className='page-indicador'>
//           <h1>Registrar Incidentes</h1>
//           <hr/>
//                 </div>

//                 <div className="p-4 space-y-4">
//                     <div className=" flex gap-4 justify-center">{/*grid grid-cols-2 justify-center items-center gap-4*/}
//                         {incidentes.map((incidente) => (
//                             <label
//                                 key={incidente.valor} //classe dinâmica que muda de acordo com a mensagem selecionada
//                                 className={`card-msg cursor-pointer text-white border ${incidente.backgroundColor} rounded-[2vw] transition-all text-left w-300px ${selecionado === incidente.valor
//                                     ? `selecionado ${incidente.bgSelected} text-white border-blue-700` //card selecionado - se (selecionado === valor da msg) for verdadeiro, aplica esse estilo
//                                     : `nao-selecionado  text-gray-800 hover:border-blue-400`//card não selecionado - se for falso, aplica esse estilo
//                                     }`}>
//                                 <input
//                                     type="radio"
//                                     name="motivo"
//                                     value={incidente.valor}
//                                     checked={selecionado === incidente.valor} //quando muda, atualiza o estado
//                                     onChange={() => handleChange(incidente.valor)}
//                                     className="hidden"/>
//                                 <h3>{incidente.label}</h3>
//                                 <p>{incidente.descricao}</p>
//                                 <img src={incidente.imagem} className='bolinhas'></img>
//                             </label>
//                         ))}
//                     </div>
// <form>
//                     <div className='pt-4 flex flex-column'>

//                         <p className="mt-4">
//                             <strong>Motivo selecionado:</strong> {selecionado}
//                         </p>

//                         <div className='enviar-msg'>
//                             <input name='mensagem' placeholder='Mensagem'></input>
//                         </div>

//                         <select className="py-3 mt-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-3">
//                             <option value="">Selecionar aluno</option>
//                             <option value="aluno1">Aluno 1</option>
//                             <option value="aluno2">Aluno 2</option>
//                             <option value="aluno3">Aluno 3</option>
//                             <option value="aluno4">Aluno 4</option>
//                         </select>
//                         <label htmlFor="checkbox ">
//                             <input type="checkbox" id="checkbox" className='todos' name="meuCheckbox"></input>
//                             Todos
//                         </label>
//                         <button type="submit" onSubmit={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mb-5 mt-4 hover:bg-blue-700 transition duration-300 ease">Enviar Mensagem</button>
//                     </div>
//                     </form>
//                 </div>
//             </section>
//         </>)}

"use client";

import React, { useState, useEffect } from "react";
import "../../../globals.css";
import '../mensagem/mensagens.css'

export default function incidentes() {

    const mensagens = [
        {
            id: 1,
            valor: 'congestionamento',
            label: 'Congestionamento',
            descricao: 'O embarque dos alunos irá atrazar alguns minutos',
            backgroundColor: 'bg-[#DB3056]',
            bgSelected: 'bg-rose-800',
            imagem: '/img/bolinhasVermelha.svg'
        },
        {
            id: 2,
            valor: 'rota',
            label: 'Mudança de rota',
            descricao: 'Ocorreu uma mudança de rota no trajeto',
            backgroundColor: 'bg-[#76BF4C]',
            bgSelected: 'bg-lime-600',
            imagem: '/img/bolinhasVerde.svg'
        },
        {
            id: 3,
            valor: 'emergencia',
            label: 'Emergência médica',
            descricao: 'Um aluno passou mal no trajeto de ida/volta.',
            backgroundColor: 'bg-[#0070E0]',
            bgSelected: 'bg-blue-700',
            imagem: '/img/bolinhasAzul.svg'
        },
        {
            id: 4,
            valor: 'veiculo',
            label: 'Problema no veículo',
            descricao: 'Ocorreu um problema mecânico no ônibus escolar.',
            backgroundColor: 'bg-[#F88F01]',
            bgSelected: 'bg-amber-600',
            imagem: '/img/bolinhasAmarela.svg'
        }
    ];

    // Estados
    const [selecionado, setSelecionado] = useState("falta");
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState("");
    const [textoMensagem, setTextoMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    // Buscar filhos no carregamento do componente
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const res = await fetch("http://localhost:3001/alunosMensagem", {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Erro ao buscar alunos");
                const data = await res.json();
                const alunosArray = data.escolas.flatMap(escola => escola.alunos);
                setAlunos(alunosArray);
            } catch (error) {
                console.error(error);
                alert("Erro ao carregar lista de alunos.");
            }
        };

        fetchAlunos();
    }, []);


    // Atualiza seleção de motivo
    const handleChange = (valor) => setSelecionado(valor);

    // Enviar mensagem ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!alunoSelecionado) {
            alert("Selecione um aluno.");
            return;
        }
        if (!textoMensagem.trim()) {
            alert("Digite uma mensagem.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/motoristaEnviarMensagem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    aluno_id: alunoSelecionado,
                    mensagem: textoMensagem,
                    motivo: selecionado,
                    // não envia motorista_id, pega do session no backend
                }),
            });

            if (res.ok) {
                alert("Mensagem enviada com sucesso!");
                setTextoMensagem("");
            } else {
                const data = await res.json();
                alert("Erro ao enviar mensagem: " + (data.erro || "Erro desconhecido"));
            }
        } catch (error) {
            alert("Erro ao enviar mensagem.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="informacoes">
                <div className="page-indicador">
                    <h1>Enviar Mensagem</h1>
                    <hr />
                </div>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">{/*grid grid-cols-2 justify-center items-center gap-4*/}
                            {mensagens.map((msg) => (
                                <label
                                    key={msg.valor}
                                    className={`card-msg cursor-pointer text-white border ${msg.backgroundColor} rounded-[2vw] transition-all text-left ${selecionado === msg.valor
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
                                required >
                                <option value="">Selecionar aluno</option>
                                {alunos.length > 0
                                    ? alunos.map((aluno) => (
                                        <option key={aluno.aluno_id} value={aluno.aluno_id}>
                                            Aluno: {aluno.aluno_nome} - Responsavel: {aluno.responsavel.responsavel_nome}
                                        </option>
                                    ))
                                    : (<><option disabled>Carregando...</option></>)}
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease"
                                disabled={loading} >
                                {loading ? "Enviando..." : "Enviar Mensagem"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>);
}

