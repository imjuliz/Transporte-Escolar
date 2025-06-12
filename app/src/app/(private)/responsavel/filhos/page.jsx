"use client"
import React, { useState, useEffect } from 'react';
import '../styles/filhos.css';
import { useRouter } from 'next/navigation';

export default function filhos() {
  const router = useRouter();

  const [filhos, setFilhos] = useState([]);
  const [ativo, setAtivo] = useState(null)

  const toggle = (id) => {
    setAtivo(ativo === id ? null : id)
  }
  {/*DADOS DOS FILHOS DO BACK*/ }
  useEffect(() => {
    async function fetchFilhos() {
      try {
        const response = await fetch('http://localhost:3001/filhos', {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar os filhos');
        }
        const data = await response.json();
        setFilhos(data.infoFilhos);
      } catch (error) {
        console.error('Erro:', error.message);
      }
    }

    fetchFilhos();
  }, []);

  // formatação de telefone ao pegar o telefone do back
    const formatarTelefone = (telefone) => {
        if (!telefone) return " - ";
        telefone = telefone.replace(/\D/g, "").slice(0, 11);
        telefone = telefone.replace(/^(\d{2})(\d)/, "($1)$2");
        telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
        return telefone;
    };

  return (
    <section className='informacoes'>
      <div className='page-indicador'>
        <h1>Informações dos filhos</h1>
        <hr />
      </div>
      <div className="justify-items-center mt-10 ">
        {filhos.map((filho, index) => (
          <div key={filho.id_aluno} className="container-viagem bg-[#fff] rounded-[2vw] border-b border-slate-200">
            <div className='flex '>
              <button
                onClick={() => toggle(filho.id_aluno)}
                className="conteudo-card w-full flex justify-between items-center py-5 text-slate-800" >
                <span className='texto-card'>
                  <h3>{filho.nome_aluno}</h3>
                  <p>{filho.nome_escola}</p>
                </span>
                <div className='ver-mais items-center'> Ver Informações
                  <span
                    className={`text-slate-800 transition-transform duration-300 ${ativo === filho.id_aluno ? 'rotate-180' : ''
                      }`} >
                    {/* Ícone para cima/baixo */}
                    <svg className='drop' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                  </span>
                </div>
              </button>
            </div>
            {/**Conteudo escondido */}
            <div className={`container-escondido overflow-hidden transition-all duration-500 ease-in-out ${ativo === filho.id_aluno ? 'max-h-500' : 'max-h-0'}`}>
              <div className="conteudo-escondido pb-5 text-sm text-slate-500">
                <h3>Informações do Aluno</h3>
                <hr></hr>
                {/*INFORMAÇÕES DOS ALUNOS*/}
                <div className='informacoes-aluno flex flex-column'>
                  <div className='info flex justify-between items-center'><p>Nome:</p><p className='align-right'>{filho.nome_aluno}</p></div><hr />
                  <div className='info flex justify-between items-center'><p>Idade:</p><p className='align-right'>{filho.idade}</p></div><hr />
                  <div className='info flex justify-between items-center'><p>Escola:</p><p className='align-right'>{filho.nome_escola}</p></div><hr />
                  <div className='info flex justify-between items-center'><p>Ponto de embarque:</p><p className='align-right'>{filho.endereco_embarque}</p></div><hr />
                  <div className='info flex justify-between items-center'><p>Rota:</p><p className='align-right'>Ida e volta</p></div>
                </div>
                {/**Colocar aqui o mapa da rota de cada aluno - linkar na const */}
                <h3 className='mt-4'>Informações do Motorista</h3><hr />
                <div className='informacoes-aluno flex flex-column'>
                  <div className='info flex justify-between items-center'><p>Nome:</p><p className='align-right'>{filho.viagens[0]?.nome_motorista}</p></div><hr />
                  <div className='info flex justify-between items-center'><p>Email:</p><p className='align-right'>{filho.viagens[0]?.email_motorista}</p></div>
                  <hr />
                  <div className='info flex justify-between items-center'><p>Telefone:</p><p className='align-right'>{formatarTelefone(filho.viagens[0]?.telefone_motorista)}</p></div>
                 </div>
              </div></div>
          </div>))}
      </div></section>
  )
}