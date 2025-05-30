"use client"
import './styles/layout.css';
import { useEffect, useState } from "react";
import Image from 'next/image'
export default function AlunoLayout({ children }) {
    // SIDEBAR
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const iconsNav =
    {
        dashbord: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M13 1.66667C12.6464 1.66667 12.3072 1.80715 12.0572 2.0572C11.8071 2.30725 11.6667 2.64638 11.6667 3V6.66667H8C7.64638 6.66667 7.30724 6.80714 7.05719 7.05719C6.80714 7.30724 6.66667 7.64638 6.66667 8V12.5H3C2.64638 12.5 2.30724 12.6405 2.05719 12.8905C1.80714 13.1406 1.66667 13.4797 1.66667 13.8333V17C1.66667 17.3536 1.80714 17.6928 2.05719 17.9428C2.30724 18.1929 2.64638 18.3333 3 18.3333H17C17.3536 18.3333 17.6928 18.1929 17.9428 17.9428C18.1929 17.6928 18.3333 17.3536 18.3333 17V3C18.3333 2.64638 18.1929 2.30725 17.9428 2.0572C17.6928 1.80715 17.3536 1.66667 17 1.66667H13ZM8.33333 8.33334H11.6667V16.6667H8.33333V8.33334ZM16.6667 16.6667H13.3333V3.33334H16.6667V16.6667ZM6.66667 14.1667V16.6667H3.33333V14.1667H6.66667Z" fill="white" fillOpacity="0.5"/>
            </svg>
            ),
        cadastros: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
        </svg>),
        rotas: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><path d="M0 0H20V20H0V0Z" fill="white" /></mask>
            <g mask="url(#mask0_94_753)"><path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="white" fillOpacity="0.5" />
            </g></svg>),
            relatorios: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66667 7.49998C6.20643 7.49998 5.83333 7.87308 5.83333 8.33331C5.83333 8.79355 6.20643 9.16665 6.66667 9.16665H13.3333C13.7936 9.16665 14.1667 8.79355 14.1667 8.33331C14.1667 7.87308 13.7936 7.49998 13.3333 7.49998H6.66667Z" fill="white" fillOpacity="0.5"/>
                <path d="M6.66667 10.8333C6.20643 10.8333 5.83333 11.2064 5.83333 11.6666C5.83333 12.1269 6.20643 12.5 6.66667 12.5H10C10.4602 12.5 10.8333 12.1269 10.8333 11.6666C10.8333 11.2064 10.4602 10.8333 10 10.8333H6.66667Z" fill="white" fillOpacity="0.5"/>
                <path d="M6.66667 14.1666C6.20643 14.1666 5.83333 14.5397 5.83333 15C5.83333 15.4602 6.20643 15.8333 6.66667 15.8333H13.3333C13.7936 15.8333 14.1667 15.4602 14.1667 15C14.1667 14.5397 13.7936 14.1666 13.3333 14.1666H6.66667Z" fill="white" fillOpacity="0.5"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.399 4.2813C17.3319 4.11899 17.2335 3.97153 17.1093 3.84739L14.4863 1.22442C14.2365 0.974305 13.8976 0.833625 13.5441 0.833313H3.83333C3.47971 0.833313 3.14057 0.973789 2.89052 1.22384C2.64048 1.47389 2.5 1.81302 2.5 2.16665V17.8333C2.5 18.0084 2.53449 18.1818 2.60149 18.3436C2.6685 18.5053 2.76671 18.6523 2.89052 18.7761C3.01433 18.8999 3.16132 18.9981 3.32309 19.0652C3.48486 19.1322 3.65824 19.1666 3.83333 19.1666H16.1667C16.3418 19.1666 16.5151 19.1322 16.6769 19.0652C16.8387 18.9981 16.9857 18.8999 17.1095 18.7761C17.2333 18.6523 17.3315 18.5053 17.3985 18.3436C17.4655 18.1818 17.5 18.0084 17.5 17.8333V4.7919L16.6667 4.79165L17.5 4.79369L17.5 4.7919C17.5002 4.61672 17.4659 4.44321 17.399 4.2813ZM12.5 4.58331C12.5 5.27367 13.0596 5.83331 13.75 5.83331H15.8333V17.5H4.16667V2.49998H12.5V4.58331ZM15.0715 4.16665L14.1667 3.26182V4.16665H15.0715Z" fill="white" fillOpacity="0.5"/></svg>
                )
    };

    const links = [
        { href: './navegacao', name: 'dashbord', page: 'Dashbord geral' },
                { href: './cadastrar', name: 'cadastros', page: 'Cadastros',
                    links3 : [
                        { href: '/login', name: 'motoristas', page: 'Motoristas' },
                        { href: '/login', name: 'veiculos', page: 'Veículos' },
                        { href: '/login', name: 'alunos', page: 'Alunos' },
                        { href: '/login', name: 'responsaveis', page: 'Responsáveis' }]
                     },
                { href: '/#', name: 'rotas', page: 'Rotas' },
                { href: '/#', name: 'relatorios', page: 'Relatórios'}
    ];

