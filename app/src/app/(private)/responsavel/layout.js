"use client"
import "./styles/layout.css";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const isMapa = pathname.includes('minha-rota');
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };
// NAVBAR 
    const iconsNav =
    {
        rotas: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <path d="M0 0H20V20H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_94_753)">
                <path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="currentColor" />
            </g>
        </svg>
        ),
        viagens: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0914 3.47693C10.2421 4.07969 9.87562 4.6905 9.27285 4.84119L4.125 6.12815V17.3089L8.72715 16.1584C9.32992 16.0077 9.94072 16.3742 10.0914 16.9769C10.2421 17.5797 9.87562 18.1905 9.27285 18.3412L3.27285 19.8412C2.93677 19.9252 2.58072 19.8497 2.30766 19.6365C2.03461 19.4233 1.875 19.0962 1.875 18.7498V5.24978C1.875 4.73355 2.22633 4.28357 2.72715 4.15837L8.72715 2.65837C9.32992 2.50768 9.94072 2.87416 10.0914 3.47693Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.40855 2.79302C8.74022 2.58804 9.15438 2.5694 9.50312 2.74377L15.5031 5.74377C15.8842 5.93434 16.125 6.32388 16.125 6.75V20.25C16.125 20.6399 15.9231 21.002 15.5914 21.207C15.2598 21.412 14.8456 21.4306 14.4969 21.2562L8.49688 18.2562C8.11575 18.0657 7.875 17.6761 7.875 17.25V3.75C7.875 3.3601 8.07688 2.998 8.40855 2.79302ZM10.125 5.57029V16.5547L13.875 18.4297V7.44529L10.125 5.57029Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M21.6924 4.36328C21.9654 4.57647 22.125 4.90358 22.125 5.25001V18.75C22.125 19.2662 21.7737 19.7162 21.2729 19.8414L15.2729 21.3414C14.6701 21.4921 14.0593 21.1256 13.9086 20.5229C13.7579 19.9201 14.1244 19.3093 14.7272 19.1586L19.875 17.8716V6.69088L15.2729 7.84142C14.6701 7.99211 14.0593 7.62563 13.9086 7.02286C13.7579 6.42009 14.1244 5.80929 14.7272 5.6586L20.7272 4.1586C21.0633 4.07458 21.4193 4.15008 21.6924 4.36328Z" fill="currentColor" />
            </svg>

        ),
        motoristas: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0179 13.125C11.0179 12.2656 10.3348 11.5625 9.5 11.5625C8.62723 11.5625 7.98214 12.2656 7.98214 13.125C7.98214 14.0234 8.62723 14.6875 9.5 14.6875C10.3348 14.6875 11.0179 14.0234 11.0179 13.125ZM18 4.29688C18 1.79688 15.3058 0 12.7254 0H6.23661C3.6942 0 1 1.79688 1 4.29688V13.2422C1 15.1562 2.6317 16.7578 4.7567 17.3047L2.51786 19.6094C2.36607 19.7656 2.47991 20 2.66964 20H4.49107C4.64286 20 4.7567 19.9609 4.83259 19.8828L7.10938 17.5H11.8527L14.1295 19.8828C14.2054 19.9609 14.3192 20 14.471 20H16.2924C16.4821 20 16.596 19.7656 16.4442 19.6094L14.2054 17.3047C16.3304 16.7578 18 15.1562 18 13.2422V4.29688ZM2.82143 8.75V5.625H16.1786V8.75H2.82143ZM2.89732 3.75C3.31473 2.73438 4.7567 1.875 6.23661 1.875H12.7254C14.2433 1.875 15.6853 2.73438 16.0647 3.75H2.89732ZM16.1786 13.2422C16.1786 14.6484 14.1674 15.625 12.7254 15.625H6.23661C4.7567 15.625 2.82143 14.6484 2.82143 13.2422V10.625H16.1786V13.2422Z" fill="currentColor" />
            </svg>

        ),
        filhos: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 2.5C8.89497 2.5 7.83516 2.93899 7.05376 3.72039C6.27236 4.50179 5.83337 5.5616 5.83337 6.66667C5.83337 7.77174 6.27236 8.83154 7.05376 9.61294C7.10873 9.66791 7.16507 9.72119 7.22272 9.77273C6.50895 10.0998 5.85185 10.5534 5.286 11.1193C4.03575 12.3695 3.33337 14.0652 3.33337 15.8333V16.6667C3.33337 17.1269 3.70647 17.5 4.16671 17.5C4.62694 17.5 5.00004 17.1269 5.00004 16.6667V15.8333C5.00004 14.5073 5.52682 13.2355 6.46451 12.2978C7.40219 11.3601 8.67396 10.8333 10 10.8333C11.3261 10.8333 12.5979 11.3601 13.5356 12.2978C14.4733 13.2355 15 14.5073 15 15.8333V16.6667C15 17.1269 15.3731 17.5 15.8334 17.5C16.2936 17.5 16.6667 17.1269 16.6667 16.6667V15.8333C16.6667 14.0652 15.9643 12.3695 14.7141 11.1193C14.1482 10.5534 13.4911 10.0998 12.7774 9.77273C12.835 9.72119 12.8914 9.66791 12.9463 9.61294C13.7277 8.83154 14.1667 7.77174 14.1667 6.66667C14.1667 5.5616 13.7277 4.50179 12.9463 3.72039C12.1649 2.93899 11.1051 2.5 10 2.5ZM8.23227 4.8989C8.70111 4.43006 9.337 4.16667 10 4.16667C10.6631 4.16667 11.299 4.43006 11.7678 4.8989C12.2366 5.36774 12.5 6.00363 12.5 6.66667C12.5 7.32971 12.2366 7.96559 11.7678 8.43443C11.299 8.90327 10.6631 9.16667 10 9.16667C9.337 9.16667 8.70111 8.90327 8.23227 8.43443C7.76343 7.96559 7.50004 7.32971 7.50004 6.66667C7.50004 6.00363 7.76343 5.36774 8.23227 4.8989Z" fill="currentColor" />
        </svg>
        ),
        mensagens: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ),
        notificacoes: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 9L18 9V9L17 9ZM12 4V5C14.2091 5 16 6.79086 16 9L17 9L18 9C18 5.68629 15.3137 3 12 3V4ZM17 9H16V11.76H17H18V9H17ZM18.1752 13.9365L17.4507 14.6258C17.7921 14.9846 18 15.4666 18 16H19H20C20 14.9327 19.5803 13.9625 18.8996 13.2471L18.1752 13.9365ZM18 17V16H6V17V18H18V17ZM5 16H6C6 15.4666 6.20789 14.9846 6.54929 14.6258L5.82484 13.9365L5.10038 13.2471C4.41966 13.9625 4 14.9327 4 16H5ZM7 11.76H8V9H7H6V11.76H7ZM7 9H8C8 6.79086 9.79086 5 12 5V4V3C8.68629 3 6 5.68629 6 9H7ZM6 17V16H6H5H4C4 17.1046 4.89543 18 6 18V17ZM19 16H18H18V17V18C19.1046 18 20 17.1046 20 16H19ZM5.82484 13.9365L6.54929 14.6258C7.10988 14.0366 8 13.0536 8 11.76H7H6C6 12.1612 5.70804 12.6085 5.10038 13.2471L5.82484 13.9365ZM17 11.76H16C16 13.0536 16.8901 14.0366 17.4507 14.6258L18.1752 13.9365L18.8996 13.2471C18.292 12.6085 18 12.1612 18 11.76H17Z" fill="white" fillOpacity="0.5" />
            <path d="M13.7976 19.8767C13.6312 20.2179 13.3712 20.5046 13.048 20.7035C12.7247 20.9023 12.3516 21.0051 11.9721 20.9998C11.5926 20.9945 11.2224 20.8813 10.9049 20.6735C10.5873 20.4657 10.3354 20.1718 10.1786 19.8262" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3V4" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ),
        perfil: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.9696 19.5047C16.7257 17.5293 15.0414 16 13 16H11C8.95858 16 7.27433 17.5293 7.03036 19.5047M16.9696 19.5047C19.3986 17.893 21 15.1335 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 15.1335 4.60137 17.893 7.03036 19.5047M16.9696 19.5047C15.5456 20.4496 13.8371 21 12 21C10.1629 21 8.45441 20.4496 7.03036 19.5047M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        )
    };
