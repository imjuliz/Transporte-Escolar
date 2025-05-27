'use client';
import '../styles/minha-rota.css';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MinhaRota() {
  useEffect(() => {
    const mapWrapper = document.getElementById('hs-change-city-leaflet-wrapper');
    const mapContainer = document.getElementById('hs-change-city-leaflet');
    if (!mapWrapper || !mapContainer) return;

    // evitar erro de múltiplas inicializações
    if (mapContainer._leaflet_id != null) {
      mapContainer._leaflet_id = null;
    }

    const customSvgIcon = `
      data:image/svg+xml,
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
    `;

    const map = L.map('hs-change-city-leaflet', {
      center: [-20.907222, -48.641389], // Monte Azul Paulista
      zoom: 16,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ],
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 40,
      minZoom: 2,
      attribution: '© <a href="https://github.com/imjuliz/Transporte-Escolar">Transporte Escolar</a>'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: customSvgIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const popupContent = `
      <div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200">Monte Azul Paulista</h3>
        <div class="texto-monte text-sm text-gray-500 dark:text-neutral-500">
          Monte Azul Paulista é um município brasileiro do estado de São Paulo.
          Localiza-se a uma latitude 20º54’26” sul e a uma longitude 48º38’29” oeste.
        </div>
      </div>
    `;

    L.marker([-20.907222, -48.641389], { icon: customIcon })
      .bindPopup(popupContent)
      .addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
    <div id="hs-change-city-leaflet-wrapper" className='mapContainer'>
      <div id="hs-change-city-leaflet" style={{ height: '100vh', width: '100%' }}></div>
    </div>

    <div>
      <h4>Próxima parada:</h4>
      <p>Parada tal</p>
    </div>
    <div>
      <h4>Endereço:</h4>
      <p>endereço tal</p>
    </div>
    <button></button>
    </>
  );
}
