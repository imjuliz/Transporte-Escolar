"use client";
import React, { useState, useEffect } from "react";
import "./notificacoes.css";

export default function Notificacoes() {
    const [mensagens, setMensagens] = useState([]);
    const [ativo, setAtivo] = useState(null);

    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const res = await fetch("http://localhost:3001/notificacoes", {
                    credentials: "include"
                });
                const dados = await res.json();

                if (Array.isArray(dados)) {
                    setMensagens(dados);
                } else {
                    console.error("Resposta da API não é um array:", dados);
                    setMensagens([]);
                }
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
                setMensagens([]);
            }
        };

        fetchMensagens();
    }, []);

    const hoje = new Date().toLocaleDateString("sv-SE");

    const mensagensHoje = mensagens.filter(
        (msg) => msg.data_envio?.split("T")[0] === hoje
    );

    const mensagensAntigas = mensagens.filter(
        (msg) => msg.data_envio?.split("T")[0] !== hoje
    );


    const toggle = (identificadorUnico) => {
        setAtivo(ativo === identificadorUnico ? null : identificadorUnico);
    };

    const renderMensagem = (msg, index) => {
        const identificadorUnico = `${msg.id}-${msg.data_envio}-${index}`;
        return (
            <div className="container-viagem" key={identificadorUnico}>
                <div className="flex items-center gap-5">
                    <div className="bolinha">
                        <svg width="10" height="10" viewBox="0 0 10 10">
                            <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity="0.48" />
                        </svg>
                    </div>
                    <img className="foto-aluno" src="/img/padrao.jpg" alt={msg.aluno_nome} />
                    <button
                        onClick={() => toggle(identificadorUnico)}
                        className="conteudo-card w-full flex justify-between items-center"
                    >
                        <span className="textos text-start">
                            <h3>{msg.tipo || "Mensagem"}</h3>
                            <p className="text-sm text-slate-500">De: {msg.responsavel_nome} - Aluno: {msg.aluno_nome}</p>
                        </span>
                        <div className="ver-mais items-center">
                            Ver Mais
                            <span
                                className={`transition-transform duration-300 ${ativo === identificadorUnico ? "rotate-180" : ""
                                    }`}
                            >
                                <svg className="drop" viewBox="0 0 320 512">
                                    <path
                                        fill="#ffffff"
                                        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 
                                            11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 
                                            192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 
                                            25.7 6.9 34.9l128 128z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${ativo === identificadorUnico ? "max-h-500" : "max-h-0"
                        }`}
                >
                    <div className="conteudo-escondido pt-5 text-sm text-slate-500">
                        <p>{msg.conteudo || "Sem detalhes adicionais."}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="navegacao">
            <div className="page-indicador">
                <h1>Notificações</h1>
                <hr />
            </div>

            <div className="flex flex-column">
                {mensagensHoje.length > 0 && (
                    <div className="today days">
                        <h2>Hoje</h2>
                        {mensagensHoje.map(renderMensagem)}
                    </div>
                )}
                {mensagensAntigas.length > 0 && (
                    <div className="mounth days">
                        <h2>Esse Mês</h2>
                        {mensagensAntigas.map(renderMensagem)}
                    </div>
                )}
            </div>
        </section>
    );
}
