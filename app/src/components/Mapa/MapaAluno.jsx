'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Polyline } from './Leaflet.jsx';

export default function MapaAluno({ ponto, escola }) {
  const [posicaoAtual, setPosicaoAtual] = useState(null);

  useEffect(() => {
    if (!ponto || !escola) return;

    const steps = 100;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      const lat = ponto.lat + (escola.lat - ponto.lat) * (current / steps);
      const lng = ponto.lng + (escola.lng - ponto.lng) * (current / steps);
      setPosicaoAtual({ lat, lng });

      if (current >= steps) clearInterval(interval);
    }, 3000); // tempo que o cursor do veiculo se move
    return () => clearInterval(interval);
  }, [ponto, escola]);

  if (!ponto || !escola || !ponto.lat || !ponto.lng || !escola.lat || !escola.lng) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        center={ponto}
        zoom={16}
        className="leaflet-container hs-leaflet h-full w-full z-10"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <Marker position={ponto}>
          <Popup>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                Ponto de Embarque
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                Local onde o aluno embarca.
              </p>
            </div>
          </Popup>
        </Marker>
      <Marker position={escola}>
          <Popup>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200">
                Escola
              </h3>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                Destino final da viagem do aluno.
              </p>
            </div>
          </Popup>
        </Marker>
      {posicaoAtual && <Marker position={posicaoAtual} />}
      <Polyline positions={[ponto, escola]} />
      </MapContainer>
    </div>
  );
}


