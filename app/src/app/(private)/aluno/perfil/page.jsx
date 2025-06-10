"use client";
import '../styles/perfil.css';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

export default function MeuPerfil() {
    // titulo da guia
    useEffect(() => {
        document.title = 'EduTrip - Meu Perfil';
    }, []);

    // p poder definir e mostrar o tipo de usuario escrito com acento e primeira letra maiuscula
    const tiposFormatados = {
        administrador: "Administrador",
        aluno: "Aluno",
        motorista: "Motorista",
        responsavel: "Responsável",
    };

    const emailInputRef = useRef(null);
        const tellRef = useRef(null);
        const [usuario, setUsuario] = useState(null);
        const [erro, setErro] = useState("");
        const [resposta, setResposta] = useState("");
        const [editando, setEditando] = useState(false);
        const [emailEditando, setEmailEditando] = useState(false);
        const [telefoneEditando, setTelefoneEditando] = useState(false);
        const [foto, setFoto] = useState(null);
        const [preview, setPreview] = useState("/docs/images/people/profile-picture-5.jpg");
    

    const handleFileChange = (e) => {
            setFoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        };
    
        const enviarFoto = async (e) => {
            e.preventDefault();
            if (!foto) return alert('Selecione uma foto');
    
            const formData = new FormData();
            formData.append('foto', foto);
            formData.append('nome', 'Usuário Teste');
    
            const res = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert('Upload feito com sucesso!');
                console.log('Imagem salva em:', data.caminhoImagem);
            } else {
                alert('Erro no upload: ' + data.error);
            }
        };
    
        // buscar informações do perfil
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
                });
        }, []);
    
        // mascara telefone - ao escrever no input
        useEffect(() => {
            if (tellRef.current) {
                tellRef.current.addEventListener("input", (e) => {
                    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
                    value = value.replace(/^(\d\d)(\d)/g, "($1)$2");
                    value = value.replace(/(\d{5})(\d)/, "$1-$2");
                    e.target.value = value;
                });
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
    
        // pega primeiro e ultimo nome do usuario
        const pegarPrimeiroEUltimoNome = (nome) => {
            if (!nome) return { primeiroNome: "", ultimoNome: "" };
            const nomes = nome.trim().split(" ");
            return { primeiroNome: nomes[0], ultimoNome: nomes[nomes.length - 1] };
        };
    
        // edicao do perfil
        const handleSubmit = async (e) => {
            e.preventDefault();
            const telefoneSemMascara = tellRef.current?.value?.replace(/\D/g, "") || null;
            const email = emailInputRef.current?.value || null;
    
            const formData = {};
            if (telefoneSemMascara) formData.telefone = telefoneSemMascara;
            if (email) formData.email = email;
    
            Object.keys(formData).forEach(key => {
                if (formData[key] === undefined) delete formData[key];
            });
    
            if (Object.keys(formData).length === 0) {
                console.log("Nenhum campo foi preenchido.");
                return;
            }
    
            try {
                const response = await fetch('http://localhost:3001/editarPerfil', {
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
                    setEditando(false);              // fecha o modo de edição
                    setEmailEditando(false);        // bloqueia o campo de email
                    setTelefoneEditando(false);     // bloqueia o campo de telefone
                }
                else {
                    console.error('Erro ao atualizar perfil');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        if (erro) return <p className="text-red-600 p-4">{erro}</p>;
    
        if (!usuario) {
            return (
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="..." fill="currentColor" />
                            <path d="..." fill="currentFill" />
                        </svg>
                        <span className="sr-only">Carregando...</span>
                    </div>
                </div>
            );
        }
        const nomeSobrenome = pegarPrimeiroEUltimoNome(usuario.nome);
    return (
        <section>
           <div className='page-indicador'>
                <h1>Meu perfil</h1>
                <hr />
            </div>

            <div className='user flex items-center gap-3 border-b border-[#D0D0D0]'>
                <div className="font-medium">
                    <h3>{nomeSobrenome.primeiroNome} {nomeSobrenome.ultimoNome}</h3>
                    <p className="text-sm text-gray-500">{tiposFormatados[usuario.tipo] || "Tipo de usuário"}</p>
                </div>
            </div>
            <div className='sec'>
                <div className='sec-indicador'><h4>Dados Pessoais</h4><hr /></div>
                <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                    <div className='sec-campos'><h6>Nome completo:</h6><p>{usuario.nome}</p></div>
                    <div className='sec-campos'><h6>Email institucional:</h6><p>{usuario.email}</p></div>
                    <div className='sec-campos'><h6>CPF:</h6><p>{formatarCPF(usuario.cpf)}</p></div>
                    <div className='sec-campos'><h6>Escola ID e Ponto ID:</h6><p>{usuario.escola_id || "-"}</p><p>{usuario.ponto_embarque_id || "-"}</p></div>
                </div>
            </div>
            <div className='sec'>
                <div className='sec-indicador'><h4>Contatos</h4><hr /></div>
                <form onSubmit={handleSubmit}>
                    <div className='sec-container flex flex-row flex-wrap justify-between gap-8'>
                        {/* Email */}
                        <div className='sec-campos'>
                            <h6>Email pessoal:</h6>
                            {editando ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="email"
                                        defaultValue={usuario.email}
                                        ref={emailInputRef}
                                        className="input"
                                        readOnly={!emailEditando}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setEmailEditando(true)}
                                        title="Editar e-mail"
                                        className="text-gray-500 hover:text-black"
                                    ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.3786 6.44975L4.96376 15.8648C4.68455 16.144 4.32895 16.3343 3.94177 16.4117L1.00003 17.0001L1.58838 14.0583C1.66582 13.6711 1.85612 13.3155 2.13532 13.0363L11.5502 3.62132M14.3786 6.44975L15.7929 5.03553C16.1834 4.64501 16.1834 4.01184 15.7929 3.62132L14.3786 2.20711C13.9881 1.81658 13.355 1.81658 12.9644 2.20711L11.5502 3.62132M14.3786 6.44975L11.5502 3.62132" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg></button>
                                </div>
                            ) : (
                                <p>{usuario.email}</p>
                            )}
                        </div>

                        {/* Telefone */}
                        <div className='sec-campos flex gap-10 '>
                            <div className='sec-campos2'>
                                <h6>Telefone:</h6>
                                {editando ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            defaultValue={formatarTelefone(usuario.telefone)}
                                            ref={tellRef}
                                            className="input"
                                            readOnly={!telefoneEditando}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setTelefoneEditando(true)}
                                            title="Editar telefone"
                                            className="text-gray-500 hover:text-black"
                                        ><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.3786 6.44975L4.96376 15.8648C4.68455 16.144 4.32895 16.3343 3.94177 16.4117L1.00003 17.0001L1.58838 14.0583C1.66582 13.6711 1.85612 13.3155 2.13532 13.0363L11.5502 3.62132M14.3786 6.44975L15.7929 5.03553C16.1834 4.64501 16.1834 4.01184 15.7929 3.62132L14.3786 2.20711C13.9881 1.81658 13.355 1.81658 12.9644 2.20711L11.5502 3.62132M14.3786 6.44975L11.5502 3.62132" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <p>{formatarTelefone(usuario.telefonePrinc || usuario.telefone || "-")}</p>
                                )}
                            </div>
                            <div className='sec-campos2'>
                                <h6>Tipo de telefone:</h6>
                                <p>{usuario.tipoTelefone || "Recado ou principal"}</p>
                            </div>
                        </div>
                    </div>

                    <div className='btn-perfil flex flex-wrap gap-6 mt-4'>
                        {!editando ? (
                            <button type="button" onClick={() => setEditando(true)} className='btn-add'>
                                Editar informações
                            </button>
                        ) : (
                            <>
                                <button type="submit" className='btn-edit'>Salvar alterações</button>
                                <button type="button" className='btn-cancel' onClick={() => {
                                    setEditando(false);
                                    setEmailEditando(false);
                                    setTelefoneEditando(false);
                                }}>
                                    Cancelar
                                </button>
                            </>
                        )}
                    </div>
                </form>

            </div>
        </section>
    );
}