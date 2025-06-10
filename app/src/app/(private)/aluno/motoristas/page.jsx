"use client";
import '../styles/motoristaPerfil.css';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

export default function motoristas() {
    // titulo da guia
    useEffect(() => {
        document.title = 'EduTrip - Motoristas';
    }, []);
    const [motorista, setMotorista] = useState(null);
    const [veiculo, setVeiculo] = useState(null);
    const [erro, setErro] = useState("");


    //ver veiculo
    useEffect(() => {
        fetch("http://localhost:3001/verVeiculo", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.mensagem);
                setVeiculo(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do veiculo:", err.message);
                setErro("Erro ao carregar informações do veiculo.");
            });
    }, []);
    //ver motorista
    useEffect(() => {
        fetch("http://localhost:3001/verMotorista", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setMotorista(data[0]);
                } else {
                    setMotorista(data);
                }
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do usuário:", err.message);
                setErro("Erro ao carregar perfil.");
            })}, []);

            if (erro) return <p className="text-red-600 p-4">{erro}</p>;
    
            if (!motorista) {
                return (
                    <div className="text-center">
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="..." fill="currentColor" />
                                <path d="..." fill="currentFill" />
                            </svg>
                            <span className="sr-only">Carregando...</span>
                        </div>
                    </div>
                );
            }
    return (
        <>
            {/* <main className='justify-items-center content-center'> */}
            <section>
                <div className='page-indicador'>
                    <h1>Motoristas</h1>
                    <hr />
                </div>
                <div className='user'>
                    <div className='perfil-img-nome flex flex-nowrap items-center gap-3'>
                        <div className='ft-up flex flex-row items-end justify-items-end-safe'>
                        <Image
                            src="/img/fotoPerfil.png"
                            width={80}
                            height={80}
                            alt="Foto de perfil"
                            className='fotoPerfil'
                        />
                        </div>
                        <div>
                            <h3>{motorista.nome}</h3>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className='sec'>
                    <div className='sec-indicador'>
                        <h4>Dados Pessoais</h4>
                        <hr />
                    </div>
                    <div className='sec-container flex flex-row gap-3 justify-between'>
                        <div className='sec-campos'>
                            <h6>Nome completo:</h6>
                            <p>{motorista.nome}</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Email:</h6>
                            <p>{motorista.email}</p>
                        </div>
                        <div className='sec-campos'>
                            <h6>Telefone:</h6>
                            <p>{motorista.telefone}</p>
                        </div>
                    </div>
                </div>

                <div className='sec flex flex-col gap-3'>
                    <div className='sec-indicador'>
                        <h4>Veiculo</h4>
                        <hr />
                    </div>
                    <div className='sec-container flex flex-row gap-8 justify-between'>
                        <div className='sec-campos'>
                            <h6>Modelo:</h6>
                            <p>{veiculo.modelo}</p>
                        </div>
                        <div className='sec-campos2'>
                            <h6>Placa:</h6>
                            <p>{veiculo.placa}</p>
                        </div>
                        <div className='sec-campos2'>
                            <h6>Data de fabricação:</h6>
                            <p>{veiculo.anoFabricacao}</p>
                        </div>
                        <div className='sec-campos2'>
                            <h6>Capacidade de passageiros:</h6>
                            <p>{veiculo.capacidade}</p>
                        </div>
                    </div>
                    
                </div>

                <div className='btn-perfil flex flex-wrap gap-6'>
                    <button className='btn-add flex flex-row items-center gap-3' href='https://whatsapp.com/'><svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48L3.374 35.674C1.292 32.066 0.198 27.976 0.2 23.782C0.206 10.67 10.876 0 23.986 0C30.348 0.002 36.32 2.48 40.812 6.976C45.302 11.472 47.774 17.448 47.772 23.804C47.766 36.918 37.096 47.588 23.986 47.588C20.006 47.586 16.084 46.588 12.61 44.692L0 48ZM13.194 40.386C16.546 42.376 19.746 43.568 23.978 43.57C34.874 43.57 43.75 34.702 43.756 23.8C43.76 12.876 34.926 4.02 23.994 4.016C13.09 4.016 4.22 12.884 4.216 23.784C4.214 28.234 5.518 31.566 7.708 35.052L5.71 42.348L13.194 40.386ZM35.968 29.458C35.82 29.21 35.424 29.062 34.828 28.764C34.234 28.466 31.312 27.028 30.766 26.83C30.222 26.632 29.826 26.532 29.428 27.128C29.032 27.722 27.892 29.062 27.546 29.458C27.2 29.854 26.852 29.904 26.258 29.606C25.664 29.308 23.748 28.682 21.478 26.656C19.712 25.08 18.518 23.134 18.172 22.538C17.826 21.944 18.136 21.622 18.432 21.326C18.7 21.06 19.026 20.632 19.324 20.284C19.626 19.94 19.724 19.692 19.924 19.294C20.122 18.898 20.024 18.55 19.874 18.252C19.724 17.956 18.536 15.03 18.042 13.84C17.558 12.682 17.068 12.838 16.704 12.82L15.564 12.8C15.168 12.8 14.524 12.948 13.98 13.544C13.436 14.14 11.9 15.576 11.9 18.502C11.9 21.428 14.03 24.254 14.326 24.65C14.624 25.046 18.516 31.05 24.478 33.624C25.896 34.236 27.004 34.602 27.866 34.876C29.29 35.328 30.586 35.264 31.61 35.112C32.752 34.942 35.126 33.674 35.622 32.286C36.118 30.896 36.118 29.706 35.968 29.458Z" fill="white" />
                    </svg>
                        Enviar mensagem</button>
                </div>
            </section>
            {/* </main> */}
        </>
    )
}