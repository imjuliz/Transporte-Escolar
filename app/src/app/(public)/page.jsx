"use client";
import '../../styles/page.css';
import '../../styles/Footer.css'

import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Home() {

    const pathname = usePathname();

    const links = [
        { href: '/', page: 'Página Inicial' },
        { href: '/TrabalhoConosco', page: 'Trabalhe Conosco' }
    ];

    const cards = [
        {
            img: './img/card4.svg',
        },
        {
            img: './img/card2.svg',
        },
        {
            img: './img/card4.svg',
        },
        {
            img: './img/card2.svg',
        },
        {
            img: './img/card4.svg',
        },
        {
            img: './img/card2.svg',
        },
        {
            img: './img/card4.svg',
        }
    ];

    const sobreItens = [
        {
            text: 'Nossa missão é transformar a gestão do transporte escolar em um processo transparente e confiável, e estamos comprometidos em desenvolver uma solução eficaz para escolas, pais e alunos.',
            img: './img/sobre1.svg',
            classNamee: 'row-left'
        },
        {
            text: 'Com tecnologia avançada, organizamos rotas exclusivas para os alunos, além de garantir que nossos usuários tenham acesso às informações necessárias para um transporte mais organizado.',
            img: './img/sobre2.svg',
            classNamee: 'row-right'
        },
        {
            text: 'Não somos apenas um sistema. Somos a ponte entre a segurança e a inovação no transporte escolar.',
            img: './img/sobre3.svg',
            classNamee: 'row-left'
        }
    ]

    const banners = [
        {
            img1: './img/banner1/montanha.svg',
            img2: './img/banner1/onibus.svg',
            img3: './img/arvores.svg',
            // img4: './img/banner1/circulo.svg'
        }
    ];

    const cards4 = [
        {
            img1: './img/sessao4/bolinha1.svg',
            img2: './img/sessao4/card4_1.svg',
            text: 'Ser de Monte Azul (?)'
        },
        {
            img1: './img/sessao4/bolinha2.svg',
            img2: './img/sessao4/card4_2.svg',
            text: 'Entre na conta com base no seu tipo de usuario'
        },
        {
            img1: './img/sessao4/bolinha3.svg',
            img2: './img/sessao4/card4_3.svg',
            text: 'Tenha total controle na palma da mão.'
        }
    ];

    const cards5 = [
        {
            img: './img/sessao5/icon1.svg',
            title: 'Gestão inteligente',
            text: 'Acompanhamento em tempo real o trajeto do transporte escolar, garantindo mais segurança e tranquilidade.'
        },
        {
            img: './img/sessao5/icon2.svg',
            title: 'Comunicação eficiente',
            text: 'Notificações instantâneas sobre atrasos, mudanças de rota e horários, evitando preocupações e incertezas.'
        },
        {
            img: './img/sessao5/icon3.svg',
            title: 'Previsibilidade e controle',
            text: 'Dados acessíveis para planejamento preciso, permitindo ajustes rápidos e garantindo pontualidade.'
        }
    ];

    // FOOTER

    // outras paginas do site
    const conteudos = [
        {
            name: "Página inicial",
            link: "../#",
        },
        {
            name: "Trabalhe Conosco",
            link: "../#"
        },
        {
            name: "link 3",
            link: "../"
        }
    ]

    // contatos
    const ctts = [
        {
            end: "suporte@quintaldopet.com.br",
            link: "mailto:suporte@quintaldopet.com.br"
        },
        {
            end: "(11) 23456-7890",
            link: "tellto:1123456-7890"
        },
        {
            end: "lalalalalaa",
            link: "tellto:1123456-7890"
        },
        {
            end: "lalalaa",
            link: "tellto:1123456-7890"
        }
    ]

    // redes sociais
    const msociais = [
        {img: (
                <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.37936 3.865V6.613H0.365356V9.973H2.37936V19.959H6.51336V9.974H9.28836C9.28836 9.974 9.54836 8.363 9.67436 6.601H6.53036V4.303C6.53036 3.96 6.98036 3.498 7.42636 3.498H9.68036V0H6.61636C2.27636 0 2.37936 3.363 2.37936 3.865Z" fill="white" />
                </svg>
            ),
            link: "https://pt-br.facebook.com/",
        },
        {img: (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3505 2H8.2805C6.70365 2.00185 5.19193 2.62914 4.07703 3.74424C2.96212 4.85933 2.33508 6.37115 2.3335 7.948L2.3335 16.018C2.33535 17.5948 2.96264 19.1066 4.07773 20.2215C5.19283 21.3364 6.70465 21.9634 8.2815 21.965H16.3515C17.9283 21.9631 19.4401 21.3359 20.555 20.2208C21.6699 19.1057 22.2969 17.5938 22.2985 16.017V7.947C22.2966 6.37015 21.6694 4.85844 20.5543 3.74353C19.4392 2.62862 17.9273 2.00159 16.3505 2V2ZM20.2905 16.017C20.2905 16.5344 20.1886 17.0468 19.9906 17.5248C19.7926 18.0028 19.5024 18.4371 19.1365 18.803C18.7706 19.1689 18.3363 19.4591 17.8583 19.6571C17.3802 19.8551 16.8679 19.957 16.3505 19.957H8.2805C7.23572 19.9567 6.23382 19.5415 5.49514 18.8026C4.75646 18.0638 4.3415 17.0618 4.3415 16.017V7.947C4.34176 6.90222 4.75698 5.90032 5.49585 5.16165C6.23471 4.42297 7.23672 4.008 8.2815 4.008H16.3515C17.3963 4.00827 18.3982 4.42349 19.1369 5.16235C19.8755 5.90122 20.2905 6.90322 20.2905 7.948V16.018V16.017Z" fill="white" />
                    <path d="M12.3156 6.81897C10.947 6.82109 9.6351 7.36576 8.66746 8.33358C7.69983 9.3014 7.15542 10.6134 7.15356 11.982C7.15515 13.3509 7.69959 14.6633 8.66746 15.6314C9.63534 16.5994 10.9476 17.1441 12.3166 17.146C13.6857 17.1444 14.9982 16.5998 15.9663 15.6317C16.9344 14.6636 17.479 13.3511 17.4806 11.982C17.4784 10.6131 16.9335 9.30085 15.9653 8.33316C14.997 7.36547 13.6845 6.82129 12.3156 6.81997V6.81897ZM12.3156 15.138C11.4788 15.138 10.6763 14.8056 10.0846 14.2139C9.49297 13.6222 9.16056 12.8197 9.16056 11.983C9.16056 11.1462 9.49297 10.3437 10.0846 9.75205C10.6763 9.16037 11.4788 8.82797 12.3156 8.82797C13.1523 8.82797 13.9548 9.16037 14.5465 9.75205C15.1382 10.3437 15.4706 11.1462 15.4706 11.983C15.4706 12.8197 15.1382 13.6222 14.5465 14.2139C13.9548 14.8056 13.1523 15.138 12.3156 15.138Z" fill="white" />
                    <path d="M17.4894 8.09497C18.1726 8.09497 18.7264 7.54115 18.7264 6.85797C18.7264 6.1748 18.1726 5.62097 17.4894 5.62097C16.8063 5.62097 16.2524 6.1748 16.2524 6.85797C16.2524 7.54115 16.8063 8.09497 17.4894 8.09497Z" fill="white" />
                </svg>

            ),link: "https://www.instagram.com/",
        },
        {img: (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2925 11.719V19.098H16.0145V12.213C16.0145 10.483 15.3955 9.303 13.8475 9.303C12.6655 9.303 11.9615 10.099 11.6525 10.868C11.5395 11.143 11.5105 11.526 11.5105 11.911V19.098H7.2305C7.2305 19.098 7.2885 7.438 7.2305 6.229H11.5105V8.053L11.4825 8.095H11.5105V8.053C12.0785 7.178 13.0935 5.927 15.3665 5.927C18.1815 5.927 20.2925 7.767 20.2925 11.719ZM2.7545 0.026001C1.2915 0.026001 0.333496 0.986001 0.333496 2.249C0.333496 3.484 1.2635 4.473 2.6985 4.473H2.7265C4.2195 4.473 5.1465 3.484 5.1465 2.249C5.1205 0.986001 4.2205 0.026001 2.7555 0.026001H2.7545ZM0.587496 19.098H4.8655V6.229H0.587496V19.098Z" fill="white" />
                </svg>

            ),link: "https://www.linkedin.com/",
        }
    ]

    return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* navbar */}
            <header>
                <ul className='linksrapidos'>
                    <li className='logo'>Nome</li>
                    <li className='barra'>|</li>
                    {links.map((link, index) => (
                        <li className="linksrapidos" key={index}>
                            <a href={link.href}><span className="linksrapidos">{link.page}</span></a>
                        </li>
                    ))}
                    <li className='barra'>|</li>
                    <a href='/login'><button className='login text-[#fff] bg-[#2D2F39]'>Entrar</button></a>
                </ul>
            </header>

            {/* banner */}
            <section className='banner'>
                <div className='banner-container'>
                    <div className='banner-textos flex flex-column items-center gap-10'>
                        <h1>Conectando trajetos, garantindo segurança!</h1>
                        <p>Segurança e eficiência no transporte escolar. Seu caminho para a tranquilidade começa aqui!</p>
                    </div>
                    <div className='banner-imgs'>
                        {banners.map(( banner, index ) => (
                            <div className='banner1img flex justify-center' key={index}>
                                <img src={banner.img1} className='montanha z-10 absolute bottom-0' />
                                <img src={banner.img2} className='onibus z-10 absolute bottom-0' />
                                <img src={banner.img3} className='arvores z-10 absolute bottom-0 right-60' />
                                <img src={banner.img5} className='circulo' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='secão2'>
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <div className="imgpai">
                                <div className="img1">
                                    <img src='/img/card4.svg' />
                                </div>
                            </div>
                        </div>
                        {cards.map((card, index) => (
                            <div key={index}>
                                <div className="carousel-item" data-bs-interval="3000">
                                    <div className="imgpai">
                                        <div className="img1">
                                            <img src={card.img} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))};
                    </div>
                    <div className="div-carousel-control-prev">
                        <button className="carousel-control-prev s6" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"><svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="15.5" fill="white" stroke="#D5D5D5" />
                                <path d="M11.2929 15.2929C10.9024 15.6834 10.9024 16.3166 11.2929 16.7071L17.6569 23.0711C18.0474 23.4616 18.6805 23.4616 19.0711 23.0711C19.4616 22.6805 19.4616 22.0474 19.0711 21.6569L13.4142 16L19.0711 10.3431C19.4616 9.95262 19.4616 9.31946 19.0711 8.92893C18.6805 8.53841 18.0474 8.53841 17.6569 8.92893L11.2929 15.2929ZM12 17H13V15H12V17Z" fill="#9A1E22" />
                            </svg>
                            </span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                    </div>
                    <div className="div-carousel-control-next">
                        <button className="carousel-control-next s6" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="15.5" fill="white" stroke="#D5D5D5" />
                                <path d="M20.7071 16.7071C21.0976 16.3166 21.0976 15.6834 20.7071 15.2929L14.3431 8.92893C13.9526 8.53841 13.3195 8.53841 12.9289 8.92893C12.5384 9.31946 12.5384 9.95262 12.9289 10.3431L18.5858 16L12.9289 21.6569C12.5384 22.0474 12.5384 22.6805 12.9289 23.0711C13.3195 23.4616 13.9526 23.4616 14.3431 23.0711L20.7071 16.7071ZM19 17H20V15H19V17Z" fill="#9A1E22" />
                            </svg>
                            </span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
            <section className='secão3'>
                <div className='secao3-corpo'>
                    <h2>Sobre nós</h2>
                    <div className="grid grid-flow-col grid-rows-3 gap-4">
                        {sobreItens.map((sobre, index) => (
                            <div key={index} className={sobre.classNamee}>
                                <img src={sobre.img} />
                                <p>{sobre.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='secão5 justify-items-center content-center'>
                <h2 className='title5_2'>Por que usar o -nome-?</h2>
                <h1 className='title5_1'>Simples, fácil e rápido</h1>
                <h3 className='title5_3'>Nossa plataforma te ajuda a ter controle total e otimizar uma experiência organizada e confiável com o transporte escolar!</h3>
                <div className='cards5 flex flex-row lg:flex-col justify-between'>
                    <div className='container-cards flex flex-column gap-4'>
                        {cards5.map((card, index) => (
                            <div className="cards52 flex flex-row lg:flex-col gap-4" key={index}>
                                <img src={card.img} className='card5' />
                                <div className='texto5'>
                                    <p className='title5'>{card.title}</p>
                                    <p className='text5'>{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <img src='./img/sessao5/Content.svg' className='rounded banner2 xl:w-5/6' />
                </div>
            </section>
            <section className='secão4 justify-items-center content-center'>
                <h2 className='title2'>Como funciona?</h2>
                <h1 className='title'>Entenda em poucos passos</h1>
                <h3 className='title3'>Em apenas algumas etapas fáceis, você está pronto para gerenciar suas viagens com nosso transporte escolar. Tudo me um só lugar.</h3>
                <div className='cards4'>
                    {cards4.map((card4, index) => (
                        <div className="cards42" key={index}>
                            <div className='cards42'>
                                <img src={card4.img2} className='card4' />
                                <img src={card4.img1} className='bolinha' />
                                <p className='text4'>{card4.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <footer className=''>
                <div className="container">
                    <div className='cont-footer'>
                        <h1 className='logo'>Logo</h1>
                        <div className="cont-1 flex flex-row md:flex-col md:gap-4 justify-between">
                            <div className="f-col">
                                <h1>Outros conteúdos relevantes</h1>
                                {conteudos.map((cont, index) => (
                                        <div className='col' key={index}>
                                            <a href={cont.link}><p>{cont.name}</p></a>
                                        </div>
                                    ))}
                            </div>
                            <div className="f-col">
                                <h1>Contatos</h1>
                                {ctts.map((ctt, index) => (
                                        <div key={index}>
                                            <a href={ctt.link}><p>{ctt.end}</p></a>
                                        </div>
                                    ))}
                            </div>
                            <div className="f-col col-redes">
                                <h1>Siga-nos</h1>
                                <div className='cont-redes flex flex-row gap-4'>
                                    {msociais.map((social, index) => (
                                            <div key={index}>
                                                <a href={social.link}>{social.img}</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='cont-2'>
                            <p>© 2025. Feito por Julia Alves, Lorena Oshiro e Maria Brito.</p>
                            <p>Baixe o APP</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
