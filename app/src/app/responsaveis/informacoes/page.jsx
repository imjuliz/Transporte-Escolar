"use client";
import { Kings } from 'next/font/google';
import Image from 'next/image'
import '../styles/informacoes.css'
import '../../../styles/globals.css'

export default function viagens() {

    //dos alunos, receber os dados que foram criados pelo administrador

    const alunos = [

        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina2.jpg'
        },
        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina3.png'
        },
        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menino.jpg'
        }
    ]
    return (
        <>

            <section className='infos'>

                <div className='page-indicador'>
                    <h1>Informações</h1>
                    <hr />
                </div>

                <div className='cards-alunos justify-center'>

                    {/*<a href="" className="aluno-card no-underline text-inherit flex flex-col items-center bg-white border border-gray-200 rounded-[2vw] shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className=" object-cover w-full rounded-l-[2vw] h-96 md:h-auto md:w-48  " src="/img/menino.jpg" alt=""></img>
                        <div className="no-underline flex flex-col justify-between p-4 leading-normal">
                            <h5 className="no-underline text-inherit mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enzo Souza</h5>
                            <p className="no-underline mb-3 font-normal text-gray-700 dark:text-gray-400">ETEC Dona Carmem</p>
                        </div>
                    </a>

                    <a href="" className="aluno-card no-underline text-inherit flex flex-col items-center bg-white border border-gray-200 rounded-[2vw] shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className="no-underline object-cover w-full rounded-l-[2vw] h-96 md:h-auto md:w-48  " src="/img/menino.jpg" alt=""></img>
                        <div className="no-underline flex flex-col justify-between p-4 leading-normal">
                            <h5 className="no-underline text-inherit mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enzo Souza</h5>
                            <p className="no-underline mb-3 font-normal text-gray-700 dark:text-gray-400">ETEC Dona Carmem</p>
                        </div>
                    </a>*/}

                    <div className='container-viagem flex  justify-between  bg-[#fff] rounded-[2vw] '>


                        <div className='conteudo-card flex gap-5'>
                            <img className='foto-aluno object-cover rounded-l-[2vw]' src='/img/menino.jpg'></img>

                            <div className='titulo-status flex items-center justify-between'>

                                <div className='texto-card'>
                                    <h3>Sofia Souza de Oliveira</h3>
                                    <p>ETEC Dona Carmim</p>

                                </div>

                                <div className='status'> {/**receber os valores do status - receber a viagem e o status dela */}
                                    Em andamento
                                </div>

                            </div>


                        </div>

                    </div>

                </div>
            </section>

        </>
    )
}