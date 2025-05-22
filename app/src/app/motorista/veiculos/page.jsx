"use client";
import { Kings } from 'next/font/google'
import './veiculos.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import Image from 'next/image'

export default function veiculos() {
    return (
        <>
            <section className='secao1'>
                    <div className='page-indicador'>
                        <h1>Meus veículos</h1>
                        <hr />
                    </div>
                    <div className='user'>
                        <div className='perfil-img-nome flex flex-nowrap items-center gap-3'>
                            <Image
                                src="/img/fotoPerfil.png"
                                width={100}
                                height={100}
                                alt="Foto de perfil"
                                className='fotoPerfil'/>
                            <div>
                                <h3>Ônibus escolar</h3>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className='sec'>
                        <div className='sec-indicador'>
                            <h4>Informações</h4>
                            <hr/>
                        </div>
                        <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                            <div className='sec-campos'>
                                <h6>Modelo</h6>
                                <p>Nome modelo</p>
                            </div>
                            <div className='sec-campos'>
                                <h6></h6>
                                <p></p>
                                <p></p>
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
        </>
    )
}