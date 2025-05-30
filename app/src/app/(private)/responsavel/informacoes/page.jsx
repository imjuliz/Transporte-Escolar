"use client";
import React, { useState } from 'react';
import '../styles/infos2.css';
import '../../../globals.css';

const accordionData = [
  {
    id: 1,
    escola: 'ETEC Dona Carmim',
    img: '/img/menina2.jpg',
    nomeCompleto: 'Sofia Souza Oliveira',
    idade: '7',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: ({
      nome: 'Sônia Silva',
      img: '/img/motorista1.jpg',
    }),
    horaEmbarque: '6:30',
    horaDesembarque: '12:30'
  },
  {
    id: 2,
    escola: 'ETEC Dona Carmin',
    img: '/img/menina3.png',
    nomeCompleto: 'Ana Souza Oliveira',
    idade: '10',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: ({
      nome: 'Sônia Silva',
      img: '/img/motorista1.jpg',
    }),
    horaEmbarque: '6:30',
    horaDesembarque: '12:30'
  },
  {
    id: 3,
    escola: 'ETEC Dona Carmin',
    img: '/img/menino.jpg',
    nomeCompleto: 'Enzo Souza Oliveira',
    idade: '5',
    endereco: 'Rua Amazonas 47',
    rota: 'Ida e Volta',
    motorista: ({
      nome: 'Sônia Silva',
      img: '/img/motorista1.jpg',
    }),
    horaEmbarque: '6:30',
    horaDesembarque: '12:30'
  },
]

export default function Accordion() {
  const [ativo, setAtivo] = useState(null)

  const toggle = (id) => {
    setAtivo(ativo === id ? null : id)
  }

  return (
    <section className='informacoes'>
      <div className='page-indicador'>
        <h1>Informações</h1>
        <hr />
      </div>
      <div className="max-w-1000px justify-items-center mx-auto mt-10 md:w-10">
        {accordionData.map(({ id, escola, img, nomeCompleto, idade, endereco, rota, horaDesembarque, horaEmbarque, motorista }) => (
          <div key={id} className="container-viagem bg-[#fff] rounded-[2vw] border-b border-slate-200">
            <div className='flex '>
              <img className='foto-aluno object-cover rounded-l-[2vw]' src={img}></img>
              <button
                onClick={() => toggle(id)}
                className="conteudo-card w-full flex justify-between items-center py-5 text-slate-800"
              >
                <span className='texto-card'>
                  <h3>{nomeCompleto}</h3>
                  <p>{escola}</p>
                </span>
                <div className='ver-mais items-center'> Ver Informações
                  <span
                    className={`text-slate-800 transition-transform duration-300 ${ativo === id ? 'rotate-180' : ''
                      }`}
                  >
                    {/* Ícone para cima/baixo */}
                    <svg className='drop'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                  </span>
                </div>
              </button>
            </div>
            {/**Conteudo escondido */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${ativo === id ? 'max-h-500' : 'max-h-0'
                }`}
            >
              <div className="conteudo-escondido pb-5 text-sm text-slate-500">
                <h3>Informações do Aluno</h3>
                <hr></hr>
                <div className='informacoes-aluno flex flex-column'>
                  <div className='info flex justify-between items-center'><p>Nome:</p><p> {nomeCompleto}</p> </div><hr></hr>
                  <div className='info flex justify-between items-center'><p>Idade:</p><p> {idade}</p> </div><hr></hr>
                  <div className='info flex justify-between items-center'><p>Escola:</p><p> {escola}</p> </div><hr></hr>
                  <div className='info flex justify-between items-center'><p>Endereço:</p><p> {endereco}</p> </div><hr></hr>
                  <div className='info flex justify-between items-center'><p>Rota:</p><p> {rota}</p> </div><hr></hr>
                </div>

                <div className='cards-horario'>
                  <div className="card-hora bg-[#fffff] rounded-[1vw] ">
                    <h3>Horário de Embarque</h3>
                    <p>{horaEmbarque}</p>
                  </div>
                  <div className="card-hora bg-[#fffff] rounded-[1vw] ">
                    <h3>Horário de Desembarque</h3>
                    <p>{horaDesembarque}</p>
                  </div>
                </div>
                {/**Colocar aqui o mapa da rota de cada aluno - linkar na const */}
                <h3>Motorista</h3>
                <div className='info-motorista flex items-center gap-5 pt-3'>
                  <img className='img-motorista' src={motorista.img}></img>
                  <h3>{motorista.nome}</h3>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}