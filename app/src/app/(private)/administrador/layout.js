"use client"
import './styles/layout.css';
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function AdmLayout({ children }) {

    const router = useRouter();
    // SIDEBAR
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive); };

        //ICONES NAV 1
    const iconsNav =
    {
        dashboard: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13 1.66667C12.6464 1.66667 12.3072 1.80715 12.0572 2.0572C11.8071 2.30725 11.6667 2.64638 11.6667 3V6.66667H8C7.64638 6.66667 7.30724 6.80714 7.05719 7.05719C6.80714 7.30724 6.66667 7.64638 6.66667 8V12.5H3C2.64638 12.5 2.30724 12.6405 2.05719 12.8905C1.80714 13.1406 1.66667 13.4797 1.66667 13.8333V17C1.66667 17.3536 1.80714 17.6928 2.05719 17.9428C2.30724 18.1929 2.64638 18.3333 3 18.3333H17C17.3536 18.3333 17.6928 18.1929 17.9428 17.9428C18.1929 17.6928 18.3333 17.3536 18.3333 17V3C18.3333 2.64638 18.1929 2.30725 17.9428 2.0572C17.6928 1.80715 17.3536 1.66667 17 1.66667H13ZM8.33333 8.33334H11.6667V16.6667H8.33333V8.33334ZM16.6667 16.6667H13.3333V3.33334H16.6667V16.6667ZM6.66667 14.1667V16.6667H3.33333V14.1667H6.66667Z" fill="white" fillOpacity="0.5" />
        </svg>
        ),
        cadastrar: (
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 29.125V27.5312C2.25 23.1302 5.81773 19.5625 10.2188 19.5625H16.1953M23.8222 19.5059V25.1406M23.8222 25.1406V30.7754M23.8222 25.1406H29.457M23.8222 25.1406H18.1875M19.7812 8.40625C19.7812 11.9271 16.9271 14.7812 13.4062 14.7812C9.88543 14.7812 7.03125 11.9271 7.03125 8.40625C7.03125 4.88543 9.88543 2.03125 13.4062 2.03125C16.9271 2.03125 19.7812 4.88543 19.7812 8.40625Z" stroke="white" strokeOpacity="0.5" strokeWidth="3.1875" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        rotas: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><path d="M0 0H20V20H0V0Z" fill="white" /></mask>
            <g mask="url(#mask0_94_753)"><path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="white" fillOpacity="0.5" />
            </g></svg>),
        usuarios: (
            <svg width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.53125 24.5312V22.9375C2.53125 19.4167 5.38543 16.5625 8.90625 16.5625H15.2812C18.8021 16.5625 21.6562 19.4167 21.6562 22.9375V24.5312M21.6562 11.7812C24.2969 11.7812 26.4375 9.64061 26.4375 7C26.4375 4.35939 24.2969 2.21875 21.6562 2.21875M31.2188 24.5312V22.9375C31.2188 19.4167 28.3646 16.5625 24.8438 16.5625H24.0469M16.875 7C16.875 9.64061 14.7344 11.7812 12.0938 11.7812C9.45314 11.7812 7.3125 9.64061 7.3125 7C7.3125 4.35939 9.45314 2.21875 12.0938 2.21875C14.7344 2.21875 16.875 4.35939 16.875 7Z" stroke="white" strokeOpacity="0.5" strokeWidth="3.1875" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        )
    };
