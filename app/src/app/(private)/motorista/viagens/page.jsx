"use client";
import './viagens.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";


export default function viagens() {
    const escolas = [
        // { hr: 'Hoje' },
        { escola: 'escola A', hr: '06:00', endereco: 'Endereço A' },
        { escola: 'escola B', hr: '06:30', endereco: 'Endereço B' },
        { escola: 'escola C', hr: '07:00', endereco: 'Endereço C' },
        { hr: '07:30' },
        { hr: '08:00' },
        { hr: '08:30' },
    ]
    return (
        <>
            <section className='secao1'>
                <h1 className='title1'>Planejamento de Viagens</h1>
                <p className='linha'></p>
<button type="button" className=" botaoEditar btn btn-success">+ Editar planejamento</button>
                <div className='teste-scroll'></div>
                <div className="escolas">
                    <div className='hoje basis-1/3'><p>Hoje</p></div>
                    {escolas.map(({ escola, hr, endereco, escola1 }) => (
                        <div className="cartao-escola" >
                            <div className="flex flex-row">
                                <div className="basis-1/3 ">
                                    <div className='horarios text-center'>
                                        <p>{hr}</p>
                                    </div>
                                </div>
                                <div className="basis-2/3 md:w-10">
                                    <div className='escolas1'><h3 className='escola-nome'>{escola}</h3> <p className='escola-endereco'>{endereco}</p> </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}