"use client";
import '../styles/perfil.css';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { useState } from "react";

export default function MeuPerfil() {
    useEffect(() => {
    document.title = 'EduTrip - Meu Perfil';
  }, []);

    const tellRef = useRef(null);
    const emailInputRef = useRef(null);
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState("");
    const [resposta, setResposta] = useState("");
    const [editando, setEditando] = useState(false);
    const [emailEditando, setEmailEditando] = useState(false);
    const [telefoneEditando, setTelefoneEditando] = useState(false);

    //info perfil 
    useEffect(() => {
        fetch("http://localhost:3001/perfil", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.mensagem);
                setUsuario(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do usuário:", err.message);
                setErro("Erro ao carregar perfil.");
            })  }, []);

    // mascara telefone - ao escrever no input
    useEffect(() => {
        if (tellRef.current) {
            tellRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, "").slice(0, 11);
                value = value.replace(/^(\d\d)(\d)/g, "($1)$2");
                value = value.replace(/(\d{5})(\d)/, "$1-$2");
                e.target.value = value;
            })
        }
    }, []);

    // formatação de cpf ao pegar o cpf do back
    const formatarCPF = (cpf) => {
        if (!cpf) return " - ";
        return cpf
            .replace(/\D/g, "")
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    };

    // formatação de telefone ao pegar o telefone do back
    const formatarTelefone = (telefone) => {
        if (!telefone) return " - ";
        telefone = telefone.replace(/\D/g, "").slice(0, 11);
        telefone = telefone.replace(/^(\d{2})(\d)/, "($1)$2");
        telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
        return telefone;
    };

    // edicao do perfil
    const handleSubmit = async (e) => {
        e.preventDefault();
        const telefoneSemMascara = tellRef.current?.value?.replace(/\D/g, "") || null;
        const email = emailInputRef.current?.value || null;

        const formData = {};
        if (telefoneSemMascara) formData.telefone = telefoneSemMascara;
        if (email) formData.emailPessoal = email;

        Object.keys(formData).forEach(key => {
            if (formData[key] === undefined) delete formData[key];
        });

        if (Object.keys(formData).length === 0) {
            console.log("Nenhum campo foi preenchido.");
            return;
        } try {
            const response = await fetch('http://localhost:3001/editarPerfilAluno', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log('Perfil atualizado com sucesso!');
                setUsuario((prev) => ({ ...prev, ...formData }));
            }
            else {
                console.error('Erro ao atualizar perfil');
            } } catch (error) {
            console.error('Erro:', error);
        } };
