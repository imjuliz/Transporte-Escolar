"use client";
import { Kings } from 'next/font/google';
import '../styles/perfil.css';
import Image from 'next/image'

export default function meuPerfil() {
    return (
        <>
        {/* <main className='justify-items-center content-center'> */}
                <section>
                    <div className='page-indicador'>
                        <h1>Meu perfil</h1>
                        <hr />
                    </div>
                    <div className='user flex flex-nowrap items-center gap-3 border-b border-[#D0D0D0]'>
                        <div className='perfil-img-nome flex justify-end items-end gap-3'>
                            <Image
                                src="/img/fotoPerfil.png"
                                width={100}
                                height={100}
                                alt="Foto de perfil"
                                className='fotoPerfil'
                            />
                            <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className='z-10 absolute'>
                            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill="#161A23" />
                            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="#2D2F39" />
                            <path d="M27 17V24C27 25.1046 26.1046 26 25 26H11C9.89543 26 9 25.1046 9 24V15C9 13.8954 9.89543 13 11 13H12.5C13.1295 13 13.7223 12.7036 14.1 12.2L15.15 10.8C15.5277 10.2964 16.1205 10 16.75 10H19.25" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.5 10V12.5M24.5 15V12.5M24.5 12.5H22M24.5 12.5H27" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="18" cy="19" r="4" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </div>
                            <div>
                                <h3>Nome e Sobrenome</h3>
                                <p>Tipo de usuario</p>
                            </div>
                        <hr />
                    </div>

                    <div className='sec'>
                        <div className='sec-indicador'>
                            <h4>Dados Pessoais</h4>
                            <hr />
                        </div>
                        <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                            <div className='sec-campos'>
                                <h6>Nome completo:</h6>
                                <p>Nome completo.</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>Escola:</h6>
                                <p>Nome da escola</p>
                                <p>Endereço da escola</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>Email institucional:</h6>
                                <p>Email.</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>Endereço:</h6>
                                <p>Endereço.</p>
                            </div>
                        </div>
                    </div>

                    <div className='sec'>
                        <div className='sec-indicador'>
                            <h4>Contatos</h4>
                            <hr />
                        </div>
                        <div className='sec-container flex flex-col gap-8'>
                            <div className='sec-campos'>
                                <h6>Email:</h6>
                                <p>Email pessoal 1.</p>
                            </div>
                            <div className='sec-campos flex flex-nowrap gap-50'>
                                <div className='sec-campos2'>
                                    <h6>Telefone:</h6>
                                    <p>Telefone pessoal 1</p>
                                </div>
                                <div className='sec-campos2'>
                                    <h6>Tipo de telefone:</h6>
                                    <p>Recado ou principal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='btn-perfil flex flex-wrap gap-6'>
                        <button className='btn-add'>Adicionar contato</button>
                        <button className='btn-edit'>Editar informações</button>
                    </div>
                </section>
            {/* </main> */}
        </>
    )
}