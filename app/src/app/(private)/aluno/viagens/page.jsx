"use client";
import Image from 'next/image'
import '../styles/viagens.css'
import { useEffect, useState } from 'react';

export default function viagens() {
    // titulo da guia
    useEffect(() => {
        document.title = 'EduTrip - Minhas Rotas';
    }, []);

    const viagens = [
        {
            tipo: 'Embarque',
            horaEmbarque: '12:00',
            horaDesembarque: '12:45'
        }
    ];

    const viagensPassadas = [
        {
            data: '',
            tipo: 'Embarque',
            horaEmbarque: '12:00',
            horaDesembarque: '12:45'
        }
    ];

    return (
        <>
            <section>
                <div className='page-indicador'>
                    <h1>Viagens</h1>
                    <hr />
                </div>
                <div className='flex flex-column gap-[7vh]'>
                <div className='today days'>
                    <h2>Hoje</h2>
                    {viagens.map((viagem, index) => (
                        <div className='container-viagem flex flex-column items-start gap-3 bg-[#fff] rounded-[2vw]' key={index}>
                            <div className='flex flex-row items-center'>
                                <svg className='circle-t' width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill="#00B383" />
                                </svg>
                                <p className='mb-0 text-[#8F9BB3]'>Hoje</p>
                                <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3"/>
                                </svg>

                                <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaDesembarque}</p>
                            </div>
                            <h3>{viagem.tipo}</h3>
                        </div>
                    ))}
                </div>
                <div className='mounth days'>
                    <h2>Esse mês</h2>
                    {viagens.map((viagemPassada, index) => (
                        <div className='container-viagem flex flex-column items-start gap-3 bg-[#fff] rounded-[2vw]' key={index}>
                            <div className='flex flex-row items-center'>
                                <svg className='circle-t' width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill="#00B383" />
                                </svg>
                                <p className='mb-0 text-[#8F9BB3]'>{viagemPassada.data}</p>
                                <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3"/>
                                </svg>

                                <p className='m-0 text-[#8F9BB3]'>{viagemPassada.horaEmbarque} - {viagemPassada.horaDesembarque}</p>
                            </div>
                            <h3>{viagemPassada.tipo}</h3>
                        </div>
                    ))}
                </div>
                </div>
            </section>
        </>
    )
}