const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    // att telefone e email quando usuario estiver disponivel
    useEffect(() => {
        if (usuario) {
            setTelefone(formatarTelefone(usuario.telefone || ""));
            setEmail(usuario.emailPessoal || "");
        }
    }, [usuario]);

    //volta para os valores originais
    const handleReset = () => {
        setTelefone(formatarTelefone(usuario?.telefone || ""));
        setEmail(usuario?.emailPessoal || "");
        setTelefoneEditando(false);
        setEmailEditando(false);
    };

    // enquanto carrega
    if (erro) {
        return <p className="text-red-600 p-4">{erro}</p>;
    }
    if (!usuario) {
        return (
            <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Carregando...</span>
                </div> </div>
        )}

    function pegarPrimeiroEUltimoNome(nome) {
        if (!nome) return { primeiroNome: "", ultimoNome: "" };
        const nomes = nome.trim().split(" ");
        return { primeiroNome: nomes[0], ultimoNome: nomes[nomes.length - 1] };
    };

    const nomeSobrenome = pegarPrimeiroEUltimoNome(usuario.nome);

    return (
        <section>
            <div className='page-indicador'>
                <h1>Meu perfil</h1>
                <hr />
            </div>
            <div className='user flex items-center gap-3 border-b border-[#D0D0D0]'>
               {/*DADOS aluno NOME E TIPO*/}
                <div className="font-medium">
                    <h3>{nomeSobrenome.primeiroNome} {nomeSobrenome.ultimoNome}</h3>
                    <p className="text-sm text-gray-500">Aluno</p>
                </div>
            </div>
             {/*DADOS aluno NOME E CPF*/}
            <div className='sec'>
                <div className='sec-indicador'><h4>Dados Pessoais</h4><hr /></div>
                <div className='sec-container flex flex-wrap flex-row justify-between gap-3'>
                    <div className='sec-campos'><h6>Nome completo:</h6><p>{usuario.nome}</p></div>
                    <div className='sec-campos'><h6>CPF:</h6><p>{formatarCPF(usuario.cpf)}</p></div>
                     <div className='sec-campos'><h6>Email institucional:</h6><p>{usuario.email}</p></div>
                </div>
            </div>
             {/*DADOS aluno EMAIL E TELEFONE*/}
            <div className='sec'>
                <div className='sec-indicador'><h4>Contatos</h4><hr /></div>
                <div className='sec-container flex flex-wrap flex-row justify-between gap-3'>
                    <div className='sec-campos'><h6>Email pessoal:</h6><p>{usuario.emailPessoal}</p></div>
                    <div className='sec-campos flex gap-10'>
                        <div className='sec-campos2'><h6>Telefone:</h6><p>{formatarTelefone(usuario.telefone)}</p></div>
                        <div className='sec-campos2'><h6>Tipo de telefone:</h6><p>{usuario.tipoTelefone || "Recado ou principal"}</p></div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-6'>
                <button type="button" className="btn-add mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Editar perfil
                </button>
 {/*MODAL DE EDIÇÃO DE PERFIL*/}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Perfil</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <div>
                                            <label htmlFor="telefone" className='form-label'>Telefone:</label>

                                            <div className="flex items-center gap-2">
                                                <input
                                                   type="text"
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                readOnly={!telefoneEditando}
                className="form-control"
                maxLength={15}
                ref={tellRef}
                                                />
{!telefoneEditando ? (
                <button
                  type="button"
                  onClick={() => setTelefoneEditando(true)}
                  title="Editar telefone"
                  className="text-gray-500 hover:text-black"
                >
                  {/* Ícone editar */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3786 6.44975L4.96376 15.8648C4.68455 16.144 4.32895 16.3343 3.94177 16.4117L1.00003 17.0001L1.58838 14.0583C1.66582 13.6711 1.85612 13.3155 2.13532 13.0363L11.5502 3.62132M14.3786 6.44975L15.7929 5.03553C16.1834 4.64501 16.1834 4.01184 15.7929 3.62132L14.3786 2.20711C13.9881 1.81658 13.355 1.81658 12.9644 2.20711L11.5502 3.62132M14.3786 6.44975L11.5502 3.62132" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                  }}
                  title="Cancelar edição"
                  className="text-red-500 hover:text-red-700"
                >
                  Cancelar
                </button>
              )}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className='form-label'>Email</label>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="email"
                                                defaultValue={usuario.emailPessoal}
                                                ref={emailInputRef}
                                                className="form-control"
                                                readOnly={!emailEditando}
                                            />
                                           {!emailEditando ? (
                <button
                  type="button"
                  onClick={() => setEmailEditando(true)}
                  title="Editar telefone"
                  className="text-gray-500 hover:text-black"
                >
                  {/* Ícone editar */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3786 6.44975L4.96376 15.8648C4.68455 16.144 4.32895 16.3343 3.94177 16.4117L1.00003 17.0001L1.58838 14.0583C1.66582 13.6711 1.85612 13.3155 2.13532 13.0363L11.5502 3.62132M14.3786 6.44975L15.7929 5.03553C16.1834 4.64501 16.1834 4.01184 15.7929 3.62132L14.3786 2.20711C13.9881 1.81658 13.355 1.81658 12.9644 2.20711L11.5502 3.62132M14.3786 6.44975L11.5502 3.62132" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                  }}
                  title="Cancelar edição"
                  className="text-red-500 hover:text-red-700"
                >
                  Cancelar
                </button>
              )}
                                        </div>

                                        <div className='items-center mt-3 flex justify-center gap-3'>
                                            <button type="submit" className="btn-add">Salvar alterações</button>
                                        </div>
                                    </div>
                                    <div><p>
                                        {(() => {
                                            try {
                                                if (!resposta) return null; // evita parse de string vazia
                                                const parsed = JSON.parse(resposta);
                                                return parsed.mensagem || 'Resposta recebida';
                                            } catch (e) {
                                                return resposta; // mostra como texto cru se nn for json
                                            } })()}
                                    </p></div>
                                </form>  </div>
                        </div>  </div>
                </div>  </div>
        </section>  )}