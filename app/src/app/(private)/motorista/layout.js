"use client"
import "./motorista.css";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const isMapa = pathname.includes('minha-rota');
    //sidebar
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const iconsNav =
    {
        navegacao: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <path d="M0 0H20V20H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_94_753)">
                <path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="white" fillOpacity="0.5" />
            </g></svg>),
        embarque:(<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <path d="M0 0H20V20H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_94_753)">
                <path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="white" fillOpacity="0.5" />
            </g></svg>),
        viagens:  (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0179 13.125C11.0179 12.2656 10.3348 11.5625 9.5 11.5625C8.62723 11.5625 7.98214 12.2656 7.98214 13.125C7.98214 14.0234 8.62723 14.6875 9.5 14.6875C10.3348 14.6875 11.0179 14.0234 11.0179 13.125ZM18 4.29688C18 1.79688 15.3058 0 12.7254 0H6.23661C3.6942 0 1 1.79688 1 4.29688V13.2422C1 15.1562 2.6317 16.7578 4.7567 17.3047L2.51786 19.6094C2.36607 19.7656 2.47991 20 2.66964 20H4.49107C4.64286 20 4.7567 19.9609 4.83259 19.8828L7.10938 17.5H11.8527L14.1295 19.8828C14.2054 19.9609 14.3192 20 14.471 20H16.2924C16.4821 20 16.596 19.7656 16.4442 19.6094L14.2054 17.3047C16.3304 16.7578 18 15.1562 18 13.2422V4.29688ZM2.82143 8.75V5.625H16.1786V8.75H2.82143ZM2.89732 3.75C3.31473 2.73438 4.7567 1.875 6.23661 1.875H12.7254C14.2433 1.875 15.6853 2.73438 16.0647 3.75H2.89732ZM16.1786 13.2422C16.1786 14.6484 14.1674 15.625 12.7254 15.625H6.23661C4.7567 15.625 2.82143 14.6484 2.82143 13.2422V10.625H16.1786V13.2422Z" fill="white" fillOpacity="0.5" />
        </svg>),
        veiculos: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0179 13.125C11.0179 12.2656 10.3348 11.5625 9.5 11.5625C8.62723 11.5625 7.98214 12.2656 7.98214 13.125C7.98214 14.0234 8.62723 14.6875 9.5 14.6875C10.3348 14.6875 11.0179 14.0234 11.0179 13.125ZM18 4.29688C18 1.79688 15.3058 0 12.7254 0H6.23661C3.6942 0 1 1.79688 1 4.29688V13.2422C1 15.1562 2.6317 16.7578 4.7567 17.3047L2.51786 19.6094C2.36607 19.7656 2.47991 20 2.66964 20H4.49107C4.64286 20 4.7567 19.9609 4.83259 19.8828L7.10938 17.5H11.8527L14.1295 19.8828C14.2054 19.9609 14.3192 20 14.471 20H16.2924C16.4821 20 16.596 19.7656 16.4442 19.6094L14.2054 17.3047C16.3304 16.7578 18 15.1562 18 13.2422V4.29688ZM2.82143 8.75V5.625H16.1786V8.75H2.82143ZM2.89732 3.75C3.31473 2.73438 4.7567 1.875 6.23661 1.875H12.7254C14.2433 1.875 15.6853 2.73438 16.0647 3.75H2.89732ZM16.1786 13.2422C16.1786 14.6484 14.1674 15.625 12.7254 15.625H6.23661C4.7567 15.625 2.82143 14.6484 2.82143 13.2422V10.625H16.1786V13.2422Z" fill="white" fillOpacity="0.5" />
        </svg>),
        perfil: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
        </svg>),
        notificacoes: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 9L18 9V9L17 9ZM12 4V5C14.2091 5 16 6.79086 16 9L17 9L18 9C18 5.68629 15.3137 3 12 3V4ZM17 9H16V11.76H17H18V9H17ZM18.1752 13.9365L17.4507 14.6258C17.7921 14.9846 18 15.4666 18 16H19H20C20 14.9327 19.5803 13.9625 18.8996 13.2471L18.1752 13.9365ZM18 17V16H6V17V18H18V17ZM5 16H6C6 15.4666 6.20789 14.9846 6.54929 14.6258L5.82484 13.9365L5.10038 13.2471C4.41966 13.9625 4 14.9327 4 16H5ZM7 11.76H8V9H7H6V11.76H7ZM7 9H8C8 6.79086 9.79086 5 12 5V4V3C8.68629 3 6 5.68629 6 9H7ZM6 17V16H6H5H4C4 17.1046 4.89543 18 6 18V17ZM19 16H18H18V17V18C19.1046 18 20 17.1046 20 16H19ZM5.82484 13.9365L6.54929 14.6258C7.10988 14.0366 8 13.0536 8 11.76H7H6C6 12.1612 5.70804 12.6085 5.10038 13.2471L5.82484 13.9365ZM17 11.76H16C16 13.0536 16.8901 14.0366 17.4507 14.6258L18.1752 13.9365L18.8996 13.2471C18.292 12.6085 18 12.1612 18 11.76H17Z" fill="white" fillOpacity="0.5" />
            <path d="M13.7976 19.8767C13.6312 20.2179 13.3712 20.5046 13.048 20.7035C12.7247 20.9023 12.3516 21.0051 11.9721 20.9998C11.5926 20.9945 11.2224 20.8813 10.9049 20.6735C10.5873 20.4657 10.3354 20.1718 10.1786 19.8262" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3V4" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ),
        incidentes: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ),
    };

    const links = [
        { href: '/motorista/minha-rota', name: 'navegacao', page: 'Painel de navegação' },
        { href: '/motorista/embarqueDesembarque', name: 'embarque', page: 'Embarques/ desembarques' },
        { href: '/motorista/viagens', name: 'viagens', page: 'Viagens' },
        { href: '/motorista/veiculos', name: 'veiculos', page: 'Veículos' },
        { href: '/motorista/notificacoes', name: 'notificacoes', page: 'Notificações' },
        { href: '/motorista/incidentes', name: 'incidentes', page: 'Incidentes' },
        { href: '/motorista/perfil', name: 'perfil', page: 'Meu perfil' },
    ];

    //logout
    const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include', // IMPORTANTE: inclui cookies na requisição
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // opcional
        router.push('/login'); // redireciona para a página de login
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
            <header>
                <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                    <div className="logoContent flex flex-nowrap gap-4 items-center">
                        <Image
                            src="/img/fotoPerfil.png"
                            width={100}
                            height={100}
                            alt="Foto de perfil"
                            className='fotoPerfil'
                        />
                        <div className="logo flex flex-col">
                            <p className="logoName">Motorista</p>
                            <h4 className='nomepessoa'>nome</h4>
                        </div>
                        <i className='bx bx-menu' id="btn" onClick={toggleSidebar}><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" fill="#161A23" />
                            <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#2D2F39" />
                            <path d="M16.4715 10.4714C16.7318 10.2111 16.7318 9.78895 16.4715 9.5286C16.2111 9.26825 15.789 9.26825 15.5287 9.5286L11.5287 13.5286C11.2683 13.7889 11.2683 14.2111 11.5287 14.4714L15.5287 18.4714C15.789 18.7318 16.2111 18.7318 16.4715 18.4714C16.7318 18.2111 16.7318 17.7889 16.4715 17.5286L12.9429 14L16.4715 10.4714Z" fill="white" fillOpacity="0.8" />
                        </svg>
                        </i>
                    </div>
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
                    </ul>
                    <div className="profileContent">
                        <div className="profile">
                            <button type='submit' className="btn-sair group flex flex-row gap-3 items-center" onClick={handleLogout}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#FF0000] transition-colors duration-200" />
                                </svg>
                                <p className="text-[#757575] group-hover:text-[#FF0000] transition-colors duration-200">Sair</p>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className={`main-content justify-items-center ${sidebarActive ? 'collapsed' : ''} ${isMapa ? 'p-0' : 'px-[12%]'}`}>
                {children}
            </main>
        </>
    );
}

