'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// export default function MapaRotas({ viagemId }) {
//   // const [viagens, setViagens] = useState([]);
//   //   const [map, setMap] = useState(null);

//   //   useEffect(() => {
//   //     if (typeof window === 'undefined') return;

//   //     const mapa = L.map('mapa').setView([-20.909, -48.64], 14);
//   //     setMap(mapa);

//   //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   //       attribution: '&copy; OpenStreetMap contributors',
//   //     }).addTo(mapa);

//   //     return () => mapa.remove();
//   //   }, []);

//   //   useEffect(() => {
//   //     fetch('http://localhost:3001/viagens', { credentials: 'include' })
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         if (Array.isArray(data)) {
//   //           setViagens(data);
//   //         } else {
//   //           console.error("Erro: API não retornou um array.");
//   //         }
//   //       })
//   //       .catch(err => console.error('Erro ao buscar viagens:', err));
//   //   }, []);

//   //   useEffect(() => {
//   //     if (!map || viagens.length === 0) return;

//   //     viagens.forEach(viagem => {
//   //       const agora = new Date();
//   //       const [h, m] = (viagem.horario_embarque || '00:00').split(':').map(Number);
//   //       const horarioAlvo = new Date();
//   //       horarioAlvo.setHours(h, m, 0, 0);

//   //       const delay = horarioAlvo - agora;

//   //       if (delay > 0) {
//   //         setTimeout(() => ativarViagem(viagem), delay);
//   //       } else {
//   //         ativarViagem(viagem);
//   //       }
//   //     });

//   //   }, [viagens, map]);

//   //   function ativarViagem(viagem) {
//   //     const waypoints = [
//   //       L.latLng(viagem.ponto_embarque_lat, viagem.ponto_embarque_long),
//   //       L.latLng(viagem.escola_lat, viagem.escola_long),
//   //     ];

//   //     const controle = L.Routing.control({
//   //       waypoints,
//   //       routeWhileDragging: false,
//   //       createMarker: () => null,
//   //     }).addTo(map);

//   //     simularMovimento(waypoints);
//   //   }

//   //   function simularMovimento(waypoints) {
//   //     let currentIndex = 0;
//   //     const marker = L.marker(waypoints[0]).addTo(map);

//   //     const mover = () => {
//   //       if (currentIndex < waypoints.length - 1) {
//   //         currentIndex++;
//   //         marker.setLatLng(waypoints[currentIndex]);
//   //         setTimeout(mover, 3000); // move a cada 3 segundos
//   //       }
//   //     };

//   //     mover();
//   //   }


//   return (
//     <>
//       {/* <div id="mapa" className='hs-change-city-leaflet-wrapper mapa-container'>
//       <div className="">
//       </div>
//       <div id="hs-change-city-leaflet" className='mapa' style={{ height: '100vh', width: '100%' }}></div>
//       <div className="relative>
//         <div>
//           <h4>Olá, Aluno</h4>
//           <div className='flex flex-row'>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5.46973 9C7.40272 9 8.96973 7.433 8.96973 5.5C8.96973 3.567 7.40272 2 5.46973 2C3.53673 2 1.96973 3.567 1.96973 5.5C1.96973 7.433 3.53673 9 5.46973 9Z" stroke="#1B1C37" strokeWidth="1.5" />
//               <path d="M16.9697 15H19.9697C21.0697 15 21.9697 15.9 21.9697 17V20C21.9697 21.1 21.0697 22 19.9697 22H16.9697C15.8697 22 14.9697 21.1 14.9697 20V17C14.9697 15.9 15.8697 15 16.9697 15Z" stroke="#1B1C37" strokeWidth="1.5" />
//               <path d="M11.9997 5H14.6797C16.5297 5 17.3897 7.29 15.9997 8.51L8.0097 15.5C6.6197 16.71 7.4797 19 9.3197 19H11.9997" stroke="#1B1C37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M5.48573 5.5H5.49728" stroke="#1B1C37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M18.4857 18.5H18.4973" stroke="#1B1C37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <p>Kms restantes</p>
//             <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="2" cy="2" r="2" fill="#1C1C1C" />
//             </svg>
//             <p>Min restantes</p>
//           </div>
//         </div>

//         <div className='flex flex-row'>
//           <div className='flex flex-column'>
//             <h4>motorista</h4>< hr />
//             <p>Nome do motorista</p>
//             <p>Previsoes de atraso</p>
//           </div>
//         </div>
//       </div>
//     </div> */}
//     </>
//   );
// }

// import Mapa from '../../../../components/Mapa/Mapa.jsx';
// import '../styles/viagens.css';

// export default function MinhaRotaAluno() {
//   const [usuario, setUsuario] = useState(null);

//     useEffect(() => {
//         const usuarioSalvo = localStorage.getItem("usuario");
        
//         if (usuarioSalvo) {
//             setUsuario(JSON.parse(usuarioSalvo));
//         } else {
//             console.error("Nenhum usuário encontrado no localStorage.");
//         }
//     }, []);

//     if (!usuario) {
//         return <p>Carregando informações do usuário...</p>;
//     }

//   return (
//     <>
//       <section className="relative h-full w-full m-8">

//         <div className='container-infos-rota w-full absolute top-0 left-0 z-50 flex flex-col items-center gap-10'>
//         <div className="relative top-0 left-0 z-50 p-4 container-user w-3/5 rounded-lg bg-[#161A23] text-[#fff]">
//           <h4>Olá, Aluno</h4>
//           <div className='flex flex-row items-center justify-center'>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5.46973 9C7.40272 9 8.96973 7.433 8.96973 5.5C8.96973 3.567 7.40272 2 5.46973 2C3.53673 2 1.96973 3.567 1.96973 5.5C1.96973 7.433 3.53673 9 5.46973 9Z" stroke="#fff" strokeWidth="1.5" />
//               <path d="M16.9697 15H19.9697C21.0697 15 21.9697 15.9 21.9697 17V20C21.9697 21.1 21.0697 22 19.9697 22H16.9697C15.8697 22 14.9697 21.1 14.9697 20V17C14.9697 15.9 15.8697 15 16.9697 15Z" stroke="#fff" strokeWidth="1.5" />
//               <path d="M11.9997 5H14.6797C16.5297 5 17.3897 7.29 15.9997 8.51L8.0097 15.5C6.6197 16.71 7.4797 19 9.3197 19H11.9997" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M5.48573 5.5H5.49728" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M18.4857 18.5H18.4973" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <p className='m-0'>Kms restantes</p>
//             <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" className='circle px-8'>
//               <circle cx="2" cy="2" r="2" fill="#fff" />
//             </svg>
//             <p className='m-0'>Min restantes</p>
//           </div>
//         </div>

//         <div className='flex flex-row w-5/6 rounded-lg bg-[#161A23] text-[#fff]'>
//           <div className='flex flex-column'>
//             <h4>motorista</h4>< hr />
//             <p>Nome do motorista</p>
//             <p>Previsoes de atraso</p>
//           </div>
//         </div>

//         </div>
//         <Mapa usuarioId={usuario.id} tipoUsuario={usuario.tipo} className="h-full"/>
        
//       </section>

//     </>
//   )
// }
import Mapa from '../../../../components/Mapa/Mapa.jsx';
import '../styles/viagens.css';

export default function MinhaRotaAluno() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
            try {
                const usuarioObj = JSON.parse(usuarioSalvo);
                console.log("Dados recuperados do localStorage:", usuarioObj); // Teste no console!
                
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