"use client";
import { Kings } from 'next/font/google';
import '../styles/perfil.css';
import '../../../styles/globals.css';
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
                    <div className='user'>
                        <div className='perfil-img-nome flex flex-nowrap items-center gap-3'>
                            <Image
                                src="/img/fotoPerfil.png"
                                width={100}
                                height={100}
                                alt="Foto de perfil"
                                className='fotoPerfil'
                            />
                            <div>
                                <h3>Nome e Sobrenome</h3>
                                <p>Tipo de usuario</p>
                            </div>
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