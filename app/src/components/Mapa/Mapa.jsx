'use client';
import { useEffect, useState } from 'react';
import MapaAluno from './MapaAluno.jsx';
import MapaMotorista from './MapaMotorista.jsx';
import MapaResponsavel from './MapaResponsavel.jsx';

export default function Mapa({ usuarioId, tipoUsuario }) {
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState(null);

    const tipoUsuarioFormatado = tipoUsuario?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() ?? "";

    useEffect(() => {
        if (!usuarioId || !tipoUsuarioFormatado) {
            setErro("Erro: tipoUsuario ou usuarioId estão indefinidos.");
            return;
        }

        async function carregarDados() {
            try {
                const response = await fetch(`http://localhost:3001/viagem/${tipoUsuarioFormatado}/${usuarioId}`, { credentials: 'include' });
                const data = await response.json();

                if (data.erro) {
                    setErro(data.erro);
                } else {
                    setDados(data.dados);
                }
            } catch (error) {
                console.error("Erro ao carregar viagem:", error);
                setErro("Erro ao buscar dados da viagem.");
            }
        }
        carregarDados();
    }, [usuarioId, tipoUsuarioFormatado]);

    if (erro) {
        return <p style={{ color: 'red' }}>{erro}</p>;
    }

    if (!dados) {
        return <p>Carregando informações da viagem...</p>;
    }
    return (
        <>
            {tipoUsuarioFormatado === 'aluno' && dados?.ponto && dados?.escola && (<MapaAluno ponto={dados.ponto} escola={dados.escola} />)}
            {tipoUsuarioFormatado === 'motorista' && <MapaMotorista motoristaId={usuarioId} />}
            {tipoUsuarioFormatado === 'responsavel' && <MapaResponsavel viagens={dados} />}
        </>
    );
}