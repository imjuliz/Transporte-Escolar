"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import './trabalhe.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from "react";

export default function TrabalheConosco() {
    const pathname = usePathname();

    const links = [
        { href: '/', page: 'Página Inicial' },
        { href: '/TrabalhoConosco', page: 'Trabalhe Conosco' }
    ];

    const trabalheItens = [
        {
            title: 'Estrutura e Suporte',
            text: 'Oferecemos frota moderna, manutenção preventiva garantida e suporte diário da equipe administrativa para rotas, pais e comunicação, garantindo segurança e tranquilidade no trabalho.',
            img: '',
            classe: 'row-left'
        },
        {
            title: 'Jornada Organizada',
            text: 'No transporte escolar, os horários são fixos e previsíveis. Isso significa menos estresse, mais tempo para a família e uma melhor qualidade de vida. Valorizamos o equilíbrio entre trabalho e vida pessoal, oferecendo uma jornada clara, sem surpresas ou longas horas extras.',
            img: '',
            classe: 'row-right'
        },
        {
            title: 'Salário Competitivo',
            text: 'Reconhecemos o valor do trabalho dos nossos motoristas e oferecemos uma remuneração compatível com o mercado, justa e sempre em dia.',
            img: '',
            classe: 'row-left'
        }
    ];

    const requisitos = [
        {
            img: './img/reqCNH.svg',
            req: 'CNH categoria D ou superior'
        },
        {
            img: './img/reqCurso.svg',
            req: 'Curso de Transporte Escolar completo'
        },
        {
            img: './img/reqExperiencia.svg',
            req: 'Experiência como motorista'
        },
        {
            img: './img/reqIdade.svg',
            req: 'Idade acima de 25 anos'
        },
        {
            img: './img/reqSeg.svg',
            req: 'Compromisso com segurança e pontualidade'
        }
    ];

    const contatos = [
        {
            img: '',
            nome: 'Telefone',
            cntt: '',
            link: ''
        },
        {
            img: '',
            nome: 'Email',
            cntt: 'info@company.com',
            link: '',
        },
        {
            img: '',
            nome: 'WhatsApp',
            cntt: '',
            link: ''
        }
    ]

    const banners = [
        {
            img1: './img/banner1/montanha.svg',
            img2: './img/banner1/onibus.svg',
            img3: './img/arvores.svg',
            img4: './img/banner1/circulo.svg'
        }
    ];
    return (
        <>
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
                    <div className='banner-textos flex flex-column items-center gap-10'>
                        <h1>Trabalhe conosco</h1>
                        <p>Faça parte da nossa equite de motoristas</p>
                    </div>
                    <div className='banner-imgs'>
                        {banners.map(( banner, index ) => (
                            <div className='banner1img flex justify-center' key={index}>
                                <img src={banner.img1} className='montanha z-10 absolute bottom-0 w-100' />
                                <img src={banner.img2} className='onibus z-10 absolute bottom-0' />
                                <img src={banner.img3} className='arvores z-10 absolute bottom-0 right-60' />
                                <img src={banner.img5} className='circulo' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* trabalhe com a (?)*/}
            <section className='sec1'>
                <div className="grid grid-flow-col grid-rows-3 gap-4">
                    {trabalheItens.map((trabalheItem, index) => (
                        <div key={index} className={trabalheItem.classe}>
                            <img src='' />
                            <div className='trabalhe-text'>
                                <h2>{trabalheItem.title}</h2>
                                <p>{trabalheItem.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* o que buscamos? */}
            <section className='reqs'>
                <div className='sec2'>
                    <div className='req-text'>
                        <h2>O que buscamos?</h2>
                        <p>Na [Nome da Empresa], prezamos pela segurança, pontualidade e cuidado com nossos alunos. Buscamos motoristas comprometidos, experientes e capacitados para fazer parte da nossa equipe.</p>
                    </div>
                    <div className="grid grid-flow-col grid-rows-5 gap-5">
                        {requisitos.map((req, index) => (
                            <div key={index} className='req-cont'>
                                <img src={req.img} />
                                <p>{req.req}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* candidatar-se */}
            <section className='sec1 candidate'>
                <div className='candidate-text'>
                    <h4>Contato</h4>
                    <h2>Candidate-se</h2>
                    <p>Preencha o formulário abaixo ou entre em contato conosco pelos canais disponíveis. Nossa equipe entrará em contato para seguir com o processo de seleção.</p>
                </div>
                <form className=' grid grid-flow-row-dense grid-rows-2 gap-3'>
                    {/* <label for="nome">Nome Completo:</label> */}
                    <input type="text" id="nome" placeholder="Nome Completo" className=' input border ' />
                    <input type="tel" id="phone" placeholder="Telefone para contato" pattern="\(\d{2}\)\s\d{5}-\d{4}" className='input border ' />
                    <input type="text" id="email" placeholder="Email" className='input border '/>
                    <label for="myfile">Envie seu currículo:</label>
                    <input type="file" id="myfile" name="myfile" className='enviarArquivo border'></input>
                    <button className='btn-form w-40 h-10'>Enviar</button>
                </form>
                <div className='contatos'>
                </div>
            </section>
        </>
    );
}
