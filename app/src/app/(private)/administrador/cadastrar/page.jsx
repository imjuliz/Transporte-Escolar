"use client";
import { useState } from "react";

{/**é preciso ajustar para que as rotas de registrar fiquem separadas para cada tipo de aluno (ex: o admin clica em registrar aluno, e vai ser um formulario só para registrar alunos) */}
export default function RegistrarUsuario() {
  const [resposta, setResposta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Pegando os dados do formulário
    const formData = {
      cpf: form.cpf.value,
      email: form.email.value,
      senha: form.senha.value,
      tipo: form.tipo.value,
    };

    try {
      const response = await fetch("http://localhost:3001/api/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // <-- importante
          ///*"Authorization": "Bearer SEU_TOKEN_AQUI"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResposta(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Erro:", error);
      setResposta("Erro ao enviar os dados.");
    }
  };

  return (
    <>
      <h1>Registrar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" required />

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required />

        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required />

        <label htmlFor="tipo">Tipo de Usuário</label>
        <input type="text" id="tipo" name="tipo" required />

        <button type="submit">Registrar Usuário</button>
      </form>

      <div>
        <strong>Resposta do servidor:</strong>
        <pre>{resposta}</pre>
      </div>
    </>
  );
}
