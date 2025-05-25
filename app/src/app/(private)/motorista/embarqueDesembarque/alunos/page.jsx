"use client";
import { Kings } from 'next/font/google'
import './alunosEmbarque.css'
import '../../../../styles/globals.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
// import embarque from '../page'

export default function embarque() {

    const escolas = [
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola X', endereco: 'R. Santo Andre, B. Nova Gerty', qtd: '65' },//qtd vai pegar do banco de dados
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Y', endereco: 'R.Boa Vista, B. Nova Gerty', qtd: '12' },
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Z', endereco: 'R. Não Sei, B. Vou Pensar', qtd: '34' },
    ]
    return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <section className='secao1'>
                <h1 className='title1'>Embarques e desembarques</h1>
                <p className='linha'></p>
                    <div className="escolas">
                        <div className="cartao-escola " >
                            <img  className="imagem-escola " src='/img/motorista/embarque/teste.jfif' alt="Imagem da escola" />
                            <div className="info-escola">
                                <h1 className="nome-escola">Escola X</h1>
                                <h2 className="endereco-escola">Endereço X</h2>
                            </div>
                            <div className="acoes-escola">
                                <p className="qtd-alunos">63 alunos</p>
                                <a href='../embarqueDesembarque'><button className="botao-ver @lg:whitespace-nowrap @lg:w-10">Ver menos<img src="/img/motorista/embarque/Vector 108 (1).svg" alt="Ícone seta" /></button>
                                </a></div>
                        </div>
                    </div>
                <div className='tabela'>
                    <table className="table-fixed">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>e-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>aluno1 sobrenome1</td>

                                <td>aluno1@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}