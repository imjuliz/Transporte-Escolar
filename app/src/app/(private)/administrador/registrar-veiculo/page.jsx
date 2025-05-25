"use client";
import { useState } from "react";

{/**é preciso ajustar para que as rotas de registrar fiquem separadas para cada tipo de aluno (ex: o admin clica em registrar aluno, e vai ser um formulario só para registrar alunos) */}
export default function RegistrarVeiculo() {

    const [resposta, setResposta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Pegando os dados do formulário
    //id_veiculo, motorista_cpf, fabricacao, instituicao_id
    const formData = {
      motorista_cpf: form.cpf.value,
      fabricacao: form.fabricacao.value,
      placa: form.placa.value,
      modelo: form.modelo.value,
      marca: form.marca.value,
      
    };

    try {
      const response = await fetch("http://localhost:3001/api/registrar-veiculo", {
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
      <h1>Registrar Veículo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="motorista_cpf">CPF do motorista:</label>
        <input type="text" id="cpf" name="cpf" required />

        <label htmlFor="fabricacao">Data de fabricação:</label>
        <input type="text" id="fabricacao" name="fabricacao" required />

        <label htmlFor="placa">Placa:</label>
        <input type="text" id="placa" name="placa" required />

        <label htmlFor="modelo">Modelo:</label>
        <input type="text" id="modelo" name="modelo" required />

        <label htmlFor="marca">Marca:</label>
        <input type="text" id="marca" name="marca" required />

        <button type="submit">Registrar Veículo</button>
      </form>

      <div>
        <strong>Resposta do servidor:</strong>
        <pre>{resposta}</pre>
      </div>
    </>
  );

}