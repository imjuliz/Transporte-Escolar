'use client';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../styles/viagens.css';
import Image from 'next/image';
import MapaViagemAluno from '../../../../components/Mapa/MapaAluno.jsx';
import { useRouter, usePathname } from "next/navigation";

export default function RotaAluno() {
  useEffect(() => {
    document.title = 'EduTrip - Minha Rota';
  }, []);
  const router = useRouter();

  const [dadosViagem, setDadosViagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // valida se o usuario esta logado
  const [usuarioLogado, setUsuarioLogado] = useState(null); // null = ainda não sabe, true = logado, false = não logado
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    async function checarSessao() {
      try {
        const res = await fetch('http://localhost:3001/validar-sessao', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUsuarioLogado(true); // usuário está logado
        } else {
          setUsuarioLogado(false); // não está logado
          router.push('/login'); // redireciona para login
        }} catch (error) {
        console.error('Erro ao validar sessão:', error);
        setUsuarioLogado(false);
        router.push('/login'); // redireciona para login também em caso de erro
      } finally {
        setCarregando(false); // termina o carregamento em qualquer caso
      } }checarSessao();
  }, [router]);

  // informacoes p ser renderizado no mapa
  useEffect(() => {
    fetch('http://localhost:3001/viagem-mapa', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then(data => {
      setDadosViagem(data);
      setLoading(false);
      setError(null);
    })
    .catch(err => {
      setDadosViagem(null);
      setLoading(false);
      setError(err.message);
    });
}, []);

  if (loading) return <p>Carregando dados da viagem...</p>;
// caso nao haja viagens em andamento
  if (error || !dadosViagem || !dadosViagem.dados) {
  return (
    <div className='w-full h-screen justify-items-center content-center'>
    <div className='flex flex-col gap-10 items-center justify-center'>
      <Image
        src="/img/semViagensAndamento.svg"
        width={600}
        height={400}
        alt="Menino e menina esperando ônibus"
        className='404-img'
      />
      <p>Não há nenhuma viagem em andamento.</p>
      <button className="btn-viagens">
        <a href="./viagens">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="seta">
            <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className='text-viagens text-[#fff] no-underline m-0'>Ver viagens</p>
        </a>
      </button>
    </div>
    </div>
  );
}

  return (
    <section className="relative w-screen m-8">
      <MapaViagemAluno dados={dadosViagem.dados} />
    </section>
  );
}
