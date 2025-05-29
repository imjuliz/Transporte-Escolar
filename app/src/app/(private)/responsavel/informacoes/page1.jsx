"use client";
import Image from 'next/image'
import '../styles/informacoes.css'
import { useState } from 'react'

export default function informacoes() {
    //dos alunos, receber os dados que foram criados pelo administrador

    const alunos = [

        {
            id: 1,
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina2.jpg',
            infos: (
                <div className='infos-dropdown'>
                    <p>Conteudo Adicional</p>
                </div>
            )
        },
        {
            id: 2,
            nome: 'Ana',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina3.png',
            infos: (
                <div className='infos-dropdown'>
                    <p>Conteudo Adicional</p>
                </div>
            )
        },
        {
            id: 3,
            nome: 'Carla',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina.png',
            infos: (
                <div className='infos-dropdown'>
                    <p>Conteudo Adicional</p>
                </div>
            )
        }
    ]




    return (
        <>
        {/**usar collapse do bootstrap ou do tailwind no dropdown */}

            <section className='infos'>

                <div className='page-indicador'>
                    <h1>Informações</h1>
                    <hr />
                </div>

                <div className='cards-alunos justify-center'>

                    {alunos.map((aluno, index) =>

                        <div className='container-viagem flex  bg-[#fff] rounded-[2vw]  ' key={index} onClick={() => toggleCard(card.id)}>

                            <img className='foto-aluno object-cover rounded-l-[2vw]' src={aluno.img}></img>



                            <div className='titulo-status flex items-center '>

                                <div className='texto-card'>
                                    <h3>{aluno.nome}</h3>
                                    <p>{aluno.escola}</p>

                                </div>

                                <a><div className='status'> {/**receber os valores do status - receber a viagem e o status dela */}
                                    Ver Informações
                                    <svg className="dropdown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                                </div></a>

                            </div>

                           




                        </div>












                    )}


                </div>
            </section>

        </>
    )
}