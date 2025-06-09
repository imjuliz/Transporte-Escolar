"use client";
import { useState } from "react";
import '../styles/registrar-veiculo.css'

{/**é preciso ajustar para que as rotas de registrar fiquem separadas para cada tipo de aluno (ex: o admin clica em registrar aluno, e vai ser um formulario só para registrar alunos) */ }
export default function RegistrarVeiculo() {

  const [resposta, setResposta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Pegando os dados do formulário
    const formData = {
      placa: form.placa.value,
      capacidade: form.capacidade.value,
      motorista_id: form.motorista.value,
      modelo: form.modelo.value,
      marca: form.marca.value,
      anoFabricacao: form.ano.value

    };

    try {
      const response = await fetch("http://localhost:3001/registrar-veiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // <-- importante
          ///*"Authorization": "Bearer SEU_TOKEN_AQUI"
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      setResposta(JSON.stringify(data, null, 2));

      //alert 
      if (response.ok) {
      alert("Veículo cadastrado com sucesso!");
      setResposta(JSON.stringify(data, null, 2));
      form.reset(); // limpa o formulário
    } else {
      if (data.code === "ER_DUP_ENTRY") {
        alert("Erro: já existe um veículo com essa placa.");
      } else {
        alert("Erro ao cadastrar veículo.");
      }}

    } catch (error) {
      console.error("Erro:", error);
      setResposta("Erro ao enviar os dados.");
    }


  };


  return (
    <>
      <div className='w-full'>
        <section className='cadastrar'>
          <div className='page-indicador'>
            <h1>Registrar Veículo</h1>
            <hr />
          </div>
        </section>


        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
          {/*<label htmlFor="motorista_cpf">CPF do motorista:</label>*/}
          <input type="text" id="placa" name="placa" required placeholder="Placa do Veículo" />

          {/*<label htmlFor="fabricacao">Data de fabricação:</label>*/}
          <input type="text" id="capacidade" name="capacidade" required placeholder="Capacidade (ex: 20)" />

          {/*<label htmlFor="placa">Placa:</label>*/}
          <input type="text" id="motorista" name="motorista" required placeholder="ID do motorista" />

          {/*<label htmlFor="modelo">Modelo:</label>*/}
          <input type="text" id="modelo" name="modelo" required placeholder="Modelo" />

          {/*<label htmlFor="marca">Marca:</label>*/}
          <input type="text" id="marca" name="marca" required placeholder="Marca" />

          <input type="text" id="ano" name="ano" required placeholder="Ano de Fabricação"></input>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease">Registrar</button>
        </form>


      </div>
    </>
  );

}