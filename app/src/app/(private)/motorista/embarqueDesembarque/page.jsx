"use client";
import './embarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";


export default function embarque() {

    const [escolas, setEscolas] = useState([]);
    const [resposta, setResposta] = useState('');

    useEffect(() => {
        async function listarEscolas() {
            const listarEscolas = await verEscolas();
            setEscolas(listarEscolas);
        } listarEscolas()
    }, [])



    async function verEscolas() {
        try {
            const response = await fetch('http://localhost:3001/verEscolas',
                { credentials: "include" });

            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));

            if (Array.isArray(data)) {
                setEscolas(data)
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar escolas', err);
            return null;
        }
    }
    return (
        <><section className='secao1 '>
            <h1 className='title1 '>Embarques e desembarques</h1>
            <p className='linha'></p>
            <div className='@container'>
                <div className="escolas">
                    {escolas.map((escola) => (
                        <div className="cartao-escola lg:w-48" key={escola.escola_id}>
                            <img src='./' alt="Imagem da escola" className="imagem-escola 2xl:h-45 md:w-45 md:h-40 sm:w-40 sm:h-38" />
                            <div className="info-escola">
                                <h1 className="nome-escola">{escola.nome}</h1>
                                <h2 className="endereco-escola">{escola.endereco}</h2>
                            </div>
                            <div className="acoes-escola">
                                {/* <p className="qtd-alunos">{escola.qtd} alunos</p> */}
                                {/* <a href='./embarqueDesembarque/alunos'>
                                        <button className="botao-ver">
                                            Ver todos os alunos
                                            <img src="/img/motorista/embarque/Vector 108 (1).svg" alt="Ícone seta" />
                                        </button></a> */}
                                <button
                                    onClick={() => toggle(escola.escola_id)}
                                    className="conteudo-card w-full flex justify-between items-center py-5 text-slate-800"
                                ></button>
                            </div>
                        </div>
                    ))}
                </div></div>
        </section>
        </>
    )
}