"use client";
{/*

import { Kings } from 'next/font/google'
import '../styles/globals.css'
import '../styles/page.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Home() {
 const pathname = usePathname();
    const [mensagem, setMensagem] = useState("");

    // Chamada à API do backend ao carregar a página
    useEffect(() => {
        fetch("http://localhost:3000/")
            .then((response) => response.text())
            .then((data) => setMensagem(data))
            .catch((error) => console.error("Erro ao buscar dados", error));
    }, []);

    const links = [
        { href: '/', page: 'Página Inicial' },
        { href: '/TrabalhoConosco', page: 'Trabalhe Conosco' },
        { href: '/Sobre', page: 'Sobre nós' },
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

    const sobre = [
        {
            img: './img/sobre1.svg',
            text: 'Nossa missão é transformar a gestão do transporte escolar em um processo transparente e confiável, e estamos comprometidos em desenvolver uma solução eficaz para escolas, pais e alunos.'
        },
        {
            img: './img/sobre2.svg',
            text: 'Com tecnologia avançada, organizamos rotas exclusivas para os alunos, além de garantir que nossos usuários tenham acesso às informações necessárias para um transporte mais organizado.'
        },
        {
            img: './img/sobre3.svg',
            text: 'Não somos apenas um sistema. Somos a ponte entre a segurança e a inovação no transporte escolar.'
        }
    ]

    return (
        <>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous" />
            </head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet"></link>

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
            <section className='sessão1'>
                <div className='banner'>
                    <img src='./img/banner1.svg' />
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
                <h1 className='title'>Sobre nós</h1>
                <div className='sobrenos'>
                    {sobre.map((sobre, index) => (
                        <div key={index}>
                                <img src={sobre.img}  />
                                <p >{sobre.text}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className='sessão4'>
                <h2 className='title2'>Como funciona?</h2>
                <h1 className='title'>Entenda em poucos passos</h1>
            <h3 className='title3'>Em apenas algumas etapas fáceis, você está pronto para gerenciar suas viagens com nosso transporte escolar. Tudo me um só lugar.</h3>
            </section>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </>
    );
}
*/}

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
        {/* banner */}
            <section>
                {/* textos */}
                <div>
                    <h1>{title}</h1>
                </div>

                {/* imagens do banner */}
                <div>
                    <image></image>
                </div>
            </section>
        </>
    )
}