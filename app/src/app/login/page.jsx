"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import '../../styles/login.css';
import { useState } from "react";

export default function Login() {
  const [usuarioAtivo, setUsuarioAtivo] = useState("");

  const handleUserClick = () => {
    setUsuarioAtivo(nome);
  };

  const usuarios = [
    { nome: 'Administrador' },
    { nome: 'Aluno' },
    { nome: 'Motorista' },
    { nome: 'Responsável' }
  ]

  // caso a opção administrador ou motorista for selecionada, o usuario deverá logar com seu CPF, caso seja aluno ou responsavel, o usuario deverá logar com seu email
  const renderFormulario = () => {
    switch (usuarioAtivo.toLowerCase()) {
      case "administrador":
      case "motorista":
        return (
          <>
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" placeholder="Digite seu CPF" />
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />
          </>
        );
      case "aluno":
      case "responsável":
        return (
          <>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />
            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="login">
      <div className="imgLogin">
        <img src="" />
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
            <h3 className="">Entrar como {usuarioAtivo}</h3>
            <form action="">
              {renderFormulario()}
              <input type="submit" value="Entrar" />
            </form>
            <button
              style={{ marginTop: "1rem" }}
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