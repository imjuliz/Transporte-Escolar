"use client";
import './viagens.css'
import './teste.css'
import { useRef, useEffect, useState } from "react";

export default function Viagens() {
  // buusca dados do back
  const [motoristas, setMotoristas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/viagens', {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then((data) => {
        setMotoristas(data.infoveiculos || []);
      })
      .catch((error) => {
        console.error('Erro ao carregar viagens do motorista:', error);
        setMotoristas([]);
      });
  }, []);

  // p deixar a primeira letra da primeira palavra em maiusculo
  function primeiraLetraMaiuscula(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  return (
    <>
      <section className='navegacao'>
        <div className='page-indicador'>
          <h1>Viagens</h1>
          <hr />
        </div>
        <div className='chrome'>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {(motoristas || []).map((motorista, id, index) => (
              <li className="nav-item" role="presentation" key={index}>
                <button className={`barrinha nav-link ${id === 0 ? 'active' : ''}`}
                  id={`tab-${motorista.id_veiculo}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#content-${motorista.id_veiculo}`}
                  type="button"
                  role="tab"
                  aria-controls={`content-${motorista.id_veiculo}`}
                  aria-selected={id === 0 ? 'true' : 'false'}
                >
                  <img src={motorista.img || '/default-profile.png'} alt="" className='fotodeperfil' />
                  <p className='nomeAluno'>{motorista.nome_aluno}</p>
                </button>
              </li>
            ))}
          </ul>
          {/**Conteudo das tabs */}
          <div className="conteudo tab-content" id="myTabContent">
            {(motoristas || []).map((motorista, id, index) => (
              <div
                key={id}
                className={`tab-pane fade ${id === 0 ? 'show active' : ''}`}
                id={`content-${motorista.id_veiculo}`}
                role="tabpanel"
                aria-labelledby={`tab-${motorista.id_veiculo}`}
              >
                {(motorista.viagens || []).map((viagem, i) => {
                  const agora = new Date();
                  const [dia, mes, ano] = viagem.data.split('/');
                  const dataBase = new Date(`${ano}-${mes}-${dia}T00:00:00`);

                  // Função para criar horário completo com base na data da viagem
                  function criarHorarioCompleto(horaString, baseDate) {
                    const [h, m, s] = horaString.split(':');
                    const d = new Date(baseDate);
                    d.setHours(Number(h), Number(m), Number(s || 0), 0);
                    return d;
                  }

                  const horaEmbarque = criarHorarioCompleto(viagem.horaEmbarque, dataBase);
                  const horaSaida = criarHorarioCompleto(viagem.horaSaida, dataBase);

                  const corCirculo = (agora >= horaEmbarque && agora <= horaSaida) ? '#00B383' : '#ADAEB1';
                  return (
                    <div key={i} className="container-viagem flex flex-col gap-4 border ">
                      <div className='flex flex-wrap flex-row items-center'>
                        <svg className={`circle-t ${viagem.status === 'Em andamento' ? 'blink' : ''}`} width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill={corCirculo} />
                        </svg>
                        <p className='mb-0 text-[#8F9BB3]'>{viagem.data}</p>
                        <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3" />
                        </svg>

                        <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaSaida}</p>
                      </div>
                      <div className='titulo-status flex gap-4 items-center justify-between'>
                        <h3>{primeiraLetraMaiuscula(viagem.tipo)}</h3>
                        <div className='status'>{primeiraLetraMaiuscula(viagem.status)}</div>
                      </div>

                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}