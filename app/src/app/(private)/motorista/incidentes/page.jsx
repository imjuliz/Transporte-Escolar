"use client";
import { Kings } from 'next/font/google'
import './incidentes.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import Image from 'next/image'
import '../../../styles/globals.css'

export default function incidentes() {
    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <section className='secao1'>
                <div className='page-indicador'>
                    <h1>Incidentes</h1>
                </div>
                <div className='user'>
                    <div className='perfil-img-nome flex flex-nowrap items-center gap-3'>
                        <Image
                            src="/img/fotoPerfil.png"
                            width={100}
                            height={100}
                            alt="Foto de perfil"
                            className='fotoPerfil' />
                        <div>
                            <h3>incidentes</h3>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='@container'>
                <div className='sec '>
                    <div className='sec-indicador'>
                        <h4>Dados Pessoais</h4>
                        <hr />
                    </div>
                    <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                        <div className='sec-campos'>
                            <h6>Modelo</h6>
                            <p>Nome modelo</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Marca</h6>
                            <p>Nome marca</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Ano</h6>
                            <p>Ano ônibus</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Placa</h6>
                            <p>N° da placa</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className='@container'>
                <div className='sec'>
                    <div className='sec-container grid grid-flow-col grid-rows-1 gap-3'>
                            <div className='sec-campos flex gap-105 xl:gap-80 lg:gap-56 md:gap-32 sm:gap-20'>
                            {/* @2xl:gap-105 @xl:gap-80 @lg:gap-57 @md:gap-32 @sm:gap-20 */}
                                <div className='sec-campos'>
                                    <h6>Data de fabricação</h6>
                                    <p>data</p>
                                </div>
                                <div className='sec-campos '>
                                    <h6>N° de passageiros</h6>
                                    <p>N°</p>
                                </div>
                            </div>
                       
                    </div>
                </div>
                </div>
                <div className='btn-perfil flex flex-wrap gap-6'>
                    <button className='btn-add'>Adicionar veículo</button>
                    <button className='btn-edit'>Editar informações</button>
                </div>
            </section>
        </>
    )
}