//LINKS DA NAV
    const links = [
        { href: '/responsavel/rotas', name: 'rotas', page: 'Painel de Navegação' },
        { href: '/responsavel/viagens', name: 'viagens', page: 'Viagens' },
        { href: '/responsavel/filhos', name: 'filhos', page: 'Filhos' },
        { href: '/responsavel/mensagem', name: 'mensagens', page: 'Enviar mensagem' },
        { href: '/responsavel/notificacoes', name: 'notificacoes', page: 'Notificações' },
        { href: '/responsavel/perfil', name: 'perfil', page: 'Meu Perfil' }
    ];
    // buscar informações do perfil
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
            });}, []);

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
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                router.push('/login'); // redireciona p pag de login
            } else {
                console.error(data.message);
                alert('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao fazer logout');
        }
    };
    return (
        <>
            <header className='z-[9999]'>
                <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                    <div className="logoContent flex flex-nowrap gap-4 items-center">
                        <Image
                            src="/img/logo.png"
                            width={100}
                            height={100}
                            alt="logo"
                            className='fotoPerfil'
                        />
                        <div className="logo flex flex-col justify-end">
                            <p className="logoName">Responsável</p>
                            <h4 className='nomepessoa'>Olá, {nomeSobrenome.primeiroNome}</h4>
                        </div>
                        <i className='botaoMenu bx bx-menu' id="btn" onClick={toggleSidebar}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" fill="#161A23" />
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#2D2F39" />
                            <path d="M16.4715 10.4714C16.7318 10.2111 16.7318 9.78895 16.4715 9.5286C16.2111 9.26825 15.789 9.26825 15.5287 9.5286L11.5287 13.5286C11.2683 13.7889 11.2683 14.2111 11.5287 14.4714L15.5287 18.4714C15.789 18.7318 16.2111 18.7318 16.4715 18.4714C16.7318 18.2111 16.7318 17.7889 16.4715 17.5286L12.9429 14L16.4715 10.4714Z" fill="white" fillOpacity="0.8" />
                        </svg>
                        </i>
                    </div>
                     {/*NAV BAR ICONES*/}
                    <ul className="navList">
                        {links.map(({ href, name, page }) => (
                            <li className="navList-item text-[#999999] hover:text-[#ffc01d] transition-colors duration-200" key={name}>
                                <a href={href}>
                                    {iconsNav[name]}
                                    <span className="linksNames">{page}</span> </a>
                                <span className="tooltip">{page}</span>
                            </li> ))}
                    </ul>
                    <div className="profileContent">
                        <div className="profile">
                            <button type='submit' className="btn-sair group flex flex-row gap-3 items-center" onClick={handleLogout}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#FF0000] transition-colors duration-200" />
                                </svg>
                                <p className="text-[#757575] group-hover:text-[#FF0000] transition-colors duration-200">Sair</p>
                            </button>
                        </div> </div>
                </div> </header>
            <main className={`main-content justify-items-center ${sidebarActive ? 'collapsed' : ''} ${isMapa ? 'p-0' : 'px-[12%]'}`}>
                {children}
            </main>  </>
    );}
