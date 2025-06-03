"use client";
import './alunosEmbarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
export default function cadastros() {
    //const escolas = [
       // { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola X', endereco: 'R. Santo Andre, B. Nova Gerty', qtd: '65' },//qtd vai pegar do banco de dados
       // { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Y', endereco: 'R.Boa Vista, B. Nova Gerty', qtd: '12' },
      //  { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Z', endereco: 'R. Não Sei, B. Vou Pensar', qtd: '34' },
  //  ]
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
}