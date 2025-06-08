// app/dashboard/motorista/rota/page.jsx
'use client';
import MapaViagemMotorista from '../../../../components/Mapa/MapaMotorista.jsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RotaMotorista() {
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
      }
    }
    checarSessao();
  }, [router]);

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
  if (error) return <p>Erro: {error}</p>;
  if (!dadosViagem || !dadosViagem.origem) return <p>Dados da viagem não encontrados.</p>;

  return (
    <section className="relative w-screen m-8">
      <MapaViagemMotorista dados={dadosViagem} />
    </section>
  );
}
