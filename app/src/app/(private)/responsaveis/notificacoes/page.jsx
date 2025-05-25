"use client";
import { Kings } from 'next/font/google';
import Image from 'next/image'
import '../styles/notificacoes.css'

export default function notificacoes() {
    //logica para receber as notificações de cada aluno

    return (
        <>
            <section className='navegacao'>

                <div className='page-indicador'>
                    <h1>Notificações</h1>
                    <hr />
                </div>

                <div className='flex flex-column gap-[7vh]'>
                    {/**Viajens de Hoje */}
                    <div className='today days'>
                        <h2>Hoje</h2>
                        {/*{viagens.map((viagem, index) => (*/}
                        <div className='container-viagem flex  items-center gap-5 bg-[#fff] rounded-[2vw]'>

                            <div className='bolinha'>

                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity="0.48" />
                                </svg>

                            </div>

                            <div className='foto-aluno'>
                                <img src='/img/menino.jpg'></img>
                            </div>

                            <div className='conteudo-notificacao flex items-center'>

                                <div className="texto">
                                    <h3>Congestionamento</h3>
                                    <p>Pode ser que xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                                </div>



                            </div>

                            <div className='status'>
                                Em andamento
                            </div>

                        </div>
                        {/*}))}*/}
                    </div>

                    {/**viagens do mÊs */}
                    <div className='mounth days'>
                        <h2>Esse mês</h2>
                        {/*{viagensPassadas.map((viagemPassada, index) => ( */}
                        <div className='container-viagem flex  items-center gap-3 bg-[#fff] rounded-[2vw]' >
                            <div className='flex flex-row items-center'>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="5" r="5" fill="currentColor" fillOpacity="0.48" />
                                </svg>


                            </div>

                            <div className='titulo-status flex items-center justify-between'>

                                <h3>aaaaaaaaaaaaaaaaaaa</h3>
                                <div className='status'> {/**receber os valores do status - receber a viagem e o status dela */}
                                    Em andamento
                                </div>

                            </div>

                        </div>
                        {/*}))}*/}
                    </div>
                </div>

            </section>


        </>
    )

}
