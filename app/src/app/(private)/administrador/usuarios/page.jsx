// "use client";
// import { usePathname } from 'next/navigation';
// import { useRef, useEffect, useState } from "react";
// import { VerAdmins, VerMotoristas, VerResponsaveis, VerTodos } from '../../../../../../server/models/Admin.js';
// 

// export default function embarques() {

//     const [tipo, setTipo] = useState("");

//     const [alunos, setAlunos] = useState([]);
//     const [resposta, setResposta] = useState("");

//     const [responsaveis, setResponsaveis] = useState([]);
//     const [respostaResponsavel, setRespostaResponsavel] = useState("");

//     const [motoristas, setMotoristas] = useState([]);
//     const [respostaMotorista, setRespostaMotorista] = useState("");

//     const [admins, setAdmins] = useState([]);
//     const [respostaAdmin, setRespostaAdmin] = useState("");

//     async function listarTodos() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-alunos', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setResposta(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setAlunos(data);
//             }
//             return data;
//         } catch (err) {
//             console.error('Erro ao listar alunos!!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function listarResponsaveis() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-responsaveis', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaResponsavel(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setResponsaveis(data);
//             }
//             return data;
//         } catch (err) {
//             console.error('Erro ao listar responsáveis!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function listarMotoristas() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-motoristas', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaMotorista(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setMotoristas(data);
//             }
//             return data;
//         } catch (err) {
//             console.error('Erro ao listar motoristas!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function listarAdmins() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-admins', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaAdmin(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setAdmins(data);
//             }
//             return data;
//         } catch (err) {
//             console.error('Erro ao listar admins! ', err);
//             return ['deu erro vei'];
//         }
//     }

//     useEffect(() => {
//         listarTodos();
//         listarResponsaveis();
//         listarMotoristas();
//         listarAdmins();
//     }, []);

//     // DELETAR USUARIO
//     const tipoRef = useRef(null);//
//     const emailRef = useRef(null);
//     const [resposta2, setResposta2] = useState("");
//     const [usuario, setUsuario] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const tipoSelecionado = tipo;  // pega do estado atualizado pelo select
//         const email2 = emailRef.current?.value || null;

//         const formData = {};
//         if (tipoSelecionado) formData.tipo = tipoSelecionado;
//         if (email2) formData.email = email2;

//         if (Object.keys(formData).length === 0) {
//             console.log("Nenhum campo foi preenchido.");
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3001/deletarUsuario', {
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//                 credentials: 'include'
//             });

//             const data = await response.json();
//             setResposta2(JSON.stringify(data, null, 2));

//             if (response.ok) {
//                 console.log('Perfil deletado com sucesso!');
//                 // atualiza a lista de alunos, motoristas, responsaveis e admins
//                 await listarTodos();  
//                 await listarResponsaveis();
//                 await listarMotoristas();
//                 await listarAdmins();
//             } else {
//                 console.error('Erro ao deletar perfil');
//             }
//         } catch (error) {
//             console.error('Erro:', error);
//         }
//     };


//     //fazer uma função só para mostrar todos os dados a partir de vários fetch
//     async function VerTodos() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-alunos', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setResposta(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setAlunos(data);
//             } return data;
//         } catch (err) {
//             console.error('Erro ao listar alunos!!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function VerResponsaveis() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-responsaveis', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaResponsavel(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setResponsaveis(data);
//             } return data;
//         } catch (err) {
//             console.error('Erro ao listar responsáveis!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function VerMotoristas() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-motoristas', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaMotorista(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setMotoristas(data);
//             } return data;
//         } catch (err) {
//             console.error('Erro ao listar motoristas!!', err);
//             return ['deu erro vei'];
//         }
//     }

//     async function VerAdmins() {
//         try {
//             const response = await fetch('http://localhost:3001/cadastros-admins', {
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             setRespostaAdmin(JSON.stringify(data, null, 2));
//             if (Array.isArray(data)) {
//                 setAdmins(data);
//             } return data;
//         } catch (err) {
//             console.error('Erro ao listar admins! ', err);
//             return ['deu erro vei'];
//         }
//     }

//      // formatação de cpf ao pegar o cpf do back
//     const formatarCPF = (cpf) => {
//         if (!cpf) return " - ";
//         return cpf
//             .replace(/\D/g, "")
//             .replace(/^(\d{3})(\d)/, "$1.$2")
//             .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
//             .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
//     };

