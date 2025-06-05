"use client"
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import '../styles/dashboard.css'

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

    // qntd de usuarios cadastrados no sistema
    const [qtdEscolas, setQtdEscolas] = useState(null);

    useEffect(() => {
        async function qtdEscolas() {
            try {
                const res = await fetch('http://localhost:3001/qtd-escolas', {
                    credentials: 'include'
                });
                const data = await res.json();
                setQtdEscolas(data.total_geral);
            } catch (error) {
                console.error('Erro ao buscar total de escolas:', error);
            }
        }
        qtdEscolas();
    }, []);


    const infos = [
        {
            img: '/img/icon-motorista2.png',
            nome: 'Motoristas ativos',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        },
        {
            img: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z"/></svg>
            ,
            nome: 'Viagens em andamento',
            informacao: qtdViagens !== null ? qtdViagens : 'Carregando...'
        },
        {
            /*img: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.241211" y="0.955078" width="28.9894" height="28.9895" rx="14.4947" fill="#FFC01D" fillOpacity="0.3" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.3333 11C13.615 11 12.9262 11.2853 12.4183 11.7933C11.9103 12.3012 11.625 12.99 11.625 13.7083C11.625 14.4266 11.9103 15.1155 12.4183 15.6234C12.454 15.6591 12.4906 15.6938 12.5281 15.7273C12.0641 15.9399 11.637 16.2347 11.2692 16.6025C10.4565 17.4152 10 18.5174 10 19.6667V20.2083C10 20.5075 10.2425 20.75 10.5417 20.75C10.8408 20.75 11.0833 20.5075 11.0833 20.2083V19.6667C11.0833 18.8047 11.4257 17.9781 12.0352 17.3686C12.6447 16.7591 13.4714 16.4167 14.3333 16.4167C15.1953 16.4167 16.0219 16.7591 16.6314 17.3686C17.2409 17.9781 17.5833 18.8047 17.5833 19.6667V20.2083C17.5833 20.5075 17.8258 20.75 18.125 20.75C18.4242 20.75 18.6667 20.5075 18.6667 20.2083V19.6667C18.6667 18.5174 18.2101 17.4152 17.3975 16.6025C17.0297 16.2347 16.6025 15.9399 16.1386 15.7273C16.1761 15.6938 16.2127 15.6591 16.2484 15.6234C16.7563 15.1155 17.0417 14.4266 17.0417 13.7083C17.0417 12.99 16.7563 12.3012 16.2484 11.7933C15.7405 11.2853 15.0516 11 14.3333 11ZM13.1843 12.5593C13.489 12.2545 13.9024 12.0833 14.3333 12.0833C14.7643 12.0833 15.1776 12.2545 15.4824 12.5593C15.7871 12.864 15.9583 13.2774 15.9583 13.7083C15.9583 14.1393 15.7871 14.5526 15.4824 14.8574C15.1776 15.1621 14.7643 15.3333 14.3333 15.3333C13.9024 15.3333 13.489 15.1621 13.1843 14.8574C12.8795 14.5526 12.7083 14.1393 12.7083 13.7083C12.7083 13.2774 12.8795 12.864 13.1843 12.5593Z" fill="#2D2F39" />
            </svg>
            ),*/
            nome: 'Novos usuários',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        },
        {
            /* img: (<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="0.140625" y="0.955078" width="27.9815" height="27.9815" rx="13.9908" fill="#013FF6" fillOpacity="0.3" />
                 <path d="M20.0132 15.4341C20.0671 15.4645 20.0669 15.5376 20.0669 15.5376L20.019 18.6343C20.0189 19.9091 18.9992 20.9417 17.7397 20.9419L10.5161 20.9419C9.25679 20.9415 8.237 19.909 8.23682 18.6343L8.19482 15.5376C8.19482 15.5376 8.19512 15.4646 8.24854 15.4341C8.29628 15.4039 8.35626 15.4404 8.36279 15.4468C9.57442 16.2603 11.0325 16.8002 12.562 17.0249C12.7779 17.0552 12.9941 16.9152 13.0542 16.6968C13.1863 16.1994 13.6122 15.8719 14.1216 15.8716H14.1401C14.6498 15.8717 15.0754 16.1992 15.2075 16.6968C15.2675 16.9151 15.4839 17.055 15.6997 17.0249C17.2292 16.8003 18.6873 16.2602 19.8989 15.4468C19.8989 15.4468 19.9115 15.4401 19.9233 15.4341C19.9473 15.4221 19.9834 15.4161 20.0132 15.4341ZM14.1274 16.7397C13.8819 16.7403 13.6782 16.9472 13.6782 17.1958V17.979C13.6786 18.2334 13.8821 18.4336 14.1274 18.4341C14.3792 18.4341 14.5773 18.2337 14.5776 17.979V17.1958C14.5776 16.9469 14.3794 16.7397 14.1274 16.7397ZM14.9019 8.94971C15.8017 8.94971 16.5398 9.63576 16.6538 10.5161L17.8413 10.5161C19.1011 10.5161 20.1274 11.5545 20.1274 12.8296C20.1274 12.8296 20.0916 13.3699 20.0796 14.1216C20.0783 14.1808 20.0495 14.2388 20.0024 14.2739C19.7139 14.487 19.4493 14.6631 19.4253 14.6753C18.4295 15.3432 17.2724 15.8136 16.0396 16.0474C15.9593 16.0631 15.8802 16.0212 15.8394 15.9497C15.4938 15.351 14.8483 14.9605 14.1284 14.9604C13.4133 14.9604 12.7615 15.3465 12.4058 15.9458C12.3644 16.0162 12.2863 16.0567 12.2065 16.0415C10.984 15.8071 9.82717 15.3375 8.8374 14.6812L8.26123 14.2808C8.2133 14.2504 8.18315 14.1959 8.18311 14.1353C8.16511 13.8256 8.13525 12.8296 8.13525 12.8296C8.13529 11.5547 9.16085 10.5164 10.4204 10.5161H11.603C11.7171 9.63591 12.4544 8.94992 13.354 8.94971H14.9019ZM13.355 9.86084C12.9532 9.86084 12.6113 10.1399 12.5151 10.5161H15.7417C15.6455 10.1399 15.3036 9.86084 14.9019 9.86084H13.355Z" fill="#2D2F39" />
             </svg>
             ),*/
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


                <section className='flex flex-row justify-between  '>
                    {infos.map((info, index) => (
                        <div key={index} className='box-infos flex p-3 w-70 h-35 flez-row rounded-xl bg-[#fff] shadow-xl items-center gap-4'>
                            <div className='icone'>
                                <img src={info.img} className=''alt='icones' />
                            </div>

                            <div className='flex flex-col'>
                                <p className='informacao'>{info.informacao}</p>
                                <p className='info-nome'>{info.nome}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <section>
                    <div className="flex flex-col justify-center items-center">
                        <div id="hs-doughnut-chart"></div>
                        <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
                            <div className="inline-flex items-center">
                                <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
                                <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                                    Income
                                </span>
                            </div>
                            <div className="inline-flex items-center">
                                <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
                                <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                                    Outcome
                                </span>
                            </div>
                            <div className="inline-flex items-center">
                                <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
                                <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                                    Others
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}