//nav2------------------------------------
    const iconsNav2 =
        {
            ajuda: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_13_310)">
                    <path d="M8.33325 7.49998C8.33325 7.01084 8.51569 6.69801 8.75521 6.49478C9.01285 6.27618 9.38605 6.14581 9.79159 6.14581C10.1971 6.14581 10.5703 6.27618 10.828 6.49478C11.0675 6.69801 11.2499 7.01084 11.2499 7.49998C11.2499 7.86428 11.1641 8.06654 11.0644 8.21612C10.948 8.39062 10.7949 8.52824 10.536 8.76096L10.4841 8.80765C10.2178 9.04735 9.86739 9.37139 9.60023 9.84339C9.3249 10.3298 9.16659 10.9176 9.16659 11.6666C9.16659 12.1269 9.53968 12.5 9.99992 12.5C10.4602 12.5 10.8333 12.1269 10.8333 11.6666C10.8333 11.1657 10.9354 10.8681 11.0507 10.6644C11.1741 10.4463 11.3446 10.2755 11.5991 10.0465C11.622 10.0259 11.6461 10.0043 11.6713 9.98188C11.899 9.77889 12.2109 9.50085 12.4511 9.14062C12.742 8.70425 12.9166 8.17734 12.9166 7.49998C12.9166 6.53079 12.5261 5.74987 11.9063 5.22393C11.3045 4.71336 10.5319 4.47915 9.79159 4.47915C9.05128 4.47915 8.27866 4.71336 7.67692 5.22393C7.05706 5.74987 6.66659 6.53079 6.66659 7.49998C6.66659 7.96022 7.03968 8.33331 7.49992 8.33331C7.96016 8.33331 8.33325 7.96022 8.33325 7.49998Z" fill="white" fillOpacity="0.5" />
                    <path d="M10.6249 15.5597C10.9345 15.2192 10.9094 14.6921 10.5688 14.3825C10.2283 14.0729 9.70125 14.098 9.39165 14.4386L9.38332 14.4477C9.07372 14.7883 9.0988 15.3153 9.43934 15.6249C9.77988 15.9345 10.3069 15.9094 10.6165 15.5689L10.6249 15.5597Z" fill="white" fillOpacity="0.5" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 0.833313C4.93718 0.833313 0.833252 4.93724 0.833252 9.99998C0.833252 15.0627 4.93718 19.1666 9.99992 19.1666C15.0627 19.1666 19.1666 15.0627 19.1666 9.99998C19.1666 4.93724 15.0627 0.833313 9.99992 0.833313ZM2.49992 9.99998C2.49992 5.85772 5.85766 2.49998 9.99992 2.49998C14.1422 2.49998 17.4999 5.85772 17.4999 9.99998C17.4999 14.1422 14.1422 17.5 9.99992 17.5C5.85766 17.5 2.49992 14.1422 2.49992 9.99998Z" fill="white" fillOpacity="0.5" /></g>
                <defs><clipPath id="clip0_13_310"><rect width="20" height="20" fill="white" /></clipPath></defs></svg>),
            perfil: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
            </svg>),
            notificacoes: (<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_95_766" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="20">
                    <path d="M0 0H23V20H0V0Z" fill="white" /></mask>
                <g mask="url(#mask0_95_766)">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
                </g></svg>),
            sair: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            )
        };
        const links2 = [
            { href: '/ajuda', name: 'ajuda', page: 'Ajuda' },
            { href: '/administrador/perfil', name: 'perfil', page: 'Meu Perfil' },
            { href: '/notificacoes', name: 'notificacoes', page: 'Notificações' },
            { href: 'logout()', name: 'sair', page: 'Sair' }
        ];



    //logout
    const logout = () => {
        localStorage.removeItem("usuario"); // remove os dados do usuário
        window.location.href = "/login"; // redireciona p pag de login
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
                                <p className="logoName">Administrador</p>
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
                                <button type='submit' className="btn-sair group flex flex-row gap-3 items-center" onClick={logout}>
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
                </>
    );
}



