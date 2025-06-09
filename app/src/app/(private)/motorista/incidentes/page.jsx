"use client";

import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import Image from 'next/image'
import '../../../globals.css';
import './incidentes2.css'

export default function incidentes() {

    const incidentes = [
        {
            id: 1,
            valor: 'congestionamento',
            label: 'Congestionamento',
            descricao: 'O embarque dos alunos irá atrazar alguns minutos',
            backgroundColor: 'bg-[#DB3056]',
            bgSelected: 'bg-rose-800',
imagem: '/img/bolinhasVermelha.svg'
        },
        {
            id: 2,
            valor: 'rota',
            label: 'Mudança de rota',
            descricao: 'Ocorreu uma mudança de rota no trajeto',
            backgroundColor: 'bg-[#76BF4C]',
            bgSelected: 'bg-lime-600',
            imagem: '/img/bolinhasVerde.svg'
        },
        {
            id: 3,
            valor: 'emergencia',
            label: 'Emergência médica',
            descricao: 'Um aluno passou mal no trajeto de ida/volta.',
            backgroundColor: 'bg-[#0070E0]',
            bgSelected: 'bg-blue-700',
            imagem: '/img/bolinhasAzul.svg'
        },
        {
            id: 4,
            valor: 'veiculo',
            label: 'Problema no veículo',
            descricao: 'Ocorreu um problema mecânico no ônibus escolar.',
            backgroundColor: 'bg-[#F88F01]',
            bgSelected: 'bg-amber-600',
            imagem: '/img/bolinhasAmarela.svg'
        }
    ];

    const [selecionado, setSelecionado] = useState('falta'); //guarda a opção que está selecionada

    const handleChange = (valor) => {
        setSelecionado(valor); //atualiza a seleção
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {};
         try {
            const response = await fetch('http://localhost:3001/enviarIncidente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: /*JSON.stringify(formData)*/{
                    remetente: req.session.usuario.email,
                    tipo: selecionado,
                    mensagem:form.mensagem
                },
                credentials: 'include'
            });
            const data = await response.json();
            setResposta(JSON.stringify(data, null, 2));

        } catch (error) {
            console.error('Erro:', error);
        }
    };
    //colocar aqui as lógicas de motorista enviar a mensagem, pode ser direto pro aluno ou para todos os alunos do ônibus da viagem

    return (
        <>
            <section className='informacoes'>
        <div className='page-indicador'>
          <h1>Registrar Incidentes</h1>
          <hr/>
                </div>

                <div className="p-4 space-y-4">
                    <div className=" flex gap-4 justify-center">{/*grid grid-cols-2 justify-center items-center gap-4*/}
                        {incidentes.map((incidente) => (
                            <label
                                key={incidente.valor} //classe dinâmica que muda de acordo com a mensagem selecionada
                                className={`card-msg cursor-pointer text-white border ${incidente.backgroundColor} rounded-[2vw] transition-all text-left w-300px ${selecionado === incidente.valor
                                    ? `selecionado ${incidente.bgSelected} text-white border-blue-700` //card selecionado - se (selecionado === valor da msg) for verdadeiro, aplica esse estilo
                                    : `nao-selecionado  text-gray-800 hover:border-blue-400`//card não selecionado - se for falso, aplica esse estilo
                                    }`}>
                                <input
                                    type="radio"
                                    name="motivo"
                                    value={incidente.valor}
                                    checked={selecionado === incidente.valor} //quando muda, atualiza o estado
                                    onChange={() => handleChange(incidente.valor)}
                                    className="hidden"/>
                                <h3>{incidente.label}</h3>
                                <p>{incidente.descricao}</p>
                                <img src={incidente.imagem} className='bolinhas'></img>
                            </label>
                        ))}
                    </div>
<form>
                    <div className='pt-4 flex flex-column'>

                        <p className="mt-4">
                            <strong>Motivo selecionado:</strong> {selecionado}
                        </p>

                        <div className='enviar-msg'>
                            <input name='mensagem' placeholder='Mensagem'></input>
                        </div>

                        <select className="py-3 mt-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 mb-3">
                            <option value="">Selecionar aluno</option>
                            <option value="aluno1">Aluno 1</option>
                            <option value="aluno2">Aluno 2</option>
                            <option value="aluno3">Aluno 3</option>
                            <option value="aluno4">Aluno 4</option>
                        </select>
                        <label htmlFor="checkbox ">
                            <input type="checkbox" id="checkbox" className='todos' name="meuCheckbox"></input>
                            Todos
                        </label>
                        <button type="submit" onSubmit={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mb-5 mt-4 hover:bg-blue-700 transition duration-300 ease">Enviar Mensagem</button>
                    </div>
                    </form>
                </div>
            </section>
        </>)}