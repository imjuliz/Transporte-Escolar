'use client';
import { useRef, useEffect, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Mapa from '../../../../components/Mapa/Mapa.jsx';

export default function MapaResponsavel({ viagens }) {
    return (
      <Mapa center={{ lat: -23.5, lng: -46.6 }} zoom={10} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {viagens.map(({ aluno, viagem }, index) => (
          <Marker
            key={index}
            position={{ lat: viagem.lat, lng: viagem.lng }}
            title={`Viagem de ${aluno}`}
          />
        ))}
      </Mapa>
    );
  }