//     // formatação de telefone ao pegar o telefone do back
//     const formatarTelefone = (telefone) => {
//         if (!telefone) return " - ";
//         telefone = telefone.replace(/\D/g, "").slice(0, 11);
//         telefone = telefone.replace(/^(\d{2})(\d)/, "($1)$2");
//         telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
//         return telefone;
//     };

//     return (
//         <>
//             <section className='pagina-cadastros' style={{ marginBottom: '10vh' }}>
//                 <div className='page-indicador'>
//                     <h1>Usuários</h1>
//                     <hr />
//                 </div>

//                 {/**NAO ESQUECER DE CRIAR UMA FUNÇÃO PARA DEIXAR ATIVO / INATIVO */}

//                 {/**motoristas */}
//                 <div className="motoristas bg-white p-5 rounded-[2vw] mb-5 ">
//                     <h3>Motoristas</h3>
//                     <div className='cadastros pt-3 flex justify-between'>
//                         <div className='nomee'>
//                             <p className='text-black/50'>Nome</p>
//                             <hr></hr>
//                             {motoristas.map(({ nome, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{nome}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='cpff'>
//                             <p className='text-black/50 '>CPF</p>
//                             <hr></hr>
//                             {motoristas.map(({ cpf, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarCPF(cpf)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='telefone'>
//                             <p className='text-black/50 '>Telefone</p>
//                             <hr></hr>
//                             {motoristas.map(({ telefone, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarTelefone(telefone)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="email">
//                             <p className='text-black/50 '>Email</p>
//                             <hr></hr>
//                             {motoristas.map(({ email, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{email}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="cnh">
//                             <p className='text-black/50 '>CNH</p>
//                             <hr></hr>
//                             {motoristas.map(({ cnh, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{cnh}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='status'>
//                             <p className='text-black/50 '>Status</p>
//                             <hr></hr>
//                             {motoristas.map(({ status, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{status}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/**alunos */}
//                 <div className="alunos bg-white p-5 rounded-[2vw] mb-5">
//                     <h3>Alunos</h3>
//                     <div className='cadastros pt-3 flex justify-between'>
//                         <div className='nomee'>
//                             <p className='text-black/50'>Nome</p>
//                             <hr></hr>
//                             {alunos.map(({ nome, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{nome}</p>
//                                 </div>
//                             ))}

//                         </div>

//                         <div className='cpff'>
//                             <p className='text-black/50 '>CPF</p>
//                             <hr></hr>
//                             {alunos.map(({ cpf, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarCPF(cpf)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='telefone'>
//                             <p className='text-black/50 '>Telefone</p>
//                             <hr></hr>
//                             {alunos.map(({ telefonePrinc, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarTelefone(telefonePrinc)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="email">
//                             <p className='text-black/50 '>Email</p>
//                             <hr></hr>
//                             {alunos.map(({ email, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{email}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="turno">
//                             <p className='text-black/50 '>Turno</p>
//                             <hr></hr>
//                             {alunos.map(({ turno, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{turno}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='status'>
//                             <p className='text-black/50 '>Status</p>
//                             <hr></hr>
//                             {alunos.map(({ status, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{status}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 {/**responsáveis */}
//                 <div className="responsaveis bg-white p-5 rounded-[2vw] mb-5">
//                     <h3>Responsáveis</h3>
//                     <div className='cadastros pt-3 flex justify-between'>
//                         <div className='nomee'>
//                             <p className='text-black/50'>Nome</p>
//                             <hr></hr>
//                             {responsaveis.map(({ nome, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{nome}</p>
//                                 </div>
//                             ))}

//                         </div>

//                         <div className='cpff'>
//                             <p className='text-black/50 '>CPF</p>
//                             <hr></hr>
//                             {responsaveis.map(({ cpf, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarCPF(cpf)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='telefone'>
//                             <p className='text-black/50 '>Telefone</p>
//                             <hr></hr>
//                             {responsaveis.map(({ telefone, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarTelefone(telefone)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="email">
//                             <p className='text-black/50 '>Email</p>
//                             <hr></hr>
//                             {responsaveis.map(({ email, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{email}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className='status'>
//                             <p className='text-black/50 '>Status</p>
//                             <hr></hr>
//                             {responsaveis.map(({ status, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{status}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 {/**admins */}
//                 <div className="admins bg-white p-5 rounded-[2vw] mb-5">
//                     <h3>Administradores</h3>
//                     <div className='cadastros pt-3 flex justify-between'>
//                         <div className='nomee'>
//                             <p className='text-black/50'>Nome</p>
//                             <hr></hr>
//                             {admins.map(({ nome, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{nome}</p>
//                                 </div>))}
//                         </div>

//                         <div className='cpff'>
//                             <p className='text-black/50 '>CPF</p>
//                             <hr></hr>
//                             {admins.map(({ cpf, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarCPF(cpf)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className='telefone'>
//                             <p className='text-black/50 '>Telefone</p>
//                             <hr></hr>
//                             {admins.map(({ telefone, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{formatarTelefone(telefone)}</p>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="email">
//                             <p className='text-black/50 '>Email</p>
//                             <hr></hr>
//                             {admins.map(({ email, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{email}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className='status'>
//                             <p className='text-black/50 '>Status</p>
//                             <hr></hr>
//                             {admins.map(({ status, id }) => (
//                                 <div className='flex flex-column gap-3' key={id}>
//                                     <p>{status}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className='flex flex-wrap gap-6 '>
//                     <button className='btn-add'><a href='./cadastrar' className='!no-underline text-white'>Cadastrar usuário</a></button>
//                     <button type="button" className="btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//                         Deletar usuário
//                     </button>

//                     {/*Deletar usuário */}
//                     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                         <div className="modal-dialog">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <h1 className="modal-title fs-5 " id="staticBackdropLabel">Deletar usuário</h1>
//                                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <form onSubmit={handleSubmit}>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label">Email do usuário que deseja deletar:</label>
//                                             <input type="email" ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="tipoUsuario" className="form-label">
//                                                 Tipo de usuário:
//                                             </label>
//                                             <select id="tipoUsuario" onChange={(e) => setTipo(e.target.value)} value={tipo} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5" >
//                                                 <option value="">Selecionar tipo</option>
//                                                 <option value="aluno">Aluno</option>
//                                                 <option value="responsavel">Responsável</option>
//                                                 <option value="motorista">Motorista</option>
//                                                 <option value="administrador">Administrador</option>
//                                             </select>
//                                         </div>
//                                         <button type="submit" className="btn btn-primary px-4">Enviar</button>
//                                     </form>
//                                     {/* <div><strong>Resposta do servidor:</strong><pre>{resposta2}</pre></div> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/cadastros.css';

