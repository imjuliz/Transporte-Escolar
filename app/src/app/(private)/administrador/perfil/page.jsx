"use client";
import './perfil.css';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { useState } from "react";

export default function Perfil() {

    function openModal() {
        document.getElementById("modal").style.display = "block";
    }
    function closeModal() {
        document.getElementById("modal").style.display = "none";
    }
    const cpfInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const senhaInputRef = useRef(null);

    useEffect(() => {
        const cpfInput = cpfInputRef.current;
        const handleInput = (e) => {
            let value = e.target.value;
            value = value.replace(/\D/g, '');
            if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
            if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{2})/, '$1.$2.$3-$4');
            e.target.value = value;
        };

        cpfInput.addEventListener('input', handleInput);
        return () => {
            cpfInput.removeEventListener('input', handleInput);
        };
    },
        []);
    const [resposta, setResposta] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const cpfSemFormatacao = cpfInputRef.current?.value.replace(/[.-]/g, '');
        const formData = {
            cpf: cpfSemFormatacao,
            email: emailInputRef.current?.value,
            senha: senhaInputRef.current?.value,
        };
        try {
            const response = await fetch('http://localhost:3001/editarPerfil', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));

            if (response.ok) {
                console.log('Perfil atualizado com sucesso!');
            } else {
                console.error('Erro ao atualizar perfil');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    const limparForm = () => {
        setcpf('');
        setEmail('');
        setSenha('')
    }
    return (
        <>
            <section>
                <div className='page-indicador'>
                    <h1>Meu perfil</h1>
                    <hr />
                </div>
                <div className='user flex flex-nowrap items-center gap-3 border-b border-[#D0D0D0]'>
                    <div className='perfil-img-nome flex justify-end items-end gap-3'>
                        <Image
                            src="/img/fotoPerfil.png"
                            width={100}
                            height={100}
                            alt="Foto de perfil"
                            className='fotoPerfil' />
                        <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className='z-10 absolute'>
                            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill="#161A23" />
                            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="#2D2F39" />
                            <path d="M27 17V24C27 25.1046 26.1046 26 25 26H11C9.89543 26 9 25.1046 9 24V15C9 13.8954 9.89543 13 11 13H12.5C13.1295 13 13.7223 12.7036 14.1 12.2L15.15 10.8C15.5277 10.2964 16.1205 10 16.75 10H19.25" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.5 10V12.5M24.5 15V12.5M24.5 12.5H22M24.5 12.5H27" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="18" cy="19" r="4" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h3>Nome e Sobrenome</h3>
                        <p>Tipo de usuario</p>
                    </div> <hr /> </div>
                <div className='sec'>
                    <div className='sec-indicador'>
                        <h4>Dados Pessoais</h4>
                        <hr />
                    </div>
                    <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                        <div className='sec-campos'>
                            <h6>Nome completo:</h6>
                            <p>Nome completo.</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Escola:</h6>
                            <p>Nome da escola</p>
                            <p>Endereço da escola</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Email institucional:</h6>
                            <p>Email.</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Endereço:</h6>
                            <p>Endereço.</p>
                        </div>
                    </div>
                </div>
                <div className='sec'>
                    <div className='sec-indicador'>
                        <h4>Contatos</h4>
                        <hr />
                    </div>
                    <div className='sec-container flex flex-col gap-8'>
                        <div className='sec-campos'>
                            <h6>Email:</h6>
                            <p>Email pessoal 1.</p>
                        </div>
                        <div className='sec-campos flex flex-nowrap gap-50'>
                            <div className='sec-campos2'>
                                <h6>Telefone:</h6>
                                <p>Telefone pessoal 1</p>
                            </div>
                            <div className='sec-campos2'>
                                <h6>Tipo de telefone:</h6>
                                <p>Recado ou principal</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='btn-perfil flex flex-wrap gap-6'>
                    <button className='btn-add'>Adicionar contato</button>
                    <button onClick={openModal} className='botaoModal bg-blue-600'>Editar informações</button>

                    <div id="modal" className="modal">
                        <div className="modal-content">
                            <span className="fecharModal" onSubmit={limparForm} onClick={closeModal}>&times;</span>
                            <div className='conteudoModal'>
                                <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Editar Informações
                                    </h3>
                                </div>
                                {/* <!-- Modal body --> */}
                                <form onSubmit={handleSubmit} >
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                                            <input type="text" id="cpf" name="cpf" ref={cpfInputRef} maxLength="14" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000.000.000-00" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                        <input type="email" id="email" name="email" ref={emailInputRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                        <input type="password" id="senha" name="senha" ref={senhaInputRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                    </div>

                                    <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <div>
                                        <strong>Resposta do servidor:</strong>
                                        <pre>{resposta}</pre>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* </main> */}
        </>
    )
}