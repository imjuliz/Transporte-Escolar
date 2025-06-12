'use client';
import MapaViagemMotorista from '../../../../components/Mapa/MapaMotorista.jsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './viagens.css'

export default function RotaMotorista() {
  useEffect(() => {
    document.title = 'EduTrip - Minha Rota';
  }, []);

  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [dadosViagem, setDadosViagem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checarSessao() {
      try {
        const res = await fetch('http://localhost:3001/validar-sessao', {
          credentials: 'include'
        });
        if (res.ok) {
          setUsuarioLogado(true);
        } else {
          setUsuarioLogado(false);
          router.push('/login');
        }
      } catch (e) {
        setUsuarioLogado(false);
        router.push('/login');
      } finally {
        setCarregando(false);
      } }
    checarSessao();
  }, [router]);

  //BUSCA OS DADOS DA VIAGEM
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
        if (data.tipo === 'motorista') {
          setDadosViagem(data.dados);
        } else {
          setError('Você não é um motorista.');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (carregando) return <p>Verificando sessão...</p>;

   if (error || !dadosViagem || !dadosViagem.origem) {
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
      <MapaViagemMotorista dados={dadosViagem} />
    </section>
  );
}