// "use client";
// import '../../../styles/administrador.css';
// import './styles/layout.css';
// import { usePathname } from 'next/navigation';
// import axios from 'axios';
// import { useRef, useEffect, useState } from "react";

// export default function administrador() {
//     useEffect(() => {
//         const menuBtn = document.querySelector("#btn");
//         const sidebar = document.querySelector(".sidebar");
//         const toggleSidebar = () => {
//             sidebar.classNameList.toggle("active");
//         };
//         menuBtn.addEventListener("click", toggleSidebar);

//         // Cleanup para evitar vazamento de eventos
//         return () => {
//             menuBtn.removeEventListener("click", toggleSidebar);
//         };
//     }, []); // [] garante que o código seja executado apenas uma vez


//     const iconsNav =
//     {
//         dashbord: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fillRule="evenodd" clipRule="evenodd" d="M13 1.66667C12.6464 1.66667 12.3072 1.80715 12.0572 2.0572C11.8071 2.30725 11.6667 2.64638 11.6667 3V6.66667H8C7.64638 6.66667 7.30724 6.80714 7.05719 7.05719C6.80714 7.30724 6.66667 7.64638 6.66667 8V12.5H3C2.64638 12.5 2.30724 12.6405 2.05719 12.8905C1.80714 13.1406 1.66667 13.4797 1.66667 13.8333V17C1.66667 17.3536 1.80714 17.6928 2.05719 17.9428C2.30724 18.1929 2.64638 18.3333 3 18.3333H17C17.3536 18.3333 17.6928 18.1929 17.9428 17.9428C18.1929 17.6928 18.3333 17.3536 18.3333 17V3C18.3333 2.64638 18.1929 2.30725 17.9428 2.0572C17.6928 1.80715 17.3536 1.66667 17 1.66667H13ZM8.33333 8.33334H11.6667V16.6667H8.33333V8.33334ZM16.6667 16.6667H13.3333V3.33334H16.6667V16.6667ZM6.66667 14.1667V16.6667H3.33333V14.1667H6.66667Z" fill="white" fillOpacity="0.5"/>
//             </svg>
//             ),
//         cadastros: (
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
//         </svg>),
//         rotas: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <mask id="mask0_94_753" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20"><path d="M0 0H20V20H0V0Z" fill="white" /></mask>
//             <g mask="url(#mask0_94_753)"><path d="M9.98939 0.00386047C6.67896 0.00386047 3.99565 2.44467 3.99565 5.45623C3.99565 8.476 7.59842 12.8224 9.21663 14.6236C9.6172 15.0689 10.3595 15.0689 10.76 14.6236C12.3793 12.8224 15.9829 8.476 15.9829 5.45623C15.9829 2.44467 13.2998 0.00386047 9.98939 0.00386047ZM9.98939 3.50918C11.172 3.50918 12.1297 4.38038 12.1297 5.45623C12.1297 6.53136 11.1709 7.40329 9.98939 7.40329C8.80757 7.40329 7.84911 6.53232 7.84911 5.45623C7.84911 4.38038 8.8065 3.50918 9.98939 3.50918ZM4.98886 13.2391C4.91193 13.2394 4.83314 13.2483 4.75462 13.2657C1.90285 13.9064 0 15.0525 0 16.3612C0 18.3686 4.47209 19.9961 9.98939 19.9961C15.5064 19.9961 19.9785 18.3686 19.9785 16.3612C19.9785 15.0525 18.0759 13.9074 15.2239 13.2676C14.5954 13.1267 13.985 13.5678 13.985 14.1567C13.985 14.5693 14.2869 14.9381 14.7265 15.037C16.5293 15.4442 17.6252 16.0086 17.93 16.3595C17.4156 16.9547 14.6782 18.177 9.98939 18.177C5.3003 18.177 2.56314 16.9547 2.04849 16.3595C2.35224 16.0077 3.44917 15.4442 5.25228 15.037C5.69159 14.9391 5.99347 14.5693 5.99347 14.1567C5.99347 13.6407 5.52658 13.2374 4.98886 13.2391Z" fill="white" fillOpacity="0.5" />
//             </g></svg>),
//             relatorios: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M6.66667 7.49998C6.20643 7.49998 5.83333 7.87308 5.83333 8.33331C5.83333 8.79355 6.20643 9.16665 6.66667 9.16665H13.3333C13.7936 9.16665 14.1667 8.79355 14.1667 8.33331C14.1667 7.87308 13.7936 7.49998 13.3333 7.49998H6.66667Z" fill="white" fillOpacity="0.5"/>
//                 <path d="M6.66667 10.8333C6.20643 10.8333 5.83333 11.2064 5.83333 11.6666C5.83333 12.1269 6.20643 12.5 6.66667 12.5H10C10.4602 12.5 10.8333 12.1269 10.8333 11.6666C10.8333 11.2064 10.4602 10.8333 10 10.8333H6.66667Z" fill="white" fillOpacity="0.5"/>
//                 <path d="M6.66667 14.1666C6.20643 14.1666 5.83333 14.5397 5.83333 15C5.83333 15.4602 6.20643 15.8333 6.66667 15.8333H13.3333C13.7936 15.8333 14.1667 15.4602 14.1667 15C14.1667 14.5397 13.7936 14.1666 13.3333 14.1666H6.66667Z" fill="white" fillOpacity="0.5"/>
//                 <path fillRule="evenodd" clipRule="evenodd" d="M17.399 4.2813C17.3319 4.11899 17.2335 3.97153 17.1093 3.84739L14.4863 1.22442C14.2365 0.974305 13.8976 0.833625 13.5441 0.833313H3.83333C3.47971 0.833313 3.14057 0.973789 2.89052 1.22384C2.64048 1.47389 2.5 1.81302 2.5 2.16665V17.8333C2.5 18.0084 2.53449 18.1818 2.60149 18.3436C2.6685 18.5053 2.76671 18.6523 2.89052 18.7761C3.01433 18.8999 3.16132 18.9981 3.32309 19.0652C3.48486 19.1322 3.65824 19.1666 3.83333 19.1666H16.1667C16.3418 19.1666 16.5151 19.1322 16.6769 19.0652C16.8387 18.9981 16.9857 18.8999 17.1095 18.7761C17.2333 18.6523 17.3315 18.5053 17.3985 18.3436C17.4655 18.1818 17.5 18.0084 17.5 17.8333V4.7919L16.6667 4.79165L17.5 4.79369L17.5 4.7919C17.5002 4.61672 17.4659 4.44321 17.399 4.2813ZM12.5 4.58331C12.5 5.27367 13.0596 5.83331 13.75 5.83331H15.8333V17.5H4.16667V2.49998H12.5V4.58331ZM15.0715 4.16665L14.1667 3.26182V4.16665H15.0715Z" fill="white" fillOpacity="0.5"/></svg>
//                 )
//     };


