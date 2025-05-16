"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import '../../styles/login.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Login() {
    const [usuarioAtivo, setUsuarioAtivo] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState([]);

    const usuarios = [
        { nome: 'Administrador' },
        { nome: 'Aluno' },
        { nome: 'Motorista' },
        { nome: 'Responsável' }
    ]

    const handleUserClick = (usuario) => {
        if (usuarioAtivo === usuario) {
            // Se a categoria já estiver ativa, desativa e mostra todas as matérias
            setUsuarioAtivo("");
            setUsuarioSelecionado([]);
        } else {
            // Caso contrário, ativa a nova categoria e mostra apenas suas matérias
            setUsuarioAtivo(usuario);
            switch (usuario) {
                case "alimentos":
                    setUsuarioSelecionado(alimentos);
                    break;
                case "acessorios":
                    setUsuarioSelecionado(acessorios);
                    break;
                case "higiene":
                    setUsuarioSelecionado(higiene);
                    break;
                case "saude":
                    setUsuarioSelecionado(saude);
                    break;
                default:
                    setUsuarioSelecionado([]);
            }
        }
    };

    return (
        <>
            <section className='login'>
                <div className='imgLogin'>
                    <img src="" />
                </div>

                {usuarioSelecionado.length === 0 ? (
                    <div className='login-btn'>
                        <div className='login-corpo'>
                            <h3 className="">Você é:</h3>
                            <div className="grid grid-flow-col grid-rows-4 grid-cols-1 gap-4 login-btn-cont">
                                {usuarios.map((usuario, index) => (
                                    <div key={index} className='container-login'>
                                        <div className='container-itens-login'>
                                            <p className='user'>{usuario.nome}</p>
                                            <button><img src='./img/btn-user.svg' /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='login-btn'>
                        <div className='login-corpo'>
                            <h3 className="">Entrar</h3>
                            <form action="">
                                <label for="cpf">CPF:</label>
                                    <input type="text" id="cpf" value="Digite seu CPF" />
                                <label for="cpf">Senha:</label>
                                    <input type="text" id="senha" value="Digite sua senha" />
                                        <input type="submit" value="Entrar" />
                                        </form>
                                    </div>
                                    </div>
                )}
                                    </section>
                                </>
                                )
    }