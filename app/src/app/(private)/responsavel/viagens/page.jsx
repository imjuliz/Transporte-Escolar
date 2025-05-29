"use client";
import './viagens.css'
//import Footer from '../../../components/Footer/Footer.jsx'
import './teste.css'
import { usePathname } from 'next/navigation';
//import { useRef, useEffect, useState } from "react";

export default function Viagens() {
  const alunos = [
    {
      id: 1,
      nome: 'Sofia Souza',
      img: '/img/menina2.jpg',
      viagens: [
        {
          data: 'Hoje',
          tipo: 'Embarque de Saída',
          horaEmbarque: '12:30',
          horaSaída: '12:50',
          status: [{
            status: 'Em andamento',
            cor: 'FFC01D'
          }]
        },
        {
          data: 'Hoje',
          tipo: 'Embarque de Entrada',
          horaEmbarque: '6:30',
          horaSaída: '7:00',
          status: [{
            status: 'Concluído',
            cor: 'B7D046'
          }]
        },
        {
          data: 'Ontem',
          tipo: 'Embarque de Saída',
          horaEmbarque: '12:35',
          horaSaída: '12:57',
          status: [{
            status: 'Concluído',
            cor: 'B7D046'
          }]
        }]
    },
    {
      id: 2,
      nome: 'Ana Clara',
      img: '/img/menina2.jpg',
      viagens: [
        {
          data: 'Hoje',
          tipo: 'Embarque de Saída',
          horaEmbarque: '17:30',
          horaSaída: '17:40',
          status: [{
            status: 'Em andamento',
            cor: 'FFC01D'
          }]
        },
        {
          data: 'Hoje',
          tipo: 'Embarque de Entrada',
          horaEmbarque: '12:45',
          horaSaída: '13:05',
          status: [{
            status: 'Concluído',
            cor: 'B7D046'
          }]
        },
        {
          data: 'Ontem',
          tipo: 'Embarque de Saída',
          horaEmbarque: '17:25',
          horaSaída: '17:45',
          status: [{
            status: 'Concluído',
            cor: 'B7D046'
          }]
        }]
    }
  ]
  return (
    <>
      <section className='navegacao'>
        <div className='page-indicador'>
          <h1>Viagens</h1>
          <hr />
        </div>
        <div className='chrome'>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {alunos.map((aluno, id, index) => (
              <li className="nav-item" role="presentation" key={id}>
                <button className={`barrinha nav-link ${index === 0 ? 'active' : ''}`}
                  id={`tab-${aluno.id}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#content-${aluno.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`content-${aluno.id}`}
                  aria-selected={index === 0 ? 'true' : 'false'}
                >
                  <img src={aluno.img} alt="" className='fotodeperfil'/>
                  {aluno.nome}
                </button>
              </li>
            ))}
          </ul>
          {/**Conteudo das tabs */}
          <div className="conteudo tab-content" id="myTabContent">
            {alunos.map((aluno, id, index) => (
              <div
                key={id}
                className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                id={`content-${aluno.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${aluno.id}`}
              >
                {aluno.viagens.map((viagem, i) => (
                  <div key={i} className="container-viagem border ">
                    <div className='flex flex-row items-center'>
                                        <svg className='circle-t' width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill="#00B383" />
                                        </svg>
                                        <p className='mb-0 text-[#8F9BB3]'>{viagem.data}</p>
                                        <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3" />
                                        </svg>

                                        <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaSaída}</p>
                                    </div>
                                    <div className='titulo-status flex items-center justify-between'>

                                        <h3>{viagem.tipo}</h3>
                                        <div className='status'>
                                            Em andamento
                                        </div>

                                    </div>

                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}