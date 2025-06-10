"use client";
//import './alunosEmbarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import { VerAdmins, VerMotoristas, VerResponsaveis, VerTodos } from '../../../../../../server/models/Admin.js';
import '../styles/cadastros.css'

export default function usuarios() {
    useEffect(() => {
        import('preline/dist/preline') // << usar o bundle compilado
    }, [])

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

    // DELETAR USUARIO
    const tipoRef = useRef(null);
    const emailRef = useRef(null);
    const [resposta2, setResposta2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tipo = tipoRef.current?.value || null;
        const email2 = emailRef.current?.value || null;

        const formData = {};
        if (tipo) formData.tipo = tipo;
        if (email2) formData.email = email2;

        Object.keys(formData).forEach(key => {
            if (formData[key] === undefined) delete formData[key];
        });

        if (Object.keys(formData).length === 0) {
            console.log("Nenhum campo foi preenchido.");
            return;
        } try {
            const response = await fetch('http://localhost:3001/deletarUsuario', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            setResposta2(JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log('Perfil deletado com sucesso!');
                setUsuario((prev) => ({ ...prev, ...formData }));
            } else {
                console.error('Erro ao deletar perfil');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };



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
            } return data;
        } catch (err) {
            console.error('Erro ao listar alunos!!!', err);
            return ['deu erro vei'];
        } }

    async function VerResponsaveis() {
        try {
            const response = await fetch('http://localhost:3001/cadastros-responsaveis', {
                credentials: 'include'
            });
            const data = await response.json();
            setRespostaResponsavel(JSON.stringify(data, null, 2));
            if (Array.isArray(data)) {
                setResponsaveis(data);
            } return data;
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
            } return data;
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
            } return data;
        } catch (err) {
            console.error('Erro ao listar admins! ', err);
            return ['deu erro vei'];
        }
    }

    return (
        <>
            <section className='pagina-cadastros'>
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
                            {responsaveis.map(({ telefone, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{telefone}</p>
                                </div>
                            ))}
                        </div>
                        <div className="email">
                            <p className='text-black/50 '>Email</p>
                            <hr></hr>
                            {responsaveis.map(({ email, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{email}</p>
                                </div>
                            ))}
                        </div>

                        <div className='status'>
                            <p className='text-black/50 '>Status</p>
                            <hr></hr>
                            {responsaveis.map(({ status, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/**admins */}
                <div className="admins bg-white p-5 rounded-[2vw] mb-5">
                    <h3>Administradores</h3>
                    <div className='cadastros pt-3 flex justify-between'>
                        <div className='nomee'>
                            <p className='text-black/50'>Nome</p>
                            <hr></hr>
                            {admins.map(({ nome, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{nome}</p>
                                </div>
                            ))}

                        </div>

                        <div className='cpff'>
                            <p className='text-black/50 '>CPF</p>
                            <hr></hr>
                            {admins.map(({ cpf, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{cpf}</p>
                                </div>
                            ))}
                        </div>
                        <div className='telefone'>
                            <p className='text-black/50 '>Telefone</p>
                            <hr></hr>
                            {admins.map(({ telefone, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{telefone}</p>
                                </div>
                            ))}
                        </div>
                        <div className="email">
                            <p className='text-black/50 '>Email</p>
                            <hr></hr>
                            {admins.map(({ email, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{email}</p>
                                </div>
                            ))}
                        </div>

                        <div className='status'>
                            <p className='text-black/50 '>Status</p>
                            <hr></hr>
                            {admins.map(({ status, id }) => (
                                <div className='flex flex-column gap-3' key={id}>
                                    <p>{status}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                <button className='btn-add no-underline text-[#fff]'><a href='./cadastrar' className='no-underline text-[#fff]'>Cadastrar usuário</a></button>
                    <button type="button" className="btn-add btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Deletar usuário
                    </button>
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Deletar usuário</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email do usuário que deseja deletar:</label>
                                            <input type="email" ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Tipo de usuário:</label>
                                            <input type="tipo" ref={tipoRef} className="form-control" id="exampleInputPassword1" placeholder='ex. motoristas, alunos, responsaveis' />
                                        </div>
                                        <button type="submit" className="btn btn-primary">enviar</button>
                                    </form>
                                    <div><strong>Resposta do servidor:</strong><pre>{resposta2}</pre></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )}