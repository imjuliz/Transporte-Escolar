"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import '../../styles/login.css';
import embarque from '../motorista/embarqueDesembarque/page';
// import './validação.js';
import router from '../../../../server/routes/authRotas.js'
import { useState } from "react";
import { useRouter } from 'next/navigation'; 


export default function Login() {
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

  // envia credenciais para o backend
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const tipo = usuarioAtivo
        .normalize("NFD") // p deixar sem acento
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase(); // p deixar minusculo
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: document.getElementById("email").value, senha: document.getElementById("senha").value, tipo: tipo }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("token", dados.token);
        alert("Login realizado com sucesso!");
        // redirecionar o usuário para a página correta com base no tipo de perfil dele
        switch (dados.tipo) {
          case 'administrador':
            router.push('/administrador/dashboard');
            break;
          case 'aluno':
            router.push('/aluno/perfil');
            break;
          case 'motorista':
           router.push('../motorista/embarqueDesembarque/page.jsx');
            break;
          case 'responsavel':
            router.push('/responsavel/dashboard');
            break;
        }
      } else {
        alert(dados.mensagem);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } };

  /*
    // caso a opção administrador ou motorista for selecionada, o usuario deverá logar com seu CPF, caso seja aluno ou responsavel, o usuario deverá logar com seu email
    const renderFormulario = () => {
      switch (usuarioAtivo.toLowerCase()) {
        case "administrador":
        case "motorista":
          return (
            <>
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" ref={cpfRef} placeholder="Digite seu CPF" />
            </>
            );
        case "aluno":
        case "responsável":
          return (
            <>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Digite seu email" />
            </>
          );
        default:
          return null;
      }
    };
    // formatação de cpf
    const cpfRef = useRef(null); // referência para o input de CPF para que seja possivel fazer a validação/formatação depois da renderização
    useEffect(() => {
      if (cpfRef.current) {
        cpfRef.current.addEventListener("input", (e) => {
          let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
          value = value.slice(0, 11); // limite de 11 digitos
          value = value.replace(/^(\d{3})(\d)/, "$1.$2"); // adiciona o primeiro ponto
          value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3"); // adiciona o segundo ponto
          value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"); // adiciona o traço
          e.target.value = value;
        });
      }
    }, [usuarioAtivo]);
  */
  return (
    <section className="login">
      <div className="imgLogin">
        {/* <img src="" /> */}
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
                    <button onClick={() => handleUserClick(usuario.nome)}>
                      <img src="./img/btn-user.svg" />
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
            <form onSubmit={handleLogin} id='loginForm'>
              {/* {renderFormulario()} */}
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Digite seu email" />
              <label htmlFor="senha">Senha:</label>
              <div className='campo-senha'>
                <input type={senhaVisivel ? "text" : "password"} id="senha" placeholder="Digite sua senha" />
                <button type="button" onClick={mostrarSenha} className='btn-mostrar' click="handleLogin">{senhaVisivel ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17.8201 5.76998C16.0701 4.44998 14.0701 3.72998 12.0001 3.72998C8.47009 3.72998 5.18009 5.80998 2.89009 9.40998C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.41992 19.5299C9.55992 20.0099 10.7699 20.2699 11.9999 20.2699C15.5299 20.2699 18.8199 18.1899 21.1099 14.5899C22.0099 13.1799 22.0099 10.8099 21.1099 9.39993C20.7799 8.87993 20.4199 8.38993 20.0499 7.92993" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.47 14.53L2 22" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 2L14.53 9.47" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z" stroke="#737A80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                )}</button>
              </div>
              <button type="submit" className='btn-entrar'>Entrar</button>
            </form>
            <button
              style={{ marginTop: "1rem", color: "#FFC01D" }}
              onClick={() => setUsuarioAtivo("")}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}