"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import '../styles/dashboard.css';
import React from 'react';
import { motion } from 'framer-motion';

//componentes do dashboard
import { StatCard } from './components/StatCard.jsx';
import { ViagensGrafico } from './components/ViagensGrafico.jsx';
import { TipoUsuarioChart } from './components/GraficoPizza.jsx';
import { VeiculosTable } from './components/TabelaVeiculos.jsx'
import { IncidentesChart } from './components/GraficoBarras.jsx';
import { EscolasTable } from './components/TabelaEscolas.jsx';
import { PontosTable } from './components/TabelaPontos.jsx';

export default function dashboard() {

    //----------------------------------------cards
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

    //INFORMAÇÕES DOS CARDS
    const infos = [
        {
            img: '/img/icon-motorista2.png',
            nome: 'Motoristas ativos',
            informacao: qtdMotoristas !== null ? qtdMotoristas : 'Carregando...'
        }, {
            img: '/img/bus-solid.svg',
            nome: 'Viagens em andamento',
            informacao: qtdViagens !== null ? qtdViagens : 'Carregando...'
        }, {
            img: '/img/users-solid.svg',
            nome: 'Novos usuários',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        }, {
            img: '/img/school-solid.svg',
            nome: 'Escolas cadastradas',
            informacao: qtdEscolas !== null ? qtdEscolas : 'Carregando...'
        }];

    return (
        <>
            <div className='page-indicador'>
                <h1>Dashboard</h1>
                <hr />
            </div>
            <div className=' overflow-auto relative z-10'>
                <main className='w-full mx-auto py-4 px-4 lg:px-8 '>
                    {/*CARDS EM BAIXO DO TÍTULO*/}
                    <motion.div className="statcards grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 mb-8"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        {infos.map((infos, index) => (
                            <StatCard className='statcard' key={index} name={infos.nome} img={infos.img} value={infos.informacao}></StatCard>
                        ))} </motion.div>
                    {/*GRAFICO*/}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5'>
                        <ViagensGrafico></ViagensGrafico>
                        <TipoUsuarioChart></TipoUsuarioChart>
                    </div>
                    {/*TABELA VEICULOS*/}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
                        <div className="lg:col-span-2">
                            <VeiculosTable />
                        </div>
                        {/*REGISTRO DOS INCIDENTES*/}
                        {/* <div className="lg:col-span-1 ">
                            <IncidentesChart></IncidentesChart>
                        </div> */}
                    </div>
                    {/*TABELA DAS ESCOLAS*/}
                    <div className="grid grid-cols-1 gap-8 mt-5">
                        <EscolasTable></EscolasTable>
                    </div>
                    {/*TABELA DOS PONTOS*/}
                    <div className="grid grid-cols-1 gap-8 mt-5">
                        <PontosTable></PontosTable>
                    </div>
                </main>
            </div>
        </>)
}