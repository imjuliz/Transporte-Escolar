'use client';

import { useEffect, useState } from 'react';
import MapaAluno from './MapaAluno.jsx';
import MapaMotorista from './MapaMotorista.jsx';
import MapaResponsavel from './MapaResponsavel.jsx';

export default function Mapa() {
    const [tipo, setTipo] = useState(null);
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/usuarios/minha-rota', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.erro || data.mensagem) {
                    setErro(data.erro || data.mensagem);
                } else {
                    setTipo(data.tipo);
                    setDados(data.dados || data.viagens);
                }

            })
            .catch(err => {
                console.error('Erro na requisição:', err);
                setErro('Erro ao carregar dados do mapa');
            });
    }, []);

    if (erro) return <p>{erro}</p>;
    if (!tipo || !dados) return <p>Carregando mapa...</p>;

    return (
        <>
            {tipo === 'aluno' && <MapaAluno ponto={dados.ponto} escola={dados.escola} />}
            {tipo === 'motorista' && <MapaMotorista viagens={dados} />}
            {tipo === 'responsável' && <MapaResponsavel viagens={dados} />}
        </>
    );
}
