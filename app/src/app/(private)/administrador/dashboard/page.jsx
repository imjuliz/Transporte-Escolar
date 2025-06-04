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
                const res = await fetch('http://localhost:3001/em-andamento/quantidade');
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
                const res = await fetch('http://localhost:3001/qtd-usuarios');
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
                const res = await fetch('http://localhost:3001/qtd-escolas');
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
            img: (<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.943848" y="0.955078" width="27.98" height="27.98" rx="13.99" fill="#FFC01D" fillOpacity="0.3" />
                <mask id="mask0_435_9823" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="11" y="8" width="7" height="6">
                    <path d="M11.5259 8H17.4618V13.5439H11.5259V8Z" fill="white" />
                </mask>
                <g mask="url(#mask0_435_9823)">
                    <path d="M14.4995 13.5088C16.1143 13.5088 17.4229 11.6354 17.4229 10.3107C17.4229 8.98557 16.1143 8.00049 14.4995 8.00049C12.8853 8.00049 11.5762 8.98557 11.5762 10.3107C11.5762 11.6354 12.8853 13.5088 14.4995 13.5088Z" fill="#2D2F39" />
                </g>
                <path d="M15.9336 17.9925L15.1326 18.3731C14.9703 18.4484 14.6874 18.5117 14.5021 18.5099H14.4977C14.3104 18.5117 14.0276 18.4484 13.8672 18.3731L13.0663 17.9925C12.8245 17.878 12.8079 17.5997 13.0327 17.4615C13.4406 17.2088 13.9483 17.0586 14.4999 17.0586C15.0491 17.0586 15.557 17.2088 15.9667 17.4615C16.1897 17.5997 16.1749 17.878 15.9336 17.9925ZM16.8906 18.7267C17.0072 18.7063 17.1283 18.6961 17.2508 18.6961H17.7459C17.5255 17.3881 16.1542 16.3755 14.4999 16.3755C12.8437 16.3755 11.4743 17.3881 11.2539 18.6961H11.7486C11.8716 18.6961 11.9926 18.7063 12.1065 18.7267C12.1966 18.5629 12.4457 18.4876 12.6498 18.5833L13.0248 18.7609C13.43 18.954 13.7257 19.1879 14.0004 19.4391C14.1234 19.5496 14.3003 19.6201 14.4999 19.6201C14.6976 19.6201 14.8764 19.5496 14.9994 19.4391C15.2737 19.1879 15.5694 18.954 15.923 18.7848L16.3474 18.5851C16.5515 18.4876 16.799 18.5647 16.8906 18.7267Z" fill="#2D2F39" />
                <mask id="mask1_435_9823" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="12" y="20" width="5" height="2">
                    <path d="M12.7139 20.8125H16.2754V21.7498H12.7139V20.8125Z" fill="white" />
                </mask>
                <g mask="url(#mask1_435_9823)">
                    <path d="M15.6985 20.8135C15.2411 21.0251 14.6937 21.1189 14.1173 21.0473C13.826 21.0115 13.5491 20.9298 13.2994 20.8135C13.1662 21.022 12.9708 21.1994 12.7354 21.3309C13.2455 21.5989 13.851 21.7544 14.5002 21.7544C15.1495 21.7544 15.755 21.5989 16.2647 21.3309C16.0277 21.1994 15.8338 21.022 15.6985 20.8135Z" fill="#2D2F39" />
                </g>
                <path d="M11.7034 19.4638H10.3151C10.2985 19.3324 10.2863 19.1994 10.2863 19.0643C10.2863 18.7826 10.3279 18.5093 10.4067 18.248C10.8541 16.7334 12.519 15.6067 14.5 15.6067C15.0263 15.6067 15.53 15.6848 15.994 15.8317L17.7132 13.9962C17.4239 13.8969 17.1134 13.8324 16.7934 13.8052C16.7534 13.8016 16.7119 13.8 16.6724 13.7964C16.0604 14.2301 15.3262 14.5102 14.5 14.5102C13.6719 14.5102 12.939 14.2301 12.3255 13.7964C12.2855 13.8 12.2462 13.8016 12.2067 13.8052C10.821 13.9228 9.6636 14.7439 9.34141 15.8541C9.11682 16.6258 9 17.4251 9 18.248V19.9574C9 20.4288 9.46618 20.8112 10.0408 20.8112H11.7487C12.2175 20.8112 12.5918 20.4883 12.5669 20.1011C12.5439 19.7371 12.1466 19.4638 11.7034 19.4638Z" fill="#2D2F39" />
                <mask id="mask2_435_9823" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="14" width="4" height="7">
                    <path d="M16.3882 14.5161H20.0001V20.8126H16.3882V14.5161Z" fill="white" />
                </mask>
                <g mask="url(#mask2_435_9823)">
                    <path d="M19.6591 15.8546C19.5109 15.3511 19.1931 14.9053 18.7579 14.5601L17.091 16.3414C17.8259 16.8125 18.3665 17.4802 18.5933 18.2485C18.6726 18.5098 18.7144 18.7831 18.7144 19.0648C18.7144 19.1999 18.7035 19.3328 18.685 19.4643H17.2513C16.7832 19.4643 16.4086 19.7839 16.4338 20.1733C16.4566 20.5386 16.8538 20.8117 17.2993 20.8117H18.9597C19.5339 20.8117 20.0005 20.4293 20.0005 19.9579V18.2485C20.0005 17.4256 19.8817 16.6263 19.6591 15.8546Z" fill="#2D2F39" />
                </g>
            </svg>
            ),
            nome: 'Motoristas ativos',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        },
        {
            img: (<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.843262" y="0.955078" width="27.9793" height="27.9793" rx="13.9896" fill="#013FF6" fillOpacity="0.3" />
                <mask id="mask0_435_9812" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="8" y="8" width="13" height="13">
                    <path d="M8.83789 8.94971H20.8277V20.9396H8.83789V8.94971Z" fill="white" />
                </mask>
                <g mask="url(#mask0_435_9812)">
                    <path d="M14.8264 8.95215C12.8419 8.95215 11.2332 10.4154 11.2332 12.2208C11.2332 14.0311 13.3931 16.6368 14.3632 17.7166C14.6033 17.9835 15.0483 17.9835 15.2884 17.7166C16.2592 16.6368 18.4195 14.0311 18.4195 12.2208C18.4195 10.4154 16.811 8.95215 14.8264 8.95215ZM14.8264 11.0536C15.5354 11.0536 16.1095 11.5758 16.1095 12.2208C16.1095 12.8653 15.5348 13.3881 14.8264 13.3881C14.1179 13.3881 13.5434 12.8659 13.5434 12.2208C13.5434 11.5758 14.1173 11.0536 14.8264 11.0536ZM11.8287 16.8866C11.7825 16.8868 11.7353 16.8921 11.6882 16.9025C9.97863 17.2866 8.83789 17.9737 8.83789 18.7583C8.83789 19.9617 11.5189 20.9374 14.8264 20.9374C18.1339 20.9374 20.8148 19.9617 20.8148 18.7583C20.8148 17.9737 19.6742 17.2872 17.9645 16.9037C17.5877 16.8192 17.2218 17.0837 17.2218 17.4367C17.2218 17.6841 17.4028 17.9051 17.6663 17.9644C18.7471 18.2085 19.404 18.5469 19.5868 18.7573C19.2784 19.114 17.6374 19.8468 14.8264 19.8468C12.0154 19.8468 10.3745 19.114 10.0659 18.7573C10.248 18.5463 10.9056 18.2085 11.9866 17.9644C12.2499 17.9057 12.4309 17.6841 12.4309 17.4367C12.4309 17.1274 12.151 16.8856 11.8287 16.8866Z" fill="#2D2F39" />
                </g>
            </svg>
            ),
            nome: 'Viagens em andamento',
            informacao: qtdViagens !== null ? qtdViagens : 'Carregando...'
        },
        {
            img: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.241211" y="0.955078" width="28.9894" height="28.9895" rx="14.4947" fill="#FFC01D" fillOpacity="0.3" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.3333 11C13.615 11 12.9262 11.2853 12.4183 11.7933C11.9103 12.3012 11.625 12.99 11.625 13.7083C11.625 14.4266 11.9103 15.1155 12.4183 15.6234C12.454 15.6591 12.4906 15.6938 12.5281 15.7273C12.0641 15.9399 11.637 16.2347 11.2692 16.6025C10.4565 17.4152 10 18.5174 10 19.6667V20.2083C10 20.5075 10.2425 20.75 10.5417 20.75C10.8408 20.75 11.0833 20.5075 11.0833 20.2083V19.6667C11.0833 18.8047 11.4257 17.9781 12.0352 17.3686C12.6447 16.7591 13.4714 16.4167 14.3333 16.4167C15.1953 16.4167 16.0219 16.7591 16.6314 17.3686C17.2409 17.9781 17.5833 18.8047 17.5833 19.6667V20.2083C17.5833 20.5075 17.8258 20.75 18.125 20.75C18.4242 20.75 18.6667 20.5075 18.6667 20.2083V19.6667C18.6667 18.5174 18.2101 17.4152 17.3975 16.6025C17.0297 16.2347 16.6025 15.9399 16.1386 15.7273C16.1761 15.6938 16.2127 15.6591 16.2484 15.6234C16.7563 15.1155 17.0417 14.4266 17.0417 13.7083C17.0417 12.99 16.7563 12.3012 16.2484 11.7933C15.7405 11.2853 15.0516 11 14.3333 11ZM13.1843 12.5593C13.489 12.2545 13.9024 12.0833 14.3333 12.0833C14.7643 12.0833 15.1776 12.2545 15.4824 12.5593C15.7871 12.864 15.9583 13.2774 15.9583 13.7083C15.9583 14.1393 15.7871 14.5526 15.4824 14.8574C15.1776 15.1621 14.7643 15.3333 14.3333 15.3333C13.9024 15.3333 13.489 15.1621 13.1843 14.8574C12.8795 14.5526 12.7083 14.1393 12.7083 13.7083C12.7083 13.2774 12.8795 12.864 13.1843 12.5593Z" fill="#2D2F39" />
            </svg>
            ),
            nome: 'Novos usuários',
            informacao: qtdUsuarios !== null ? qtdUsuarios : 'Carregando...'
        },
        {
            img: (<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.140625" y="0.955078" width="27.9815" height="27.9815" rx="13.9908" fill="#013FF6" fillOpacity="0.3" />
                <path d="M20.0132 15.4341C20.0671 15.4645 20.0669 15.5376 20.0669 15.5376L20.019 18.6343C20.0189 19.9091 18.9992 20.9417 17.7397 20.9419L10.5161 20.9419C9.25679 20.9415 8.237 19.909 8.23682 18.6343L8.19482 15.5376C8.19482 15.5376 8.19512 15.4646 8.24854 15.4341C8.29628 15.4039 8.35626 15.4404 8.36279 15.4468C9.57442 16.2603 11.0325 16.8002 12.562 17.0249C12.7779 17.0552 12.9941 16.9152 13.0542 16.6968C13.1863 16.1994 13.6122 15.8719 14.1216 15.8716H14.1401C14.6498 15.8717 15.0754 16.1992 15.2075 16.6968C15.2675 16.9151 15.4839 17.055 15.6997 17.0249C17.2292 16.8003 18.6873 16.2602 19.8989 15.4468C19.8989 15.4468 19.9115 15.4401 19.9233 15.4341C19.9473 15.4221 19.9834 15.4161 20.0132 15.4341ZM14.1274 16.7397C13.8819 16.7403 13.6782 16.9472 13.6782 17.1958V17.979C13.6786 18.2334 13.8821 18.4336 14.1274 18.4341C14.3792 18.4341 14.5773 18.2337 14.5776 17.979V17.1958C14.5776 16.9469 14.3794 16.7397 14.1274 16.7397ZM14.9019 8.94971C15.8017 8.94971 16.5398 9.63576 16.6538 10.5161L17.8413 10.5161C19.1011 10.5161 20.1274 11.5545 20.1274 12.8296C20.1274 12.8296 20.0916 13.3699 20.0796 14.1216C20.0783 14.1808 20.0495 14.2388 20.0024 14.2739C19.7139 14.487 19.4493 14.6631 19.4253 14.6753C18.4295 15.3432 17.2724 15.8136 16.0396 16.0474C15.9593 16.0631 15.8802 16.0212 15.8394 15.9497C15.4938 15.351 14.8483 14.9605 14.1284 14.9604C13.4133 14.9604 12.7615 15.3465 12.4058 15.9458C12.3644 16.0162 12.2863 16.0567 12.2065 16.0415C10.984 15.8071 9.82717 15.3375 8.8374 14.6812L8.26123 14.2808C8.2133 14.2504 8.18315 14.1959 8.18311 14.1353C8.16511 13.8256 8.13525 12.8296 8.13525 12.8296C8.13529 11.5547 9.16085 10.5164 10.4204 10.5161H11.603C11.7171 9.63591 12.4544 8.94992 13.354 8.94971H14.9019ZM13.355 9.86084C12.9532 9.86084 12.6113 10.1399 12.5151 10.5161H15.7417C15.6455 10.1399 15.3036 9.86084 14.9019 9.86084H13.355Z" fill="#2D2F39" />
            </svg>
            ),
            nome: 'Escolas cadastradas',
            informacao: qtdEscolas !== null ? qtdEscolas : 'Carregando...'
        }
    ];

    // grafico de pizza - revisar
    useEffect(() => {
        // Função de inicialização
        const initGrafico = () => {
            // Verifica se o elemento existe
            const grafico = document.querySelector('#hs-doughnut-chart');
            if (!grafico || typeof buildChart !== 'function') return;

            buildChart('#hs-doughnut-chart', (mode) => ({
                chart: {
                    height: 230,
                    width: 230,
                    type: 'donut',
                    zoom: { enabled: false }
                },
                plotOptions: {
                    pie: {
                        donut: { size: '76%' }
                    }
                },
                series: [47, 23, 30],
                labels: ['Tailwind CSS', 'Preline UI', 'Others'],
                legend: { show: false },
                dataLabels: { enabled: false },
                stroke: { width: 5 },
                grid: {
                    padding: {
                        top: -12,
                        bottom: -11,
                        left: -12,
                        right: -12
                    }
                },
                states: {
                    hover: {
                        filter: {
                            type: 'none'
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    custom: function (props) {
                        return buildTooltipForDonut(
                            props,
                            mode === 'dark'
                                ? ['#fff', '#fff', '#000']
                                : ['#fff', '#fff', '#000']
                        );
                    }
                }
            }), {
                colors: ['#3b82f6', '#22d3ee', '#e5e7eb'],
                stroke: { colors: ['rgb(255, 255, 255)'] }
            }, {
                colors: ['#3b82f6', '#22d3ee', '#404040'],
                stroke: { colors: ['rgb(38, 38, 38)'] }
            });
        };

        initGrafico();
    }, []);

    return (
        <>
            <div className='page-indicador'>
                <h1>Dashoboard</h1>
                <hr />
            </div>

            <section className='flex flex-row justify-between'>
                {infos.map((info, index) => (
                    <div key={index} className='box-infos flex flez-row rounded-xl bg-[#fff] shadow-xl'>
                        <img src={info.img} alt='icones' />
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
        </>
    )
}
