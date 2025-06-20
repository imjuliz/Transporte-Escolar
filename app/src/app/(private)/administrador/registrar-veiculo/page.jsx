"use client";
import { useState, useEffect } from "react";
import '../styles/registrar-veiculo.css'

export default function RegistrarVeiculo() {
useEffect(() => {
    document.title = 'EduTrip - Registrar Veículo';
  }, []);
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
{/*ENVIA PRO BACK*/}
    try {
      const response = await fetch("http://localhost:3001/registrar-veiculo", {
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
      alert("Veículo cadastrado com sucesso!");
      setResposta(JSON.stringify(data, null, 2));
      form.reset(); // limpa o formulário
    } else {
      if (data.code === "ER_DUP_ENTRY") {
        alert("Erro: já existe um veículo com essa placa.");
      } else {
        alert("Erro ao cadastrar veículo.");
      }}} catch (error) {
      console.error("Erro:", error);
      setResposta("Erro ao enviar os dados.");
    }};

  return (
    <>
      <div className='w-full'>
        <section className='cadastrar'>
          <div className='page-indicador'>
            <h1>Registrar Veículo</h1>
            <hr />
          </div>
        </section>
{/*FORMULÁRIO*/}
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
          <input type="text" id="placa" name="placa" required placeholder="Placa do Veículo" />
          <input type="text" id="capacidade" name="capacidade" required placeholder="Capacidade (ex: 20)" />
          <input type="text" id="motorista" name="motorista" required placeholder="ID do motorista" />
          <input type="text" id="modelo" name="modelo" required placeholder="Modelo" />
          <input type="text" id="marca" name="marca" required placeholder="Marca" />
          <input type="text" id="ano" name="ano" required placeholder="Ano de Fabricação"></input>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease">Registrar</button>
        </form>
      </div>
    </>
  );}