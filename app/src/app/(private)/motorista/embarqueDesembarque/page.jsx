"use client";
import './embarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";


export default function embarque() {

    const escolas = [
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola X', endereco: 'R. Santo Andre, B. Nova Gerty', qtd: '65' },
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Y', endereco: 'R.Boa Vista, B. Nova Gerty', qtd: '12' },
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Z', endereco: 'R. Não Sei, B. Vou Pensar', qtd: '34' },
    ]
    return (
        <>
                <section className='secao1 '>
                    <h1 className='title1 '>Embarques e desembarques</h1>
                    <p className='linha'></p>
                    <div className='@container'>
                        <div className="escolas">
                            {escolas.map(({ escolas1, escola, endereco, qtd, img }) => (
                                <div className="cartao-escola lg:w-48" key={escolas1}>
                                    <img src={img} alt="Imagem da escola" className="imagem-escola md:w-45 md:h-40 sm:w-40 sm:h-38" />
                                    <div className="info-escola">
                                        <h1 className="nome-escola">{escola}</h1>
                                        <h2 className="endereco-escola">{endereco}</h2>
                                    </div>
                                    <div className="acoes-escola">
                                        <p className="qtd-alunos">{qtd} alunos</p>
                                        <a href='./embarqueDesembarque/alunos'><button className="botao-ver">
                                            Ver todos os alunos
                                            <img src="/img/motorista/embarque/Vector 108 (1).svg" alt="Ícone seta" />
                                        </button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>     </div>
                </section>
        </>
    )
}