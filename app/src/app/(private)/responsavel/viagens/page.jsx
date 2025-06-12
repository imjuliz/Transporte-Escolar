"use client";
import './viagens.css'
import { useEffect, useState } from "react";

export default function Viagens() {
  const [alunos, setAlunos] = useState([]);
  const [abaAlunoAtiva, setAbaAlunoAtiva] = useState(null);
  const [abaStatusAtiva, setAbaStatusAtiva] = useState('todos');

   {/*INFORMAÇÕES DOS FILHOS*/}
  useEffect(() => {
    fetch('http://localhost:3001/filhos', {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then((data) => {
        const filhos = data.infoFilhos || [];
        setAlunos(filhos);
        if (filhos.length > 0) {
          setAbaAlunoAtiva(filhos[0].id_aluno);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar alunos:', error);
        setAlunos([]);
      });
  }, []);

  function primeiraLetraMaiuscula(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function filtrarViagens(viagens, status) {
    if (status === 'todos') return viagens;
    return viagens.filter(v => v.status.toLowerCase() === status);
  }

  return (
    <section className='navegacao'>
      <div className='page-indicador'>
        <h1>Viagens</h1>
        <hr />
      </div>

      <div className='chrome'>
        {/* Abas dos filhos */}
        <ul className="nav nav-tabs" id="alunoTabs" role="tablist">
          {alunos.map((aluno) => (
            <li className="nav-item" role="presentation" key={aluno.id_aluno}>
              <button
                className={`barrinha nav-link ${abaAlunoAtiva === aluno.id_aluno ? 'active' : ''}`}
                type="button"
                onClick={() => setAbaAlunoAtiva(aluno.id_aluno)}>
                <img src={aluno.img || '/default-profile.png'} alt="" className='fotodeperfil' />
                <p className='nomeAluno'>{aluno.nome_aluno}</p>
              </button>
            </li>
          ))}
        </ul>
        {/* Sub-abas de status */}
        <ul className="nav nav-tabs mt-3" id="statusTabs" role="tablist">
          {['em andamento', 'agendada', 'concluída', 'todos'].map((status) => (
            <li className="nav-item" role="presentation" key={status}>
              <button
                className={`barrinha nav-link ${abaStatusAtiva === status ? 'active' : ''}`}
                type="button"
                onClick={() => setAbaStatusAtiva(status)} >
                {primeiraLetraMaiuscula(status)}
              </button>
            </li> ))}
        </ul>

        {/* Conteúdo das viagens */}
        <div className="conteudo tab-content" id="alunoConteudo">
          {alunos.map((aluno) => {
            if (aluno.id_aluno !== abaAlunoAtiva) return null;

            const viagensFiltradas = filtrarViagens(aluno.viagens || [], abaStatusAtiva);

            return (
              <div
                key={aluno.id_aluno}
                className="tab-pane fade show active" >
                {viagensFiltradas.length === 0 ? (
                  <p>Nenhuma viagem {primeiraLetraMaiuscula(abaStatusAtiva)}.</p>
                ) : viagensFiltradas.map((viagem, i) => {
                  const agora = new Date();
                  const [dia, mes, ano] = viagem.data.split('/');
                  const dataBase = new Date(`${ano}-${mes}-${dia}T00:00:00`);

                  function criarHorarioCompleto(horaStr, base) {
                    const [h, m, s] = horaStr.split(':');
                    const d = new Date(base);
                    d.setHours(Number(h), Number(m), Number(s || 0));
                    return d;}

                  const horaEmbarque = criarHorarioCompleto(viagem.horaEmbarque, dataBase);
                  const horaSaida = criarHorarioCompleto(viagem.horaSaida, dataBase);

                  const corCirculo = (agora >= horaEmbarque && agora <= horaSaida) ? '#00B383' : '#ADAEB1';

                  return (
                    <div key={i} className="container-viagem flex flex-col gap-4 border">
                      <div className='flex flex-wrap flex-row items-center'>
                        <svg className={`circle-t ${viagem.status === 'Em andamento' ? 'blink' : ''}`} width="10" height="11">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z"
                            fill={corCirculo} />
                        </svg>
                        <p className='mb-0 text-[#8F9BB3]'>{viagem.data}</p>
                        <svg className='circle' width="5" height="5">
                          <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3" />
                        </svg>
                        <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaSaida}</p>
                      </div>

                      <div className='titulo-status flex gap-4 items-center justify-between'>
                        <h3>{primeiraLetraMaiuscula(viagem.tipo)}</h3>
                        <div className='status'>{primeiraLetraMaiuscula(viagem.status)}</div>
                      </div></div>
                  ) })}
              </div>
            ); })}
        </div> </div>
    </section> );}
