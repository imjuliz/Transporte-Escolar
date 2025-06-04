"use client";
import './veiculos.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import Image from 'next/image'

export default function veiculos() {
    const [veiculo, setUsuario] = useState(null);
    const [erro, setErro] = useState("");
    useEffect(() => {
        fetch("http://localhost:3001/verVeiculo", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.mensagem);
                setUsuario(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do veiculo:", err.message);
                setErro("Erro ao carregar informações do veiculo.");
            });
    }, []);

     // 1. Enquanto carrega
     if (erro) {
        return <p className="text-red-600 p-4">{erro}</p>;
    }
    if (!veiculo) {
        return (
            <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Carregando...</span>
                </div>
            </div>
        );
    }

    if (erro) return <p className="text-red-600 p-4">{erro}</p>;
    if (!veiculo) return <div className="text-center"><div role="status">Carregando...</div></div>;

    return (
        <>
            <section className='secao1'>
                    <div className='page-indicador'>
                        <h1>Meus veículos</h1>
                        <hr />
                    </div>
                    <div className='user'>
                        <div className='perfil-img-nome flex flex-nowrap items-center gap-3'>
                            <Image
                                src="/img/fotoPerfil.png"
                                width={100}
                                height={100}
                                alt="Foto de perfil"
                                className='fotoPerfil'/>
                            <div>
                                <h3>Ônibus escolar</h3>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className='@container'>
                    <div className='sec'>
                        <div className='sec-indicador'>
                            <h4>Dados </h4>
                            <hr/>
                        </div>
                        <div className='sec-container grid grid-flow-col grid-rows-2 gap-3'>
                            <div className='sec-campos'>
                                <h6>Modelo</h6>
                                <p>{veiculo.modelo}</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>Marca</h6>
                                <p>{veiculo.marca}</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>Placa</h6>
                                <p>{veiculo.placa}</p>
                            </div>
                        </div>
                    </div>
               
                    <div className='sec'>
                        <div className='sec-container grid grid-flow-col grid-rows-1 gap-3  '>
                            <div className='sec-campos flex flex-nowrap gap-140 2xl:gap-105 xl:gap-80 lg:gap-56 md:gap-32 sm:gap-20'>
                            <div className='sec-campos'>
                                <h6>Data de fabricação</h6>
                                <p>{veiculo.anoFabricacao}</p>
                            </div>
                            <div className='sec-campos'>
                                <h6>N° de passageiros</h6>
                                <p>{veiculo.capacidade}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
        </>
    )
}