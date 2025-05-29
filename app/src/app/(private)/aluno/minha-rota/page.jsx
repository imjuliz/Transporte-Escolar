'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

export default function MapaRotas() {
  const [rotas, setRotas] = useState([]);

  fetch('http://localhost:3001/aluno/minha-rota', { credentials: 'include' })
  .then(res => res.json())
  .then(data => console.log('Dados retornados pela API:', data))
  .catch(err => console.error('Erro ao buscar rota:', err));

  useEffect(() => {
    if (rotas.length === 0) return;

    const map = L.map('mapa').setView([-20.909, -48.64], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    rotas.forEach((rota, i) => {
      const waypoints = [
        L.latLng(rota.ponto_embarque.latitude, rota.ponto_embarque.longitude),
        L.latLng(rota.escola.latitude, rota.escola.longitude)
      ];

      const controle = L.Routing.control({
        waypoints,
        routeWhileDragging: false,
        createMarker: function () { return null; }
      });

      const agora = new Date();
      const [h, m] = (rota.horario_embarque || "00:00").split(':').map(Number);
      const horarioAlvo = new Date();
      horarioAlvo.setHours(h, m, 0, 0);

      const delay = horarioAlvo - agora;
      const iniciar = () => controle.addTo(map);

      if (delay > 0) {
        setTimeout(iniciar, delay);
      } else {
        iniciar();
      }
    });

    return () => map.remove();
  }, [rotas]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h2 className="text-2xl font-semibold mb-4">Minha rotas</h2>
      <div id="mapa" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
}
