"use client"
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';


const MapaViagemAluno = ({ dados }) => {
  if (!dados || !dados.origem || !dados.destino) {
    return <p>Carregando dados do mapa...</p>;
  }

  const { origem, destino } = dados;

  const origemLatLng = [origem.lat, origem.lng];
  const destinoLatLng = [destino.lat, destino.lng];

  const origemIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const destinoIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/167/167707.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const [posicaoOnibus, setPosicaoOnibus] = useState(origemLatLng);
  const stepRef = useRef(0);

  // simulacao da animacao
  useEffect(() => {
    const interval = setInterval(() => {
      stepRef.current += 0.02;
      if (stepRef.current > 1) {
        clearInterval(interval);
        return;
      }

      const lat = origem.lat + (destino.lat - origem.lat) * stepRef.current;
      const lng = origem.lng + (destino.lng - origem.lng) * stepRef.current;
      setPosicaoOnibus([lat, lng]);
    }, 7000);

    return () => clearInterval(interval);
  }, [origem, destino]);

  const onibusIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61231.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer center={origemLatLng} zoom={15} style={{ height: '100%', width: '100%' }}>
<TileLayer
  attribution='&copy; <a href="https://carto.com/">Carto</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

      {/* origem */}
      <Marker position={origemLatLng} icon={origemIcon}>
        <Popup>Origem</Popup>
      </Marker>

      {/* destino */}
      <Marker position={destinoLatLng} icon={destinoIcon}>
        <Popup>Destino</Popup>
      </Marker>

      {/* linha entre os pontos */}
      <Polyline positions={[origemLatLng, destinoLatLng]} color="blue" />
       {/* onibus em movimento */}
      <Marker position={posicaoOnibus} icon={onibusIcon}>
        <Popup>Ônibus escolar</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapaViagemAluno;