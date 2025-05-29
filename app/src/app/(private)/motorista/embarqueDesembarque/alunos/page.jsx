"use client";
import './alunosEmbarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
export default function embarques() {
    const escolas = [
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola X', endereco: 'R. Santo Andre, B. Nova Gerty', qtd: '65' },//qtd vai pegar do banco de dados
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Y', endereco: 'R.Boa Vista, B. Nova Gerty', qtd: '12' },
        { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Z', endereco: 'R. Não Sei, B. Vou Pensar', qtd: '34' },
    ]
    const [alunos, setAlunos] = useState([]);
    const [resposta, setResposta] = useState("");
    useEffect(() => {
        async function listarAlunos() {
            const listaAlunos = await verAlunos();
            setAlunos(listaAlunos);
        } listarAlunos();
    }, []);
    async function verAlunos() {
        try {
            const response = await fetch('http://localhost:3001/verAlunos');
            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setAlunos(data);
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar alunos!!!', err);
            return [];
        }
    }

    return (
        <><section className='secao1'>
            <h1 className='title1'>Embarques e desembarques</h1>
            <p className='linha'></p>
            <div className="escolas">
                <div className="cartao-escola " >
                    <img className="imagem-escola md:w-35 md:h-35 " src='/img/motorista/embarque/teste.jfif' alt="Imagem da escola" />
                    <div className="info-escola">
                        <h1 className="nome-escola">Escola X</h1>
                        <h2 className="endereco-escola">Endereço X</h2>
                    </div>
                    <div className="acoes-escola">
                        <p className="qtd-alunos">63 alunos</p>
                        <a href='../embarqueDesembarque'><button className="botao-ver @lg:whitespace-nowrap @lg:w-10">Ver menos<img src="/img/motorista/embarque/Vector 108 (1).svg" alt="Ícone seta" /></button>
                        </a></div>
                </div> </div>
            <div className='listaAlunos '>
                <strong>Alunos:</strong>
                <table className="tabela table-auto" >
                    <thead>
                            <tr className='titulos grid grid-cols-3 gap-x-8 gap-y-4'>
                                <th className='titulo1'>Nome</th>
                                <th className='titulo2'>Escola</th>
                                <th className='titulo3'>Turno</th>
                            </tr>
                        </thead>
                    <pre>{alunos.map((aluno) => (
                        <tbody key={aluno}>
                            <tr className="grid grid-cols-3 gap-x-8 gap-y-4 2xl:w-220 ">
                                <td className='nomeAluno'>{aluno.nomeCompleto}</td>
                                <td className='nomeEscola'>{aluno.nomeEscola}</td>
                                <td className='turnoEscola'>{aluno.turno}</td>
                            </tr>
                        </tbody>
                ))}</pre> </table>
                {/* {resposta} */}
            </div>
        </section> </>)}