//     const pathname = usePathname();

//     const links = [
//         { href: '/navegacao', name: 'dashbord', page: 'Dashbord geral' },
//         { href: '/cadastros', name: 'cadastros', page: 'Cadastros',
//             links3 : [
//                 { href: '/login', name: 'motoristas', page: 'Motoristas' },
//                 { href: '/login', name: 'veiculos', page: 'Veículos' },
//                 { href: '/login', name: 'alunos', page: 'Alunos' },
//                 { href: '/login', name: 'responsaveis', page: 'Responsáveis' }]
//              },
//         { href: '/#', name: 'rotas', page: 'Rotas' },
//         { href: '/#', name: 'relatorios', page: 'Relatórios'}
//     ];
//     const iconsNav2 =
//     {
//         ajuda: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g clipPath="url(#clip0_13_310)">
//                 <path d="M8.33325 7.49998C8.33325 7.01084 8.51569 6.69801 8.75521 6.49478C9.01285 6.27618 9.38605 6.14581 9.79159 6.14581C10.1971 6.14581 10.5703 6.27618 10.828 6.49478C11.0675 6.69801 11.2499 7.01084 11.2499 7.49998C11.2499 7.86428 11.1641 8.06654 11.0644 8.21612C10.948 8.39062 10.7949 8.52824 10.536 8.76096L10.4841 8.80765C10.2178 9.04735 9.86739 9.37139 9.60023 9.84339C9.3249 10.3298 9.16659 10.9176 9.16659 11.6666C9.16659 12.1269 9.53968 12.5 9.99992 12.5C10.4602 12.5 10.8333 12.1269 10.8333 11.6666C10.8333 11.1657 10.9354 10.8681 11.0507 10.6644C11.1741 10.4463 11.3446 10.2755 11.5991 10.0465C11.622 10.0259 11.6461 10.0043 11.6713 9.98188C11.899 9.77889 12.2109 9.50085 12.4511 9.14062C12.742 8.70425 12.9166 8.17734 12.9166 7.49998C12.9166 6.53079 12.5261 5.74987 11.9063 5.22393C11.3045 4.71336 10.5319 4.47915 9.79159 4.47915C9.05128 4.47915 8.27866 4.71336 7.67692 5.22393C7.05706 5.74987 6.66659 6.53079 6.66659 7.49998C6.66659 7.96022 7.03968 8.33331 7.49992 8.33331C7.96016 8.33331 8.33325 7.96022 8.33325 7.49998Z" fill="white" fillOpacity="0.5" />
//                 <path d="M10.6249 15.5597C10.9345 15.2192 10.9094 14.6921 10.5688 14.3825C10.2283 14.0729 9.70125 14.098 9.39165 14.4386L9.38332 14.4477C9.07372 14.7883 9.0988 15.3153 9.43934 15.6249C9.77988 15.9345 10.3069 15.9094 10.6165 15.5689L10.6249 15.5597Z" fill="white" fillOpacity="0.5" />
//                 <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 0.833313C4.93718 0.833313 0.833252 4.93724 0.833252 9.99998C0.833252 15.0627 4.93718 19.1666 9.99992 19.1666C15.0627 19.1666 19.1666 15.0627 19.1666 9.99998C19.1666 4.93724 15.0627 0.833313 9.99992 0.833313ZM2.49992 9.99998C2.49992 5.85772 5.85766 2.49998 9.99992 2.49998C14.1422 2.49998 17.4999 5.85772 17.4999 9.99998C17.4999 14.1422 14.1422 17.5 9.99992 17.5C5.85766 17.5 2.49992 14.1422 2.49992 9.99998Z" fill="white" fillOpacity="0.5" /></g>
//             <defs><clipPath id="clip0_13_310"><rect width="20" height="20" fill="white" /></clipPath></defs></svg>),
//         perfil: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fillRule="evenodd" clipRule="evenodd" d="M9.99992 2.5C8.89485 2.5 7.83504 2.93899 7.05364 3.72039C6.27224 4.50179 5.83325 5.5616 5.83325 6.66667C5.83325 7.77174 6.27224 8.83154 7.05364 9.61294C7.10861 9.66791 7.16495 9.72119 7.22259 9.77273C6.50883 10.0998 5.85173 10.5534 5.28587 11.1193C4.03563 12.3695 3.33325 14.0652 3.33325 15.8333V16.6667C3.33325 17.1269 3.70635 17.5 4.16659 17.5C4.62682 17.5 4.99992 17.1269 4.99992 16.6667V15.8333C4.99992 14.5073 5.5267 13.2355 6.46438 12.2978C7.40207 11.3601 8.67384 10.8333 9.99992 10.8333C11.326 10.8333 12.5978 11.3601 13.5355 12.2978C14.4731 13.2355 14.9999 14.5073 14.9999 15.8333V16.6667C14.9999 17.1269 15.373 17.5 15.8333 17.5C16.2935 17.5 16.6666 17.1269 16.6666 16.6667V15.8333C16.6666 14.0652 15.9642 12.3695 14.714 11.1193C14.1481 10.5534 13.491 10.0998 12.7772 9.77273C12.8349 9.72119 12.8912 9.66791 12.9462 9.61294C13.7276 8.83154 14.1666 7.77174 14.1666 6.66667C14.1666 5.5616 13.7276 4.50179 12.9462 3.72039C12.1648 2.93899 11.105 2.5 9.99992 2.5ZM8.23215 4.8989C8.70099 4.43006 9.33688 4.16667 9.99992 4.16667C10.663 4.16667 11.2988 4.43006 11.7677 4.8989C12.2365 5.36774 12.4999 6.00363 12.4999 6.66667C12.4999 7.32971 12.2365 7.96559 11.7677 8.43443C11.2988 8.90327 10.663 9.16667 9.99992 9.16667C9.33688 9.16667 8.70099 8.90327 8.23215 8.43443C7.76331 7.96559 7.49992 7.32971 7.49992 6.66667C7.49992 6.00363 7.76331 5.36774 8.23215 4.8989Z" fill="white" fillOpacity="0.5" />
//         </svg>),
//         notificacoes: (<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <mask id="mask0_95_766" maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="20">
//                 <path d="M0 0H23V20H0V0Z" fill="white" /></mask>
//             <g mask="url(#mask0_95_766)">
//                 <path d="M16.1395 13.638C16.1151 13.609 16.1151 13.5514 16.1151 13.4937V7.97876C16.1151 4.83163 14.0946 2.26193 11.49 1.94451V0.616242C11.49 0.298587 11.2709 0.0388184 11.0032 0.0388184C10.7352 0.0388184 10.5163 0.298587 10.5163 0.616242V1.94451C7.93591 2.23322 5.89095 4.83163 5.89095 7.97876V13.5224C5.89095 13.5803 5.86676 13.609 5.84237 13.638L4.62515 15.0815C4.40602 15.3415 4.30865 15.6592 4.30865 16.0345V16.4674C4.30865 17.1893 4.81989 17.7957 5.4285 17.7957H8.83663C9.00698 19.0084 9.90769 19.9612 11.0032 19.9612C12.0986 19.9612 12.9991 19.0371 13.1697 17.7957H16.5776C17.1862 17.7957 17.6975 17.1893 17.6975 16.4674V16.0345C17.6975 15.6879 17.5757 15.3415 17.381 15.0815L16.1395 13.638ZM11.0032 18.8063C10.4675 18.8063 10.0051 18.3731 9.85891 17.7957H12.1716C12.0012 18.3731 11.5386 18.8063 11.0032 18.8063ZM16.7238 16.4674C16.7238 16.5543 16.6506 16.6408 16.5776 16.6408H5.4285C5.35552 16.6408 5.28255 16.5543 5.28255 16.4674V16.0345C5.28255 15.9766 5.30674 15.9479 5.33113 15.9189L6.54835 14.4754C6.76748 14.2154 6.86485 13.8977 6.86485 13.5224V7.97876C6.86485 5.29376 8.71487 3.07042 11.0032 3.07042C13.2912 3.07042 15.1415 5.26482 15.1415 7.97876V13.5224C15.1415 13.869 15.2632 14.2154 15.458 14.4754L16.675 15.9189C16.6994 15.9479 16.7238 16.0055 16.7238 16.0345V16.4674ZM4.33304 13.0316C4.23567 13.1471 4.11391 13.2048 3.99235 13.2048C3.87059 13.2048 3.74882 13.1471 3.65146 13.0316C2.8725 12.1078 2.43424 10.8661 2.43424 9.5668C2.43424 8.26771 2.8725 7.02604 3.65146 6.10225C3.84619 5.87119 4.1383 5.87119 4.33304 6.10225C4.52778 6.33308 4.52778 6.67968 4.33304 6.9105C3.72443 7.6324 3.40813 8.55643 3.40813 9.5668C3.40813 10.5774 3.74882 11.5014 4.33304 12.2231C4.52778 12.4542 4.52778 12.8008 4.33304 13.0316ZM2.60478 14.2733C2.79952 14.5041 2.79952 14.8507 2.60478 15.0815C2.50742 15.197 2.38565 15.2549 2.26389 15.2549C2.14213 15.2549 2.02057 15.197 1.9232 15.0815C0.681586 13.609 0 11.6457 0 9.5668C0 7.48793 0.681586 5.52459 1.9232 4.05208C2.11794 3.82126 2.41005 3.82126 2.60478 4.05208C2.79952 4.28315 2.79952 4.62951 2.60478 4.86057C1.55791 6.10225 0.973694 7.77688 0.973694 9.5668C0.973694 11.357 1.55791 13.0029 2.60478 14.2733ZM18.3546 13.0316C18.2573 13.1471 18.1355 13.2048 18.014 13.2048C17.8922 13.2048 17.7704 13.1471 17.6731 13.0316C17.4783 12.8008 17.4783 12.4542 17.6731 12.2231C18.9147 10.7506 18.9147 8.38301 17.6731 6.9105C17.4783 6.67968 17.4783 6.33308 17.6731 6.10225C17.8678 5.87119 18.1599 5.87119 18.3546 6.10225C19.9613 8.0077 19.9613 11.1261 18.3546 13.0316ZM22.0061 9.5668C22.0061 11.6457 21.3245 13.609 20.0831 15.0815C19.9857 15.197 19.864 15.2549 19.7422 15.2549C19.6204 15.2549 19.4989 15.197 19.4015 15.0815C19.2068 14.8507 19.2068 14.5041 19.4015 14.2733C20.4482 13.0316 21.0324 11.357 21.0324 9.5668C21.0324 7.77688 20.4482 6.13096 19.4015 4.86057C19.2068 4.62951 19.2068 4.28315 19.4015 4.05208C19.5963 3.82126 19.8884 3.82126 20.0831 4.05208C21.3245 5.52459 22.0061 7.48793 22.0061 9.5668Z" fill="white" fillOpacity="0.5" />
//             </g></svg>),
//         sair: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//         )
//     };
//     const links2 = [
//         { href: '/ajuda', name: 'ajuda', page: 'Ajuda' },
//         { href: '/administrador/perfil', name: 'perfil', page: 'Meu Perfil' },
//         { href: '/notificacoes', name: 'notificacoes', page: 'Notificações' },
//         { href: 'logout()', name: 'sair', page: 'Sair' }
//     ];

