'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const ViagemAtivaMap = () => {
  const [rotas, setRotas] = useState([]);
  const [erroMensagem, setErroMensagem] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/viagem-mapa', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          setErroMensagem(data.erro);
        } else if (Array.isArray(data.rotas)) {
          setRotas(data.rotas);
        } else {
          setErroMensagem('Dados de rota inválidos');
        }
      })
      .catch(() => {
        setErroMensagem('Erro ao carregar dados do servidor');
      });
  }, []);

  useEffect(() => {
    if (!Array.isArray(rotas) || rotas.length === 0) return;

    const mapaDiv = document.getElementById('hs-custom-pin-leaflet');
    if (!mapaDiv) return;

    // Evita recriar múltiplos mapas
    if (mapaDiv._leaflet_id) return;

    const mapa = L.map('hs-custom-pin-leaflet').setView([-20.9, -48.5], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapa);

    rotas.forEach(({ origem, destino }) => {
      L.marker(origem).addTo(mapa).bindPopup('Origem').openPopup();
      L.marker(destino).addTo(mapa).bindPopup('Destino');

      L.Routing.control({
        waypoints: [L.latLng(...origem), L.latLng(...destino)],
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        createMarker: () => null, // não duplicar marcadores
      }).addTo(mapa);
    });

    // Remove mapa ao desmontar
    return () => {
      mapa.remove();
    };
  }, [rotas]);

  return (
    <div className="w-full h-full relative">
      {erroMensagem && <div className="absolute top-0 left-0 p-2 text-red-600">{erroMensagem}</div>}
      <div id="hs-custom-pin-leaflet" className="h-100 hs-leaflet z-10" style={{ height: '100%' }}></div>
    </div>
  );
};

export default ViagemAtivaMap;
