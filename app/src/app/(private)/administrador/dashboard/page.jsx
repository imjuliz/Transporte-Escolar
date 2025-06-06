"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import '../styles/dashboard.css';
import React from 'react';

import { motion } from 'framer-motion';

//componentes do dashboard
import { StatCard } from './components/StatCard.jsx';

//importação do bglh do dashboard
//import './assets/vendor/apexcharts/dist/apexcharts.css';

export default function dashboard() {


    // qntd de viagens em andamento
    const [qtdViagens, setQtdViagens] = useState(null);
    useEffect(() => {
        async function qtdViagensAndamento() {
            try {
                const res = await fetch('http://localhost:3001/em-andamento/quantidade', {
                    credentials: 'include'
                });
                const data = await res.json();
                setQtdViagens(data.total);
            } catch (error) {
                console.error('Erro ao buscar quantidade:', error);
                setQtdViagens(0);
            }
        }
        qtdViagensAndamento();
    }, []);

    // qntd de usuarios cadastrados no sistema
    const [qtdUsuarios, setQtdUsuarios] = useState(null);

    useEffect(() => {
        async function qtdUsuarios() {
            try {
                const res = await fetch('http://localhost:3001/qtd-usuarios', {
                    credentials: 'include'
                });
                const data = await res.json();
                setQtdUsuarios(data);
            } catch (error) {
                console.error('Erro ao buscar total de usuários:', error);
            }
        }
        qtdUsuarios();
    }, []);

    // qntd de escolas cadastrados no sistema
    const [qtdEscolas, setQtdEscolas] = useState(null);

    useEffect(() => {
        async function qtdEscolas() {
            try {
                const res = await fetch('http://localhost:3001/qtd-escolas', {
                    credentials: 'include'
                });
                const data = await res.json();
                setQtdEscolas(data.total_escolas);
            } catch (error) {
                console.error('Erro ao buscar total de escolas:', error);
            }
        }
        qtdEscolas();
    }, []);

    // qntd de motoristas cadastrados no sistema
    const [qtdMotoristas, setQtdMotoristas] = useState(null);

    useEffect(() => {
        async function qtdMotoristas() {
            try {
                const res = await fetch('http://localhost:3001/qtd-motoristas', {
                    credentials: 'include'
                });
                const data = await res.json();
                setQtdMotoristas(data.total_motoristas);
            } catch (error) {
                console.error('Erro ao buscar total de motoristas:', error);
            }
        }
        qtdMotoristas();
    }, []);


    const infos = [
        {
            img: '/img/icon-motorista2.png',
            nome: 'Motoristas ativos',
            informacao: qtdMotoristas !== null ? qtdMotoristas : 'Carregando...'
        },
        {
            img: '/img/bus-solid.svg',
            nome: 'Viagens em andamento',
            informacao: qtdViagens !== null ? qtdViagens : 'Carregando...'
        },
        {
            img: '/img/users-solid.svg',
            nome: 'Novos usuários',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        },
        {
            img: '/img/school-solid.svg',
            nome: 'Escolas cadastradas',
            informacao: qtdEscolas !== null ? qtdEscolas : 'Carregando...'
        }
    ];

    return (
        <>
            <section className='informacoes'>
                <div className='page-indicador'>
                    <h1>Dashboard</h1>

                </div>


                {/*<section className='flex flex-row justify-between  '>
                    
                        <div key={index} className='box-infos flex p-4 w-70 h-35 flez-row rounded-xl bg-[#fff] items-center gap-4'>

                            <div className='icone'>
                                <img src={info.img} className='img-icone' />
                            </div>

                            <div className='flex flex-col'>
                                <p className='informacao'>{info.informacao}</p>
                                <p className='info-nome'>{info.nome}</p>
                            </div>
                        </div>
                   
                </section>*/}
                {infos.map((infos, index) => (
                    <div key={index} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4-mb-8">
                        <StatCard name={infos.nome} img={infos.img} value={infos.informacao}></StatCard>
                    </div>
                ))}

            </section>
        </>
    )
}