//     // axios.get('http://localhost:3000/administrador/perfil', {
//     //     withCredentials: true
//     // });
    
//     return (
//         <>
//             <header>
//                 <div className="sidebar">
//                     <div className="logoContent">
//                         <div className="logo">
//                             <div className="logoName">Administrador</div>
//                             <div className='nomepessoa'><p>nome</p></div>
//                         </div>
//                         <i className='bx bx-menu' id="btn"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" fill="#161A23" />
//                             <rect x="0.5" y="0.5" width="27" height="27" rx="7.5" stroke="#2D2F39" />
//                             <path d="M16.4715 10.4714C16.7318 10.2111 16.7318 9.78895 16.4715 9.5286C16.2111 9.26825 15.789 9.26825 15.5287 9.5286L11.5287 13.5286C11.2683 13.7889 11.2683 14.2111 11.5287 14.4714L15.5287 18.4714C15.789 18.7318 16.2111 18.7318 16.4715 18.4714C16.7318 18.2111 16.7318 17.7889 16.4715 17.5286L12.9429 14L16.4715 10.4714Z" fill="white" fillOpacity="0.8" />
//                         </svg>
//                         </i>
//                     </div>
//                     <ul className="navList">
//                         {links.map(({ href, name, page }) => (
//                             <li className="navList-item" key={name}>
//                                 <a href={href}>
//                                     {iconsNav[name]}
//                                     <span className="linksNames">{page}</span>
//                                 </a>
//                                 <span className="tooltip">{page}</span>
//                             </li>
//                         ))}
//                         <div className='links2'>
//                             {links2.map(({ href, name, page, links3 }) => (
//                                 <li className="navList-item" key={name}>
//                                     <a href={href}>
//                                         {iconsNav2[name]}
//                                         <span className="linksNames">{page}</span>
//                                     </a>
//                                     <span className="tooltip">{page}</span>
//                                 </li>
//                             ))}
//                         </div>
//                     </ul>
//                     <div className="profileContent">
//                         <div className="profile">
//                             <button type='submit'>{/* <button onClick={logout()}> */}
//                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M11 1H13C14.1046 1 15 1.89543 15 3L15 13C15 14.1046 14.1046 15 13 15H11M1 8H11M11 8L9 10M11 8L9 6" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg></button>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </>
//     )}