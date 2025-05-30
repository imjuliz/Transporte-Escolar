'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from './Leaflet.jsx';

export default function MapaMotorista({ viagens }) {
  if (!viagens.length) return <p>Nenhuma viagem encontrada.</p>;

  return (
    <MapContainer center={{ lat: -23.5, lng: -46.6 }} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {viagens.map((viagem, index) => (
        <Marker key={index} position={{ lat: viagem.lat, lng: viagem.lng }} />
      ))}
    </MapContainer>
  );
}
