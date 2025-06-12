"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/cadastros.css';

export default function UsuariosPage() {
    useEffect(() => {
    document.title = 'EduTrip - Usuários';
  }, []);
    const [tipo, setTipo] = useState("");

    const [alunos, setAlunos] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [responsaveis, setResponsaveis] = useState([]);
    const [admins, setAdmins] = useState([]);

    // Funções para buscar os dados dos alunos
    const listarAlunos = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-alunos", { credentials: "include" });
            const data = await res.json();
            setAlunos(data);
        } catch (err) {
            console.error(err);
        }
    };

   //FUNÇÃO PARA PEGAR OS DADOS DOS MOTORISTAS
    const listarMotoristas = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-motoristas", { credentials: "include" });
            const data = await res.json();
            setMotoristas(data);
        } catch (err) {
            console.error(err);
        }
    };

    //FUNÇÃO PARA PEGAR OS DADOS DOS RESPONSAVEIS 
    const listarResponsaveis = async () => {
        try {
            const res = await fetch("http://localhost:3001/cadastros-responsaveis", { credentials: "include" });
            const data = await res.json();
            setResponsaveis(data);
        } catch (err) {
            console.error(err);
        }
    };
//FUNÇÃO PARA PEGAR OS DADOS DOS ADMS
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

    //FORMATAÇÃO CPF
    const formatarCPF = (cpf) => {
        if (!cpf) return "-";
        return cpf.replace(/\D/g, "")
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    };
//FORATAÇÃO TELEFONE
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
            transition={{ delay: 0.2, duration: 0.5 }}>
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
//ENVIA PARA O BACK O USUÁRIO QUE SERÁ DELETADO
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
            } } catch (error) {
            console.error('Erro:', error);
            setResposta({ mensagem: "Erro de conexão, tente novamente mais tarde.", tipo: "erro" });
        }};

    return (
        <section className="grid grid-cols-1 gap-8 mt-5 mb-5">
            <div className='page-indicador'>
                <h1>Usuários</h1>
                <hr />
            </div>
{/*TABELA MOTORISTAS*/}
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
{/*TABELA ALUNOS*/}
            {renderTabela("Alunos", alunos, ["Nome", "CPF", "Telefone", "Email", "Turno", "Status"], (item, col) => {
                switch (col) {
                    case "Nome": return item.nome;
                    case "CPF": return formatarCPF(item.cpf);
                    case "Telefone": return formatarTelefone(item.telefone);
                    case "Email": return item.email;
                    case "Turno": return item.turno;
                    case "Status": return item.status;
                    default: return "-";
                }
            })}
{/*TABELA RESPONSAVEIS*/}
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
{/*TABELA ADMS*/}
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
{/*CADASTRAR USUÁRIO*/}
            <div className='flex flex-wrap gap-6'>
                <button className='btn-add'><a href='./cadastrar' className='!no-underline text-white'>Cadastrar usuário</a></button>
               {/*DELETAR USUÁRIO*/}
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
                                    {/*EMAIL DO USUÁRIO*/}
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email do usuário que deseja deletar:</label>
                                        <input type="email" ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        {/*TIPO DO USUÁRIO*/}
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
                                    {/*RESPOSTA DO SERVIDOR*/}
                                    <div><p className={`text-center mt-3 text-sm ${resposta.tipo === "sucesso" ? "text-green-600" : "text-red-600"}`}>{resposta.mensagem}</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> </div> </section> );}

