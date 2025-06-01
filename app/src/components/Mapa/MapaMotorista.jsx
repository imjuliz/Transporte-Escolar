'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from './Leaflet.jsx';

export default function MapaMotorista({ motoristaId }) {
    const [viagem, setViagem] = useState(null);
    const [erro, setErro] = useState(null);

    console.log("Renderizando MapaMotorista - Viagem Atual:", viagem);

    useEffect(() => {
        async function carregarViagemAtual() {
            try {
                const response = await fetch(`http://localhost:3001/viagem/motorista/${motoristaId}`);
                const data = await response.json();

                console.log("Resposta da API no front-end:", data); 

                if (data.erro) {
                    console.error("Erro ao buscar viagem do motorista:", data.erro);
                    setErro(data.erro);
                } else {
                    setViagem(data.dados);
                }
            } catch (error) {
                console.error("Erro ao conectar com o servidor:", error);
                setErro("Erro ao conectar com o servidor.");
            }
        }

        if (motoristaId) {
            carregarViagemAtual();

            const interval = setInterval(() => {
                carregarViagemAtual();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [motoristaId]);

    if (erro) {
        return <div style={{ color: "red" }}>{erro}</div>;
    }

    if (!viagem) {
        return <div>Carregando viagem atual...</div>;
    }

    return (
        <div className="mapa-container">
            <MapContainer center={[viagem.pontoInicial.lat, viagem.pontoInicial.lng]} zoom={14} className="leaflet-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Polyline
                    positions={[
                        [viagem.pontoInicial.lat, viagem.pontoInicial.lng],
                        [viagem.pontoFinal.lat, viagem.pontoFinal.lng]
                    ]}
                    color={viagem.status === 'em_andamento' ? 'blue' : 'gray'}
                />

                <Marker position={[viagem.pontoInicial.lat, viagem.pontoInicial.lng]}>
                    <Popup>
                        <h3>Ponto Inicial</h3>
                        <p>Saída às {viagem.hora_saida}</p>
                    </Popup>
                </Marker>

                <Marker position={[viagem.pontoFinal.lat, viagem.pontoFinal.lng]}>
                    <Popup>
                        <h3>Ponto Final</h3>
                        <p>Chegada prevista às {viagem.hora_chegada_prevista}</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}