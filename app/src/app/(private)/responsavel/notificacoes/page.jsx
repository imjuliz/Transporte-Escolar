"use client";
import Image from 'next/image'
import '../styles/notificacoes.css'
import React, { useState } from 'react'

const notificacoesHoje = [

    //logica para receber as notificações de cada aluno, incluindo o tipo, a hora que foi enviada,  a mensagem e as informações adicionais

    {
        id: 1,
        aluno: ({
            nome: 'Enzo',
            img: '/img/menino.jpg'
        }),
        tipo: ({
            titulo: 'Congestionamento',
            msg: 'Pode ser que o desembarque de Enzo atraze alguns minutos.'
        }),
        infos: 'Congestionamento na Avenida Lauro Gomes devido a um acidente, atrazo de aproximadamente 15 minutos'
    },
    {
        id: 2,
        aluno: ({
            nome: 'Sofia',
            img: '/img/menina2.jpg'
        }),
        tipo: ({
            titulo: 'Mudança de Rota',
            msg: 'Houve uma mudança de rota no trajeto de ida para a escola.'
        }),
         infos: 'Mudança de rota devido as reformas na Avenida Lions, foi feito um retorno e o ônibus seguiu para a rota da Avenida Vergueiro.'
    }
]

const notificacoesAntigas = [
    {
        id: 3,
        aluno: ({
            nome: 'Enzo',
            img: '/img/menino.jpg'
        }),
        tipo: ({
            titulo: 'Congestionamento',
            msg: 'Pode ser que o desembarque de Enzo atraze alguns minutos.'
        }),
        infos: 'Congestionamento na Avenida Lauro Gomes devido a um acidente, atrazo de aproximadamente 15 minutos'
    },
    {
        id: 4,
        aluno: ({
            nome: 'Sofia',
            img: '/img/menina2.jpg'
        }),
        tipo: ({
            titulo: 'Mudança de Rota',
            msg: 'Houve uma mudança de rota no trajeto de ida para a escola.'
        }),
         infos: 'Mudança de rota devido as reformas na Avenida Lions, foi feito um retorno e o ônibus seguiu para a rota da Avenida Vergueiro.'
    }

]





export default function notificacoes() {
    //logica para receber as notificações de cada aluno


    const [ativo, setAtivo] = useState(null)

    const toggle = (id) => {
        setAtivo(ativo === id ? null : id)
    }


    return (
        <>
            <section className='navegacao'>

                <div className='page-indicador'>
                    <h1>Notificações</h1>
                    <hr />
                </div>

                {/**notificacoes de hoje */}
                <div className='flex flex-column'>
                    <div className='today days'>
                        <h2>Hoje</h2>
                        {notificacoesHoje.map(({ id, aluno, tipo, infos}) => (
                            <div className='container-viagem ' key={id}>
                                <div className='flex items-center gap-5'>

                                    <div className='bolinha'>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity="0.48" />
                                        </svg>
                                    </div>

                                    <img className='foto-aluno' src={aluno.img}></img>

                                    <button
                                        onClick={() => toggle(id)}
                                        className="conteudo-card w-full flex justify-between items-center "
                                    >
                                        <span className='textos text-start'>
                                            <h3>{tipo.titulo}</h3>
                                            <p>{tipo.msg}</p>
                                        </span>
                                        <div className='ver-mais items-center'> Ver Mais

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
                                        }`}>
                                    <div className="conteudo-escondido pt-5 text-sm text-slate-500">
                                        <p>{infos}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    {/**notificacoes antigas */}
                    <div className='mounth days'>

                    <h2>Esse Mês</h2>
                        {notificacoesAntigas.map(({ id, aluno, tipo, infos}) => (
                            <div className='container-viagem ' key={id}>
                                <div className='flex items-center gap-5'>

                                    <div className='bolinha'>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity="0.48" />
                                        </svg>
                                    </div>

                                    <img className='foto-aluno' src={aluno.img}></img>

                                    <button
                                        onClick={() => toggle(id)}
                                        className="conteudo-card w-full flex justify-between items-center "
                                    >
                                        <span className='textos text-start'>
                                            <h3>{tipo.titulo}</h3>
                                            <p>{tipo.msg}</p>
                                        </span>
                                        <div className='ver-mais items-center'> Ver Mais

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
                                        }`}>
                                    <div className="conteudo-escondido pt-5 text-sm text-slate-500">
                                        <p>{infos}</p>
                                    </div>

                                </div>
                            </div>
                        ))}

                        
                    </div>
                </div>

            </section>





        </>
    )
}