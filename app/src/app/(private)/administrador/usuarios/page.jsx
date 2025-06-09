"use client";
//import './alunosEmbarque.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import { VerAdmins, VerMotoristas, VerResponsaveis, VerTodos } from '../../../../../../server/models/Admin.js';
import '../styles/cadastros.css'

export default function embarques() {
    useEffect(() => {
        import('preline/dist/preline') // << usar o bundle compilado
    }, [])
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
            <section className='pagina-cadastros'>
                <div className='page-indicador'>
                    <h1>Usuários</h1>
                    <hr />
                </div>
                {/* bara de pesquisa - ainda vou arrumar */}
<div
        id="json-example-using-modal-popup-with-shortcut-call-trigger"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 z-80 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-auto"
        role="dialog"
        aria-labelledby="json-example-using-modal-popup-with-shortcut-call-trigger-label"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-100 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto">
            <div
              className="relative"
              data-hs-combo-box={`{
                "preventVisibility": true,
                "groupingType": "default",
                "apiUrl": "/api/busca",
                "apiGroupField": "categoria",
                "outputItemTemplate": "<div data-hs-combo-box-output-item><span class='flex items-center cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100'><div class='flex items-center w-full'><div class='flex items-center justify-center rounded-full bg-gray-200 size-6 overflow-hidden me-2.5'><img class='shrink-0' data-hs-combo-box-output-item-attr='[{&quot;valueFrom&quot;: &quot;imagem&quot;, &quot;attr&quot;: &quot;src&quot;}, {&quot;valueFrom&quot;: &quot;nome&quot;, &quot;attr&quot;: &quot;alt&quot;}]' /></div><div data-hs-combo-box-output-item-field='nome' data-hs-combo-box-value></div><div class='hidden' data-hs-combo-box-output-item-field='[&quot;nome&quot;, &quot;categoria&quot;]' data-hs-combo-box-search-text></div></div></span></div>",
                "groupingTitleTemplate": "<div class='text-xs uppercase text-gray-500 m-3 mb-1'></div>"
              }`}
            >
              {/* Campo de busca */}
              <div className="relative p-4 border-b border-gray-200">
                <label
                  id="json-example-using-modal-popup-with-shortcut-call-trigger-label"
                  htmlFor="searchbox-input"
                  className="sr-only"
                >
                  Search input
                </label>
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <svg
                    className="shrink-0 size-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <input
                  id="searchbox-input"
                  className="py-2.5 ps-10 pe-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  type="text"
                  role="combobox"
                  aria-expanded="false"
                  placeholder="Digite nome, CPF ou email"
                  autoFocus
                  data-hs-combo-box-input=""
                />
              </div>

              {/* Área dos resultados */}
              <div
                className="h-80 rounded-b-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
                data-hs-combo-box-output=""
              ></div>
              {/* Fim dos resultados */}
            </div>
          </div>
        </div>
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
                    <button className='btn-edit'>Deletar usuário</button>
                </div>


            </section>
        </>
    )
}