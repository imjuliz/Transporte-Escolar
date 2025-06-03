'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Mapa from '../../../../components/Mapa/Mapa.jsx';
import '../styles/viagens.css';

export default function MinhaRotaAluno() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
            try {
                const usuarioObj = JSON.parse(usuarioSalvo);
                console.log("Dados recuperados do localStorage:", usuarioObj);
                
                if (usuarioObj.id) {
                    setUsuario(usuarioObj);
                } else {
                    console.error("ID do usuário está ausente.");
                }
            } catch (error) {
                console.error("Erro ao parsear localStorage:", error);
            }
        } else {
            console.error("Nenhum usuário encontrado no localStorage.");
        }
    }, []);

    if (!usuario) {
        return <p>Carregando informações do usuário...</p>;
    }

    return (
        <section className="relative w-screen m-8">
        <Mapa usuarioId={usuario.id} tipoUsuario={usuario.tipo} className="h-full"/>
        </section>
    );
}