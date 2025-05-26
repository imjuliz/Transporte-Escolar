"use client";
//import '../styles/informacoes.css'
import '../../../../styles/globals.css'
import React, { useState } from 'react'
import '../styles/infos2.css'

const accordionData = [
  {
    id: 1,
    escola: 'ETEC Dona Carmim',
    img: '/img/menina2.jpg',
    pergunta: 'What is Material Tailwind?',
    nomeCompleto: 'Sofia Souza Oliveira',
    idade: '7',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: 'Sônia '
  },
  {
    id: 2,
    escola: 'ETEC Dona Carmin',
    img: '/img/menina3.png',
    nomeCompleto: 'Ana Souza Oliveira',
    idade: '10',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: 'Sônia '

  },
  {
    id: 3,
    escola: 'ETEC Dona Carmin',
    img: '/img/menino.jpg',
    nomeCompleto: 'Enzo Souza Oliveira',
    idade: '5',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: 'Sônia '

  },
]

export default function Accordion() {
  const [ativo, setAtivo] = useState(null)

  const toggle = (id) => {
    setAtivo(ativo === id ? null : id)
  }

  return (
    <div className="max-w-1000px justify-items-center mx-auto mt-10">
      {accordionData.map(({ id, escola, img, resposta, nomeCompleto, idade, endereco, rota }) => (
        <div key={id} className="container-viagem bg-[#fff] rounded-[2vw] border-b border-slate-200">
          <div className='flex gap-5'>
            <img className='foto-aluno object-cover rounded-l-[2vw]' src={img}></img>
            <button
              onClick={() => toggle(id)}
              className="w-full flex justify-between items-center py-5 text-slate-800"
            >
              <span className='texto-card'>
                <h3>{nomeCompleto}</h3>
                <p>{escola}</p>
              </span>
              <div className='ver-mais'> Ver Informações
                <span
                  className={`text-slate-800 transition-transform duration-300 ${ativo === id ? 'rotate-180' : ''
                    }`}
                >
                  {/* Ícone seta para cima/baixo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#ffffff"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${ativo === id ? 'max-h-500' : 'max-h-0'
              }`}
          >
            <div className="conteudo-escondido pb-5 text-sm text-slate-500">
              <h3>Informações do Aluno</h3>
              <hr></hr>
              <div className='informacoes-aluno flex flex-column'></div>
              <div className='info flex justify-between items-center'><p>Nome:</p><p> {nomeCompleto}</p> </div><hr></hr>
              <div className='info flex justify-between items-center'><p>Idade:</p><p> {idade}</p> </div><hr></hr>
              <div className='info flex justify-between items-center'><p>Escola:</p><p> {escola}</p> </div><hr></hr>
              <div className='info flex justify-between items-center'><p>Endereço:</p><p> {endereco}</p> </div><hr></hr>
              <div className='info flex justify-between items-center'><p>Rota:</p><p> {rota}</p> </div><hr></hr>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}