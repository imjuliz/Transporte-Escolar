// enviar mensagem

"use client"
import React, { useState } from 'react';
import '../../../globals.css';
import '../styles/mensagens.css'

export default function enviarMsg() {
  const mensagens = [
    {
      id: 1,
      valor: 'falta',
      label: 'Aluno Irá Faltar',
      descricao: 'Cancele a viagem do aluno de forma simples',
      backgroundColor: 'bg-[#DB3056]',
      bgSelected: 'bg-rose-800'
    },
    {
      id: 2,
      valor: 'local',
      label: 'Mudança de local',
      descricao: 'O embarque/desembarque do aluno será em outro endereço',
      backgroundColor: 'bg-[#76BF4C]',
      bgSelected: 'bg-lime-600'
    },
    {
      id: 3,
      valor: 'condicao',
      label: 'Condições Especiais',
      descricao: 'Envie uma observação sobre o aluno para obter cuidados especiais',
      backgroundColor: 'bg-[#0070E0]',
      bgSelected: 'bg-blue-700'
    },
    {
      id: 4,
      valor: 'obj',
      label: 'Objeto esquecido',
      descricao: 'O aluno esqueceu um objeto pessoal no ônibus',
      backgroundColor: 'bg-[#F88F01]',
      bgSelected: 'bg-amber-600'
    }

  ];

  const [selecionado, setSelecionado] = useState('falta'); //guarda a opção que está selecionada

  const handleChange = (valor) => {
    setSelecionado(valor); //atualiza a seleção
  };


  //colocar aqui as lógicas:
  // aluno - responsável
  // lógica para enviar a mensagem para o motorista correspondente

  return (
    <>
      <section className='informacoes'>
        <div className='page-indicador'>
          <h1>Enviar Mensagem</h1>
          <hr />
        </div>

        <div className="p-4 space-y-4">
          <div className=" flex gap-4">{/*grid grid-cols-2 justify-center items-center gap-4*/}
            {mensagens.map((msg) => (
              <label
                key={msg.valor} //classe dinâmica que muda de acordo com a mensagem selecionada
                className={`card-msg cursor-pointer text-white border ${msg.backgroundColor} rounded-[2vw] transition-all text-left ${selecionado === msg.valor
                  ? `selecionado ${msg.bgSelected} text-white border-blue-700` //card selecionado - se (selecionado === valor da msg) for verdadeiro, aplica esse estilo
                  : `nao-selecionado  text-gray-800 hover:border-blue-400`//card não selecionado - se for falso, aplica esse estilo
                  }`}
              >
                <input
                  type="radio"
                  name="motivo"
                  value={msg.valor}
                  checked={selecionado === msg.valor} //quando muda, atualiza o estado
                  onChange={() => handleChange(msg.valor)}
                  className="hidden"
                />
                <h3>{msg.label}</h3>
                <p>{msg.descricao}</p>
              </label>
            ))}
          </div>

          <div className='pt-4 flex flex-column'>

            <p className="mt-4">
              <strong>Motivo selecionado:</strong> {selecionado}
            </p>

            <div className='enviar-msg'>
              <input name='mensagem' placeholder='Mensagem'></input>
            </div>

            <select className="py-3 mt-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-5">
              <option value="">Selecionar aluno</option>
              <option value="filho1">Filho 1</option>
              <option value="filho2">Filho 2</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5 hover:bg-blue-700 transition duration-300 ease">Enviar Mensagem</button>

          </div>
        </div>
      </section>
    </>
  )


}