//LINKS DA NAV 1
    const links = [
        { href: '/administrador/dashboard', name: 'dashboard', page: 'Dashboard geral' },
        { href: '/administrador/cadastrar', name: 'cadastrar', page: 'Cadastrar' },
        { href: '/administrador/usuarios', name: 'usuarios', page: 'Usuários' }
    ];

    //nav2------------------------------------
    const iconsNav2 =
    {
         perfil: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.9696 19.5047C16.7257 17.5293 15.0414 16 13 16H11C8.95858 16 7.27433 17.5293 7.03036 19.5047M16.9696 19.5047C19.3986 17.893 21 15.1335 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 15.1335 4.60137 17.893 7.03036 19.5047M16.9696 19.5047C15.5456 20.4496 13.8371 21 12 21C10.1629 21 8.45441 20.4496 7.03036 19.5047M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>)
    };
    //LINKS DA NAV 2
    const links2 = [
        { href: '/administrador/perfil', name: 'perfil', page: 'Meu Perfil' },
    ];


    // busca dados do usuario
    const [erro, setErro] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/perfil", {
            method: "GET",
            credentials: "include",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.mensagem);
                setUsuario(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados do usuário:", err.message);
                setErro("Erro ao carregar perfil.");
            });
    }, []);

    const [usuario, setUsuario] = useState(null);

    // pega primeiro e ultimo nome do usuario
    const pegarPrimeiroEUltimoNome = (nome) => {
        if (!nome) return { primeiroNome: "", ultimoNome: "" };
        const nomes = nome.trim().split(" ");
        return { primeiroNome: nomes[0], ultimoNome: nomes[nomes.length - 1] };
    };
    const nomeSobrenome = usuario?.nome ? pegarPrimeiroEUltimoNome(usuario.nome) : { primeiroNome: '', ultimoNome: '' };

    // logout

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3001/logout', { method: 'POST', credentials: 'include' });

            if (response.ok) {
                router.push('/login'); // Redireciona para o login após logout
            } else {
                const data = await response.json();
                console.error('Erro ao fazer logout:', data.message);
            }
        } catch (error) {
            console.error('Erro na requisição de logout:', error);
        }
    };

    return (
        <>
            <header className='z-[9999]'>
                <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                    <div className="logoContent flex flex-nowrap gap-4 items-center">
            <img src='/img/logo.png' className='img-logo'/>
                        <div className="logo flex flex-col items-end">
                            <p className="logoName">Administrador</p>
                            <h4 className='nomepessoa'>Olá, {nomeSobrenome.primeiroNome}</h4>
                        </div>
                        <i className='bx bx-menu' id="btn" onClick={toggleSidebar}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" fill="#161A23" />
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#2D2F39" />
                            <path d="M16.4715 10.4714C16.7318 10.2111 16.7318 9.78895 16.4715 9.5286C16.2111 9.26825 15.789 9.26825 15.5287 9.5286L11.5287 13.5286C11.2683 13.7889 11.2683 14.2111 11.5287 14.4714L15.5287 18.4714C15.789 18.7318 16.2111 18.7318 16.4715 18.4714C16.7318 18.2111 16.7318 17.7889 16.4715 17.5286L12.9429 14L16.4715 10.4714Z" fill="white" fillOpacity="0.8" />
                        </svg>
                        </i>
                    </div>
                    {/*NAV BAR 1*/}
                    <ul className="navList">
                        {links.map(({ href, name, page }) => (
                            <li className="navList-item text-[#999999] hover:text-[#ffc01d] transition-colors duration-200" key={name}>
                                <a href={href}>
                                    {iconsNav[name]}
                                    <span className="linksNames">{page}</span>
                                </a>
                                <span className="tooltip">{page}</span>
                            </li>
                        ))}
{/*NAV BAR 2*/}
                        <div className='links2'>
                            {links2.map(({ href, name, page, links3 }) => (
                                <li className="navList-item" key={name}>
                                    <a href={href}>
                                        {iconsNav2[name]}
                                        <span className="linksNames">{page}</span>
                                    </a>
                                    <span className="tooltip">{page}</span>
                                </li>
                            ))}
                        </div>
                    </ul>
                    <div className="profileContent">
                        <div className="profile">
                            <button className="btn-sair group flex flex-row gap-3 items-center" onClick={handleLogout}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#FF0000] transition-colors duration-200" />
                                </svg>
                                <p className="text-[#757575] group-hover:text-[#FF0000] transition-colors duration-200">Sair</p>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className={`main-content justify-items-center ${sidebarActive ? 'collapsed' : ''}`}>
                {children}
            </main>
        </> );}