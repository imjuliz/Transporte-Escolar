"use client";
import { Kings } from 'next/font/google'
import '../styles/globals.css';
import '../styles/page.css';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Home() {
    const pathname = usePathname();

    const links = [
        { href: '/', page: 'Página Inicial' },
        { href: '/TrabalhoConosco', page: 'Trabalhe Conosco' },
        { href: '/responsaveis', page: 'Responsaveis'}
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
            classe: 'row-left'
        },
        {
            text: 'Com tecnologia avançada, organizamos rotas exclusivas para os alunos, além de garantir que nossos usuários tenham acesso às informações necessárias para um transporte mais organizado.',
            img: './img/sobre2.svg',
            classe: 'row-right'
        },
        {
            text: 'Não somos apenas um sistema. Somos a ponte entre a segurança e a inovação no transporte escolar.',
            img: './img/sobre3.svg',
            classe: 'row-left'
        }
    ]

    const banner = [
    {
        img1: './img/banner1/montanha.svg',
        img2: './img/banner1/onibus.svg',
        img3:'./img/banner1/arvore1.svg',
        img4: './img/banner1/arvore2.svg',
        img5:'./img/banner1/circulo.svg'
    }
    ];

    const card4 = [
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
            text: 'Acompanham ento em tempo real o trajeto do transporte escolar, garantindo mais segurança e tranquilidade.'
        },
        {
            img: './img/sessao5/icon2.svg',
            title: 'comunicação eficiente',
            text: 'Notificações instantâneas sobre atrasos, mudanças de rota e horários, evitando preocupações e incertezas.'
        },
        {
            img: './img/sessao5/icon3.svg',
            title: 'Previsibilidade e controle',
            text: 'Dados acessíveis para planejamento preciso, permitindo ajustes rápidos e garantindo pontualidade.'
        }
    ];

    return (
        <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* navbar */}
            <header>
                <ul className='linksrapidos'>
                    <li className='logo'>Nome</li>
                    <li className='barra'>|</li>
                    {links.map(({ href, page, index }) => (
                        <li className="linksrapidos" key={index}>
                            <a href={href}><span className="linksrapidos">{page}</span></a>
                        </li>
                    ))}
                    <li className='barra'>|</li>
                    <li className='login'><a href='#'>entrar</a></li>
                </ul>
            </header>
            {/* banner */}
            <section className='banner'>
                <div className='banner-container'>
                    <div className='banner-textos'>
                        <h1>Conectando trajetos, garantindo segurança!</h1>
                        <p>Segurança e eficiência no transporte escolar. Seu caminho para a tranquilidade começa aqui!</p>
                    </div>
                    <div className='banner-imgs'>
                    {banner.map(({ img1, img2, img3,img4, img5, card }) => (
                            <div className="banner" key={card}>
                                <div className='banner1img'>
                                    <img src={img1} className='montanha' />
                                    <img src= {img2} className='onibus'/>
                                    <img src={img3} className='arvore1'/>
                                    <img src={img4} className='arvore2'/>
                                    <img src={img5} className='circulo'/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

                <section className='sessão2'>
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

                <section className='sessão3'>
                    <div className='sessao3-corpo'>
                    <h2>Sobre nós</h2>
                <div className="grid grid-flow-col grid-rows-3 gap-4">
                    {sobreItens.map((sobre, index) => (
                        <div key={index} className={sobre.classe}>
                            <img src={sobre.img} />
                                <p>{sobre.text}</p>
                        </div>
                    ))}
                </div>
                </div>
                </section>

                <section className='sessão5'>
                    <h2 className='title5_2'>Por que usar o -nome-?</h2>
                    <h1 className='title5_1'>Simples, fácil e rápido</h1>
                    <h3 className='title5_3'>Nossa plataforma te ajuda a ter controle total e otimizar uma experiência organizada e confiável com o transporte escolar!</h3>
                    <div className='cards5'>
                        {cards5.map(({ img, title, text, card }) => (
                            <div className="cards52" key={card}>
                                <div className='cards52'>
                                    <img src={img} className='card5' />
                                    <div className='texto5'>
                                    <p className='title5'>{title}</p>
                                    <p className='text5'>{text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                       
                    </div> <img src='./img/sessao5/Content.svg' className='rounded float-end banner2'/>
                </section>

                <section className='sessão4'>
                    <h2 className='title2'>Como funciona?</h2>
                    <h1 className='title'>Entenda em poucos passos</h1>
                    <h3 className='title3'>Em apenas algumas etapas fáceis, você está pronto para gerenciar suas viagens com nosso transporte escolar. Tudo me um só lugar.</h3>
                    <div className='cards4'>
                        {card4.map(({ img1, img2, text, card }) => (
                            <div className="cards42" key={card}>
                                <div className='cards42'>
                                    <img src={img2} className='card4' />
                                    <img src={img1} className='bolinha' />
                                    <p className='text4'>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

        </>
    );
}

{/* TESTE
import { Kings } from 'next/font/google'
import '../styles/globals.css'
import '../styles/page.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Home() {
    const pathname = usePathname();

    const [title, setTitle] = useState("");

    // Chamada à API do backend ao carregar a página
    useEffect(() => {
        fetch("http://localhost:3001/home").then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setTitle(data.title)
            }
        )
    }, [] // para que a requisiçao seja executada apenas uma vez
    );


    return (
        <>
            <section>
                <div>
                    <h1>{title}</h1>
                </div>

                <div>
                    <image></image>
                </div>
            </section>
        </>
    )
}
*/}