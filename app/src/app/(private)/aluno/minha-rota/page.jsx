'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '../styles/viagens.css';

// export default function MinhaRotaAluno() {
//     const [usuario, setUsuario] = useState(null);

//     useEffect(() => {
//         const usuarioSalvo = localStorage.getItem("usuario");

//         if (usuarioSalvo) {
//             try {
//                 const usuarioObj = JSON.parse(usuarioSalvo);
//                 console.log("Dados recuperados do localStorage:", usuarioObj);

//                 if (usuarioObj.id) {
//                     setUsuario(usuarioObj);
//                 } else {
//                     console.error("ID do usuário está ausente.");
//                 }
//             } catch (error) {
//                 console.error("Erro ao parsear localStorage:", error);
//             }
//         } else {
//             console.error("Nenhum usuário encontrado no localStorage.");
//         }
//     }, []);

//     if (!usuario) {
//         return <p>Carregando informações do usuário...</p>;
//     }

//     return (
//         <section className="relative w-screen m-8">
//         <Mapa usuarioId={usuario.id} tipoUsuario={usuario.tipo} className="h-full"/>
//         </section>
//     );
// }

import MapaViagemAluno from '../../../../components/Mapa/MapaAluno.jsx';
import { useRouter, usePathname } from "next/navigation";

export default function RotaAluno() {
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
        }
      } catch (error) {
        console.error('Erro ao validar sessão:', error);
        setUsuarioLogado(false);
        router.push('/login'); // redireciona para login também em caso de erro
      } finally {
        setCarregando(false); // termina o carregamento em qualquer caso
      }
    }
    checarSessao();
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
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando dados da viagem...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!dadosViagem || !dadosViagem.dados) return <p>Dados da viagem não encontrados.</p>;

  return (
    <section className="relative w-screen m-8">
      <MapaViagemAluno dados={dadosViagem.dados} />
    </section>
  );
}