export default function UsuariosPage() {
    const [tipo, setTipo] = useState("");

    const [alunos, setAlunos] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [responsaveis, setResponsaveis] = useState([]);
    const [admins, setAdmins] = useState([]);

    // Funções para buscar os dados
    const listarAlunos = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-alunos", { credentials: "include" });
            const data = await res.json();
            setAlunos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const listarMotoristas = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-motoristas", { credentials: "include" });
            const data = await res.json();
            setMotoristas(data);
        } catch (err) {
            console.error(err);
        }
    };

    const listarResponsaveis = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-responsaveis", { credentials: "include" });
            const data = await res.json();
            setResponsaveis(data);
        } catch (err) {
            console.error(err);
        }
    };

    const listarAdmins = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-admins", { credentials: "include" });
            const data = await res.json();
            setAdmins(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Carrega todos ao iniciar
    useEffect(() => {
        listarAlunos();
        listarMotoristas();
        listarResponsaveis();
        listarAdmins();
    }, []);

    const formatarCPF = (cpf) => {
        if (!cpf) return "-";
        return cpf.replace(/\D/g, "")
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    };

    const formatarTelefone = (telefone) => {
        if (!telefone) return "-";
        return telefone.replace(/\D/g, "").slice(0, 11)
            .replace(/^(\d{2})(\d)/, "($1)$2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const renderTabela = (titulo, dados, colunas, getValor) => (
        <motion.div
            className="bg-white rounded-xl p-4 md:p-6 mx-2 md:mx-0 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-6">
                <h2 className="text-gray-800 text-xl font-bold mb-4">{titulo}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-xl">
                    <thead className="bg-gray-100">
                        <tr>
                            {colunas.map((header) => (
                                <th key={header} className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-300">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((item, index) => (
                            <motion.tr
                                key={item.id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.3 }}
                                className="border-b border-gray-200 hover:bg-gray-50"
                            >
                                {colunas.map((col, i) => (
                                    <td key={i} className="px-4 py-2">
                                        {getValor(item, col)}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );

    // DELETAR USUARIO
    const emailRef = useRef(null);
    const [resposta2, setResposta2] = useState("");
    const [resposta, setResposta] = useState({ mensagem: "", tipo: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tipoSelecionado = tipo;
        const email2 = emailRef.current?.value || null;

        const formData = {};
        if (tipoSelecionado) formData.tipo = tipoSelecionado;
        if (email2) formData.email = email2;

        if (Object.keys(formData).length === 0) {
            console.log("Nenhum campo foi preenchido.");
            return;
        }

        try {
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
                setResposta({ mensagem: data.mensagem || "Usuário deletado com sucesso!", tipo: "sucesso" });
                // Atualiza as listas
                await listarAlunos();
                await listarMotoristas();
                await listarResponsaveis();
                await listarAdmins();
            } else {
                console.error('Erro ao deletar perfil');
                setResposta({ mensagem: data.mensagem || "Erro ao deletar usuário.", tipo: "erro" });
            }
        } catch (error) {
            console.error('Erro:', error);
            setResposta({ mensagem: "Erro de conexão, tente novamente mais tarde.", tipo: "erro" });
        }
    };

    return (
        <section className="grid grid-cols-1 gap-8 mt-5 mb-5">
            <div className='page-indicador'>
                <h1>Usuários</h1>
                <hr />
            </div>

            {renderTabela("Motoristas", motoristas, ["Nome", "CPF", "Telefone", "Email", "CNH", "Status"], (item, col) => {
                switch (col) {
                    case "Nome": return item.nome;
                    case "CPF": return formatarCPF(item.cpf);
                    case "Telefone": return formatarTelefone(item.telefone);
                    case "Email": return item.email;
                    case "CNH": return item.cnh;
                    case "Status": return item.status;
                    default: return "-";
                }
            })}

            {renderTabela("Alunos", alunos, ["Nome", "CPF", "Telefone", "Email", "Turno", "Status"], (item, col) => {
                switch (col) {
                    case "Nome": return item.nome;
                    case "CPF": return formatarCPF(item.cpf);
                    case "Telefone": return formatarTelefone(item.telefonePrinc);
                    case "Email": return item.email;
                    case "Turno": return item.turno;
                    case "Status": return item.status;
                    default: return "-";
                }
            })}

            {renderTabela("Responsáveis", responsaveis, ["Nome", "CPF", "Telefone", "Email", "Status"], (item, col) => {
                switch (col) {
                    case "Nome": return item.nome;
                    case "CPF": return formatarCPF(item.cpf);
                    case "Telefone": return formatarTelefone(item.telefone);
                    case "Email": return item.email;
                    case "Status": return item.status;
                    default: return "-";
                }
            })}

            {renderTabela("Administradores", admins, ["Nome", "CPF", "Telefone", "Email", "Status"], (item, col) => {
                switch (col) {
                    case "Nome": return item.nome;
                    case "CPF": return formatarCPF(item.cpf);
                    case "Telefone": return formatarTelefone(item.telefone);
                    case "Email": return item.email;
                    case "Status": return item.status;
                    default: return "-";
                }
            })}

            <div className='flex flex-wrap gap-6'>
                <button className='btn-add'><a href='./cadastrar' className='!no-underline text-white'>Cadastrar usuário</a></button>
                <button type="button" className="btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Deletar usuário
                </button>

                {/* Deletar usuário - modal */}
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
                                        <label htmlFor="tipoUsuario" className="form-label">
                                            Tipo de usuário:
                                        </label>
                                        <select id="tipoUsuario" onChange={(e) => setTipo(e.target.value)} value={tipo} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5" >
                                            <option value="">Selecionar tipo</option>
                                            <option value="aluno">Aluno</option>
                                            <option value="responsavel">Responsável</option>
                                            <option value="motorista">Motorista</option>
                                            <option value="administrador">Administrador</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-add px-4">Deletar</button>
                                    <div><p className={`text-center mt-3 text-sm ${resposta.tipo === "sucesso" ? "text-green-600" : "text-red-600"}`}>{resposta.mensagem}</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

