"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './embarque.css'

export default function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [ativo, setAtivo] = useState(null);
  const router = useRouter();

  const toggle = (id) => {
    setAtivo(ativo === id ? null : id);
  };

  {/*BUSCA OS NOMES DAS ESCOLAS*/}
  useEffect(() => {
    async function fetchEscolas() {
      try {
        const response = await fetch("http://localhost:3001/alunosMensagem", {
          credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar as escolas');
      }
      const data = await response.json();
      setEscolas(data.escolas);
    } catch (error) {
      console.error('Erro:', error.message);
    }}
 fetchEscolas();
}, []);

  return (
    <section className="informacoes">
      <div className="div-section">
        <div className="page-indicador">
          <h1>Passageiros</h1>
          <hr />
        </div>
        <div className="cont-escolas flex flex-col gap-8 justify-items-center justify-self-center self-center">
          {/*ESCOLAS*/}
          {escolas.map((escola, index) => (
            <div key={index} className="cont-escolas bg-[#fff] rounded-[2vw] border-b border-slate-200" >
              <div className="cont-escolas flex items-center">
                
                <button
                  onClick={() => toggle(escola.escola_id)}
                  className="conteudo-card w-full flex justify-between items-center py-5 text-slate-800"
                >
                  <span className="flex flex-col gap-3 items-start texto-card">
                    <h3>{escola.escola_nome}</h3>
                    <p>{escola.escola_endereco}</p>
                  </span>
                  <div className="ver-mais items-center">
                    Ver Alunos <span
                    className={`text-slate-800 transition-transform duration-300 ${ativo === escola.escola_id ? 'rotate-180' : ''
                      }`}>
                    {/* Ícone para cima/baixo */}
                    <svg className='drop' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                  </span>
                  </div>
                </button>
              </div>
              {/* Conteúdo escondido */}
              <div
                className={`container-escondido overflow-hidden transition-all duration-500 ease-in-out ${
                  ativo === escola.escola_id ? "max-h-500" : "max-h-0"
                }`}>
                  {/*ALUNOS DE CADA ESCOLA*/}
                <div className="conteudo-escondido pb-5 text-sm text-slate-500">
                  <h3>Alunos da Escola</h3>
                  <hr />
                  {escola.alunos.length === 0 ? (
                    <p className="py-3">Nenhum aluno registrado para esta escola.</p>
                  ) : (
                    escola.alunos.map((aluno) => (
                      <div key={aluno.aluno_id} className="informacoes-aluno">
                        <div className="info flex justify-between items-center">
                          <p>{aluno.aluno_nome}</p><p>{aluno.aluno_email}</p>
                        </div>
                        <hr/>
                      </div>))
                  )} </div>
              </div> </div>
          ))} </div>
      </div> </section>
  );}
