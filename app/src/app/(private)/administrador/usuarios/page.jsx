"use client";
//import './alunosEmbarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import { VerAdmins, VerMotoristas, VerResponsaveis, VerTodos } from '../../../../../../server/models/Admin.js';
import '../styles/cadastros.css'


export default function embarques() {
    //const escolas = [
    //  { img: '/img/motorista/embarque/teste.jfif', escola: 'Escola X', endereco: 'R. Santo Andre, B. Nova Gerty', qtd: '65' },//qtd vai pegar do banco de dados
    //{ img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Y', endereco: 'R.Boa Vista, B. Nova Gerty', qtd: '12' },
    //{ img: '/img/motorista/embarque/teste.jfif', escola: 'Escola Z', endereco: 'R. Não Sei, B. Vou Pensar', qtd: '34' },
    //]

    const [alunos, setAlunos] = useState([]);
    const [resposta, setResposta] = useState("");

    const [responsaveis, setResponsaveis] = useState([]);
    const [respostaResponsavel, setRespostaResponsavel] = useState("");

    const [motoristas, setMotoristas] = useState([]);
    const [respostaMotorista, setRespostaMotorista] = useState("");

    const [admins, setAdmins] = useState([]);
    const [respostaAdmin, setRespostaAdmin] = useState("");


    useEffect(() => {
        async function listarTodos() { //chama verTodos para buscar os dados da API e atualiza a lista de alunos com setAlunos
            const listaTodos = await VerTodos();
            setAlunos(listaTodos);
        } listarTodos();

        async function listarResponsaveis() {
            const listaResponsaveis = await VerResponsaveis();
            setResponsaveis(listaResponsaveis);
        } listarResponsaveis();

        async function listarMotoristas() {
            const listaMotoristas = await VerMotoristas();
            setMotoristas(listaMotoristas);
        } listarMotoristas();

        async function listarAdmins() {
            const listaAdmins = await VerAdmins();
            setAdmins(listaAdmins);
        } listarAdmins();
    },
        []);

    //fazer uma função só para mostrar todos os dados a partir de vários fetch
    async function VerTodos() {
        try {
            const response = await fetch('http://localhost:3001/cadastros-alunos', {
                credentials: 'include'
            });
            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setAlunos(data);
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar alunos!!!', err);
            return ['deu erro vei'];
        }
    }

    async function VerResponsaveis() {
        try {
            const response = await fetch('http://localhost:3001/cadastros-responsaveis', {
                credentials: 'include'
            });
            const data = await response.json();
            setRespostaResponsavel(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setResponsaveis(data);
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar responsáveis!!', err);
            return ['deu erro vei'];
        }
    }

    async function VerMotoristas() {
        try {
            const response = await fetch('http://localhost:3001/cadastros-motoristas', {
                credentials: 'include'
            });
            const data = await response.json();
            setRespostaMotorista(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setMotoristas(data);
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar motoristas!!', err);
            return ['deu erro vei'];
        }
    }

    async function VerAdmins() {
        try {
            const response = await fetch('http://localhost:3001/cadastros-admins', {
                credentials: 'include'
            });
            const data = await response.json();
            setRespostaAdmin(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setAdmins(data);
            }
            return data;
        } catch (err) {
            console.error('Erro ao listar admins! ', err);
            return ['deu erro vei'];
        }
    }

    return (
        <>
            <section className='cadastros'>
                <div className='page-indicador'>
                    <h1>Usuários</h1>
                    <hr />
                </div>

                {/**NAO ESQUECER DE CRIAR UMA FUNÇÃO PARA DEIXAR ATIVO / INATIVO */}

                {/**motoristas */}
                <div className="motoristas bg-white p-5 rounded-[2vw] mb-5 ">
                    <h3>Motoristas</h3>
                    <div className='cadastros pt-3 flex justify-between'>
                        <div className='nomee'>
                            <p className='text-black/50'>Nome</p>
                            <hr></hr>
                            {motoristas.map(({ nome, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{nome}</p>
                                </div>
                            ))}

                        </div>

                        <div className='cpff'>
                            <p className='text-black/50 '>CPF</p>
                            <hr></hr>
                            {motoristas.map(({ cpf, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{cpf}</p>
                                </div>
                            ))}
                        </div>
                        <div className='telefone'>
                            <p className='text-black/50 '>Telefone</p>
                            <hr></hr>
                            {motoristas.map(({ telefone, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{telefone}</p>
                                </div>
                            ))}
                        </div>
                        <div className="email">
                            <p className='text-black/50 '>Email</p>
                            <hr></hr>
                            {motoristas.map(({ email, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{email}</p>
                                </div>
                            ))}
                        </div>
                        <div className="cnh">
                            <p className='text-black/50 '>CNH</p>
                            <hr></hr>
                            {motoristas.map(({ cnh, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{cnh}</p>
                                </div>
                            ))}
                        </div>
                        <div className='status'>
                            <p className='text-black/50 '>Status</p>
                            <hr></hr>
                            {motoristas.map(({ status, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/**alunos */}
                <div className="alunos bg-white p-5 rounded-[2vw] mb-5">
                    <h3>Alunos</h3>
                    <div className='cadastros pt-3 flex justify-between'>
                        <div className='nomee'>
                            <p className='text-black/50'>Nome</p>
                            <hr></hr>
                            {alunos.map(({ nome, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{nome}</p>
                                </div>
                            ))}

                        </div>

                        <div className='cpff'>
                            <p className='text-black/50 '>CPF</p>
                            <hr></hr>
                            {alunos.map(({ cpf, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{cpf}</p>
                                </div>
                            ))}
                        </div>
                        <div className='telefone'>
                            <p className='text-black/50 '>Telefone</p>
                            <hr></hr>
                            {alunos.map(({ telefonePrinc, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{telefonePrinc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="email">
                            <p className='text-black/50 '>Email</p>
                            <hr></hr>
                            {alunos.map(({ email, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{email}</p>
                                </div>
                            ))}
                        </div>
                        <div className="turno">
                            <p className='text-black/50 '>Turno</p>
                            <hr></hr>
                            {alunos.map(({ turno, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{turno}</p>
                                </div>
                            ))}
                        </div>
                        <div className='status'>
                            <p className='text-black/50 '>Status</p>
                            <hr></hr>
                            {alunos.map(({ status, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/**responsáveis */}
                <div className="responsaveis bg-white p-5 rounded-[2vw] mb-5">
                    <h3>Responsáveis</h3>
                    <div className='cadastros pt-3 flex justify-between'>
                        <div className='nomee'>
                            <p className='text-black/50'>Nome</p>
                            <hr></hr>
                            {responsaveis.map(({ nome, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{nome}</p>
                                </div>
                            ))}

                        </div>

                        <div className='cpff'>
                            <p className='text-black/50 '>CPF</p>
                            <hr></hr>
                            {responsaveis.map(({ cpf, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{cpf}</p>
                                </div>
                            ))}
                        </div>
                        <div className='telefone'>
                            <p className='text-black/50 '>Telefone</p>
                            <hr></hr>
                            {alunos.map(({ telefonePrinc, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{telefonePrinc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="email">
                            <p className='text-black/50 '>Email</p>
                            <hr></hr>
                            {alunos.map(({ email, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{email}</p>
                                </div>
                            ))}
                        </div>
                        <div className="turno">
                            <p className='text-black/50 '>Turno</p>
                            <hr></hr>
                            {alunos.map(({ turno, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{turno}</p>
                                </div>
                            ))}
                        </div>
                        <div className='status'>
                            <p className='text-black/50 '>Status</p>
                            <hr></hr>
                            {alunos.map(({ status, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <hr></hr>
                <div>{JSON.stringify(alunos)}</div>;
                <hr></hr>
                <div>{JSON.stringify(responsaveis)}</div>
                <hr></hr>

                <hr></hr>
                <div>{JSON.stringify(admins)}</div>
            </section>








        </>
    )
}