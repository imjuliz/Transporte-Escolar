"use client";
import './login.css'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Login() {
  // titulo da guia
  useEffect(() => {
    document.title = 'EduTrip - Login';
  }, []);

  const router = useRouter();
  // senha
  const [senhaVisivel, setSenhaVisivel] = useState(false); // estado falso pq a senha esta oculta
  const mostrarSenha = () => {
    setSenhaVisivel((prev) => !prev); // pega o estado anterior e inverte, ou seja, alterna entre true e false
  };

  // escolha de usuario
  const [usuarioAtivo, setUsuarioAtivo] = useState("");

  const handleUserClick = (nome) => {
    setUsuarioAtivo(nome);
  };

  const usuarios = [
    { nome: 'Administrador' },
    { nome: 'Aluno' },
    { nome: 'Motorista' },
    { nome: 'Responsável' }
  ];

  const normalizarTipo = (tipo) => {
    return tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/\s/g, "");
  };

  // useState para armanezar os inputs
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');


  // mostrar mensagem pros usuarios
  const [loginStatus, setLoginStatus] = useState('');
  const [statusAtual, setStatusAtual] = useState('mensagem')

  const login = async (e) => {
  e.preventDefault();

  if (!email || !senha || !usuarioAtivo) {
    setLoginStatus("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        senha,
        tipo: normalizarTipo(usuarioAtivo)
      })
    });

    const data = await response.json();
    console.log('Resposta:', data);

    if (response.ok) {
      const tipoUsuario = data.tipo;
      console.log("tipoUsuario:", tipoUsuario);

      // Redireciona direto aqui, sem usar setRedirectTo
      if (tipoUsuario === "aluno") {
        router.replace("/aluno/minha-rota");
      } else if (tipoUsuario === "administrador") {
        router.replace("/administrador/dashboard");
      } else if (tipoUsuario === "motorista") {
        router.replace("/motorista/minha-rota");
      } else if (tipoUsuario === "responsavel") {
        router.replace("/responsavel/filhos");
      } else {
        router.replace("/login");
      }
    } else {
      setLoginStatus(data.erro || data.mensagem || "Erro desconhecido");
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    setLoginStatus("Erro ao conectar com o servidor.");
  }
};

  // mensagem de erro
  useEffect(() => {
    if (loginStatus !== '') {
      setStatusAtual('mostrarMensagem'); // mostra mensagem
      const timeout = setTimeout(() => {
        setStatusAtual('mensagem'); // esconde a mensagem depois de 4 seg
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [loginStatus]);
  
  // limpar o formulario
  const limparForm = () => {
    setEmail('');
    setSenha('')
  }
  return (
    <section className="login">
      <div id="particles-container" className="imgLogin">
        {/* <div id="particles-js"></div><div className="count-particles"> <span className="js-count-particles"></span></div> */}
      </div>
      {!usuarioAtivo ? (
        <div className="login-btn">
          <div className="login-corpo">
            <h3 className="">Você é:</h3>
            <div className="grid grid-flow-col grid-rows-4 grid-cols-1 gap-4 login-btn-cont">
              {usuarios.map((usuario, index) => (
                <div key={index} className="container-login">
                  <div className="container-itens-login">
                    <p className="user">{usuario.nome}</p>
                    <button className='seta' onClick={() => handleUserClick(usuario.nome)}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14L22 14M22 14L16 20M22 14L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="14" cy="14" r="14" fill="white" fillOpacity="0.5" />
                      </svg>

                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="login-btn">
          <div className="login-corpo">
            <h3 className="">Entrar como <span style={{ color: "#FFC01D" }}>{usuarioAtivo}</span></h3>
            <form id='loginForm' onSubmit={login}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="senha">Senha:</label>
              <div className='campo-senha'>
                <input type={senhaVisivel ? "text" : "password"} id="senha" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button type="button" onClick={mostrarSenha} className='btn-mostrar'>{senhaVisivel ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.41992 19.5299C9.55992 20.0099 10.7699 20.2699 11.9999 20.2699C15.5299 20.2699 18.8199 18.1899 21.1099 14.5899C22.0099 13.1799 22.0099 10.8099 21.1099 9.39993C20.7799 8.87993 20.4199 8.38993 20.0499 7.92993" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.47 14.53L2 22" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 2L14.53 9.47" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                )}</button>
              </div>
              <button type="submit" className='btn-entrar'>Entrar</button>
              <div className={statusAtual}><span>{loginStatus}</span></div>
            </form>
            <button style={{ marginTop: "1rem", color: "#FFC01D" }} onClick={() => setUsuarioAtivo("")}>Voltar</button>
          </div>
        </div>
      )}
    </section>
  );
}