"use client";
import { useState } from "react";
import '../styles/registrar-veiculo.css'

export default function RegistrarEscola() {

  const [resposta, setResposta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    // Pegando os dados do formulário
    const formData = {
      nome: form.nome.value,
      endereco: form.endereco.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value
    };
{/*ENVIO PARA O BACK*/}
    try {
      const response = await fetch("http://localhost:3001/cadastro/cadastroEscolas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      setResposta(JSON.stringify(data, null, 2));

      //alert 
      if (response.ok) {
      alert("Escola cadastrada com sucesso!");
      setResposta(JSON.stringify(data, null, 2));
      form.reset(); // limpa o formulário
    } else {
        alert("Erro ao cadastrar escola.");
      } } catch (error) {
      console.error("Erro:", error);
      setResposta("Erro ao enviar os dados.");
    }};


  return (
    <>
      <div className='w-full'>
        <section className='cadastrar'>
          <div className='page-indicador'>
            <h1>Registrar Escola</h1>
            <hr />
          </div>
        </section>
{/*FORMULÁRIO */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
          {/*<label htmlFor="motorista_cpf">CPF do motorista:</label>*/}
          <input type="text" id="nome" name="nome" required placeholder="Nome da escola" />

          {/*<label htmlFor="fabricacao">Data de fabricação:</label>*/}
          <input type="text" id="endereco" name="endereco" required placeholder="Endereço (ex: Rua Santo André, 680)" />

          {/*<label htmlFor="placa">Placa:</label>*/}
          <input type="text" id="latitude" name="latitude" required placeholder="Latitude (ex: -20.912700)" />

          {/*<label htmlFor="modelo">Modelo:</label>*/}
          <input type="text" id="longitude" name="longitude" required placeholder="Longitude (ex: 46.33280)" />


          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease">Registrar Escola</button>
        </form>
      </div>
    </>
  );}