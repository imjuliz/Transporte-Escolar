"use client";
import '../styles/rotas.css'
import { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';



export default function Viagens() {
  const router = useRouter();

  // busca dados do back
  const [viagens, setViagens] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('todos'); // Estado da aba ativa
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function checarSessao() {
      try {
        const res = await fetch("http://localhost:3001/validar-sessao", {
          credentials: "include",
        });
        if (res.ok) {
          setUsuarioLogado(true);
        } else {
          setUsuarioLogado(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao validar sessão:", error);
        setUsuarioLogado(false);
        router.push("/login");
      } finally {
        setCarregando(false);
      }
    }
    checarSessao();
  }, [router]);

  useEffect(() => {
    fetch('http://localhost:3001/viagens-historico', {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar viagens do aluno');
        return res.json();
      })
      .then((data) => {
        const viagensExtraidas = data.infoViagens?.flatMap(info => info.viagens?.map(viagem => ({
          ...viagem,
          nome_aluno: info.nome_aluno,
          id_aluno: info.id_aluno,
          endereco_embarque: info.endereco_embarque,
          nome_escola: info.nome_escola
        }))) || [];
      
        setViagens(viagensExtraidas);
      })
      
      .catch((error) => {
        console.error('Erro ao carregar viagens:', error);
        setViagens([]);
      });
  }, []);
  

  if (loading || carregando) return <p>Carregando dados da viagem...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;
  if (!infoFilhos) return <p>Nenhum dado encontrado.</p>;

  // Filtra o filho selecionado
  const filhoAtual = infoFilhos.find((f) => f.id_aluno === filhoSelecionado);

  // Pega a primeira viagem ativa do filho para mostrar no mapa (ajuste conforme quiser)
  const viagem = filhoAtual?.viagens?.[0];

  // Dados para o mapa: tem que conter pontoInicial e pontoFinal no seu backend para cada viagem
  // Se não tiver, adapte conforme seu retorno do backend
  const dadosMapa = viagem
    ? {
      origem: filhoAtual.pontoInicial || filhoAtual.viagens[0].pontoInicial, // ajustar conforme seu dado
      destino: filhoAtual.pontoFinal || filhoAtual.viagens[0].pontoFinal,
    }: null;
  return (
    <>
    <section className='navegacao'>
      <div className='page-indicador'>
        <h1>Viagens</h1>
        <hr />
      </div>
      <div className='chrome'>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`barrinha nav-link ${abaAtiva === 'em andamento' ? 'active' : ''}`}
              type="button"
              onClick={() => setAbaAtiva('em andamento')}
              aria-selected={abaAtiva === 'em andamento'}
            >
              Em andamento
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`barrinha nav-link ${abaAtiva === 'agendada' ? 'active' : ''}`}
              type="button"
              onClick={() => setAbaAtiva('agendada')}
              aria-selected={abaAtiva === 'agendada'}
            >
              Agendada
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`barrinha nav-link ${abaAtiva === 'concluida' ? 'active' : ''}`}
              type="button"
              onClick={() => setAbaAtiva('concluida')}
              aria-selected={abaAtiva === 'concluida'}
            >
              Concluída
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`barrinha nav-link ${abaAtiva === 'todos' ? 'active' : ''}`}
              type="button"
              onClick={() => setAbaAtiva('todos')}
              aria-selected={abaAtiva === 'todos'}
            >
              Todos
            </button>
          </li>
        </ul>

        <div className="conteudo tab-content" id="myTabContent">
          {(viagens || []).map((viagem, idx) => {
           const viagensFiltradas = filtrarViagensPorAba(viagens || [], abaAtiva);

            return (
              <div
                key={idx}
                className={`tab-pane fade show active`} // sempre mostra para o viagem, pois filtro é geral
                id={`content-${viagem.id_aluno}`}
                role="tabpanel"
                aria-labelledby={`tab-${viagem.id_aluno}`}
              >
                {viagensFiltradas.length === 0 && (
                  <p>Nenhuma viagem {primeiraLetraMaiuscula(abaAtiva)}.</p>
                )}

                {viagensFiltradas.map((viagem, i) => {
                  const agora = new Date();
                  const [dia, mes, ano] = viagem.data.split('/');
                  const dataBase = new Date(`${ano}-${mes}-${dia}T00:00:00`);

                  // Função para criar horário completo com base na data da viagem
                  function criarHorarioCompleto(horaString, baseDate) {
                    if (!horaString || typeof horaString !== 'string') return null;
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

                        <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaSaída}</p>
                      </div>
                      <div className='titulo-status flex gap-4 items-center justify-between'>
                        <h3>{primeiraLetraMaiuscula(viagem.tipo)}</h3>
                        <div className='status'>{primeiraLetraMaiuscula(viagem.status)}</div>
                      </div>

                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  </>
)
}
