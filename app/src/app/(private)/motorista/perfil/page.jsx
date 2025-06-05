"use client";
import './perfil.css';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

export default function MeuPerfil() {
    const cpfRef = useRef(null);
    const telefoneRef= useRef(null);
    const emailInputRef = useRef(null);

    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState("");
    const [resposta, setResposta] = useState("");

    useEffect(() => {
        const cpfInput = cpfRef.current;
        if (!cpfInput) return;

        const handleInput = (e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, '');
            if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
            if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        };

        cpfInput.addEventListener('input', handleInput);
        return () => cpfInput.removeEventListener('input', handleInput);
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            telefone: telefoneRef.current?.value,
            email: emailInputRef.current?.value
        };
        try {
            const response = await fetch('http://localhost:3001/editarPerfil', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));
            if (response.ok) console.log('Perfil atualizado com sucesso!');
            else console.error('Erro ao atualizar perfil');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const openModal = () => document.getElementById("modal").style.display = "block";
    const closeModal = () => document.getElementById("modal").style.display = "none";

    function pegarPrimeiroEUltimoNome(nome) {
        if (!nome) return { primeiroNome: "", ultimoNome: "" };
        const nomes = nome.trim().split(" ");
        return { primeiroNome: nomes[0], ultimoNome: nomes[nomes.length - 1] };
    }

    // 1. Enquanto carrega
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
                </div>
            </div>
        );
    }

    function pegarPrimeiroEUltimoNome(nome) {
        if (!nome) return { primeiroNome: "", ultimoNome: "" };
        const nomes = nome.trim().split(" ");
        return { primeiroNome: nomes[0], ultimoNome: nomes[nomes.length - 1] };
    };

    if (erro) return <p className="text-red-600 p-4">{erro}</p>;
    if (!usuario) return <div className="text-center"><div role="status">Carregando...</div></div>;

    const nomeSobrenome = pegarPrimeiroEUltimoNome(usuario.nomeCompleto);

    return (
        <section>
            <div className='page-indicador'>
                <h1>Meu perfil</h1>
                <hr />
            </div>
            <div className='user flex items-center gap-3 border-b border-[#D0D0D0]'>
                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="" />
                <div className="font-medium">
                    <h3>{nomeSobrenome.primeiroNome} {nomeSobrenome.ultimoNome}</h3>
                    <p className="text-sm text-gray-500">{usuario.tipo || "Tipo de usuário"}</p>
                </div>
            </div>
            <div className='sec'>
                <div className='sec-indicador'><h4>Dados Pessoais</h4><hr /></div>
                <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                    <div className='sec-campos'><h6>Nome completo:</h6><p>{usuario.nome}</p></div>
                    <div className='sec-campos'><h6>CPF:</h6><p>{usuario.cpf}</p></div>
                    <div className='sec-campos'><h6>CNH:</h6><p>{usuario.cnh}</p></div>
                    <div className='sec-campos'><h6>Vencimento da habilitação:</h6><p>{usuario.vencimento_habilitacao}</p></div>
                </div>
            </div>
            <div className='sec'>
                <div className='sec-indicador'><h4>Contatos</h4><hr /></div>
                <div className='sec-container flex flex-col gap-8'>
                    <div className='sec-campos'><h6>Email pessoal:</h6><p>{usuario.email}</p></div>
                    <div className='sec-campos flex gap-10'>
                        <div className='sec-campos2'><h6>Telefone:</h6><p>{usuario.telefone}</p></div>
                        <div className='sec-campos2'><h6>Tipo de telefone:</h6><p>{usuario.tipoTelefone || "Recado ou principal"}</p></div>
                    </div>
                </div>
            </div>
            <div className='btn-perfil flex flex-wrap gap-6'>
                <button className='btn-add'>Adicionar contato</button>
                <button onClick={openModal} className='btn-edit'>Editar informações</button>
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="fecharModal" onClick={closeModal}>&times;</span>
                        <div className='conteudoModal'>
                            <h3 className="text-lg font-semibold">Editar Informações</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="telefone">telefone</label>
                                        <input type="text" id="telefone" ref={telefoneRef} maxLength="11" className="input" placeholder="(00)00000-0000" required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" id="email" ref={emailInputRef} className="input" placeholder="seu@email.com" required />
                                </div>
                                <button type="submit" className="btn-salvar">Salvar</button>
                                <div><strong>Resposta do servidor:</strong><pre>{resposta}</pre></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}