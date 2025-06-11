"use client";
import './trabalhe.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";
import '../../../styles/Footer.css'

export default function TrabalheConosco() {
    // titulo da guia
    useEffect(() => {
        document.title = 'EduTrip - Trabalhe Conosco';
    }, []);

    // formatação de cpf
    const cpfRef = useRef(null); // referência para o input de CPF para que seja possivel fazer a validação/formatação depois da renderização
    useEffect(() => {
        if (cpfRef.current) {
            cpfRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
                value = value.slice(0, 11); // limite de 11 digitos
                value = value.replace(/^(\d{3})(\d)/, "$1.$2"); // adiciona o primeiro ponto
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3"); // adiciona o segundo ponto
                value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"); // adiciona o traço
                e.target.value = value;
            });
        }
    });

    // ao digitar nomes, ele nao permite caracteres numericos
    const textRef = useRef(null);
    useEffect(() => {
        if (textRef.current) {
            textRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/[0-9]/g, '') // remove caracteres numericos
                e.target.value = value;
            })
        }
    })

    // mascara de telefone
    const tellRef = useRef(null);
    useEffect(() => {
        if (tellRef.current) {
            tellRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
                value = value.slice(0, 11); // limite de 11 digitos
                value = value.replace(/^(\d\d)(\d)/g, "($1)$2"); // regex no padrão de telefone brasileiro
                value = value.replace(/(\d{5})(\d)/, "$1-$2");
                e.target.value = value;
            });
        }
    });

    // mascara de data
    const dataRef = useRef(null);
    useEffect(() => {
        if (dataRef.current) {
            dataRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
                value = value.slice(0, 8); // limite de 8 digitos
                value = value.replace(/(\d{2})(\d)/, "$1/$2");
                e.target.value = value;
            });
        }
    });

    // cnh
    const cnhRef = useRef(null);
    useEffect(() => {
        if (cnhRef.current) {
            cnhRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
                value = value.slice(0, 9); // limite de 9 digitos
                e.target.value = value;
            });
        }
    });

    // cep
    const cepRef = useRef(null);
    useEffect(() => {
        if (cepRef.current) {
            cepRef.current.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ""); // remove caracteres nao numericos
                value = value.slice(0, 8); // limite de 8 digitos
                value = value.replace(/^\d{5}(-\d{3})?$/)
                e.target.value = value;
            })
        }
    })

    // nav bar
    const links = [
        { href: '/', page: 'Página Inicial' },
        { href: '/trabalheConosco', page: 'Trabalhe Conosco' },
        { href: '/login', page: 'Entrar' }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const highlightRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const indexToUse = hoveredIndex !== null ? hoveredIndex : activeIndex;
        moveHighlight(indexToUse);

        const handleResize = () => moveHighlight(indexToUse);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex, hoveredIndex]);

    const moveHighlight = (index) => {
        const el = itemRefs.current[index];
        if (el && highlightRef.current) {
            highlightRef.current.style.width = el.offsetWidth + 'px';
            highlightRef.current.style.left = el.offsetLeft + 'px';
        }
    };

    const trabalheItens = [
        {
            title: 'Estrutura e Suporte',
            text: 'Oferecemos frota moderna, manutenção preventiva garantida e suporte diário da equipe administrativa para rotas, pais e comunicação, garantindo segurança e tranquilidade no trabalho.',
            img: './img/gestao-transporte.svg',
            classNamee: 'row-left'
        },
        {
            title: 'Jornada Organizada',
            text: 'No transporte escolar, os horários são fixos e previsíveis. Isso significa menos estresse, mais tempo para a família e uma melhor qualidade de vida. Valorizamos o equilíbrio entre trabalho e vida pessoal, oferecendo uma jornada clara, sem surpresas ou longas horas extras.',
            img: './img/jornada-org.svg',
            classNamee: 'row-right'
        },
        {
            title: 'Salário Competitivo',
            text: 'Reconhecemos o valor do trabalho dos nossos motoristas e oferecemos uma remuneração compatível com o mercado, justa e sempre em dia.',
            img: './img/salario.svg',
            classNamee: 'row-left'
        }
    ];

    const requisitos = [
        {
            img: './img/cnh.svg',
            req: 'CNH categoria D ou superior'
        },
        {
            img: './img/curso.svg',
            req: 'Curso de Transporte Escolar completo'
        },
        {
            img: './img/experiencia.svg',
            req: 'Experiência como motorista'
        },
        {
            img: './img/previsibilidade.svg',
            req: 'Idade acima de 25 anos'
        },
        {
            img: './img/compromisso.svg',
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

    // FOOTER

    // outras paginas do site
    const conteudos = [
        {
            name: "Página inicial",
            link: "/",
        },
        {
            name: "Trabalhe Conosco",
            link: "/trabalheConosco"
        },
        {
            name: "Termos de uso e privacidade",
            link: "../"
        }
    ]

    // contatos
    const ctts = [
        {
            end: "suporte@edutrip.com.br",
            link: "mailto:suporte@edutrip.com.br"
        },
        {
            end: "(11) 23456-7890",
            link: "tellto:1123456-7890"
        }
    ]
    // redes sociais
    const msociais = [
        {
            img: (
                <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.37936 3.865V6.613H0.365356V9.973H2.37936V19.959H6.51336V9.974H9.28836C9.28836 9.974 9.54836 8.363 9.67436 6.601H6.53036V4.303C6.53036 3.96 6.98036 3.498 7.42636 3.498H9.68036V0H6.61636C2.27636 0 2.37936 3.363 2.37936 3.865Z" fill="white" />
                </svg>
            ),
            link: "https://pt-br.facebook.com/",
        },
        {
            img: (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3505 2H8.2805C6.70365 2.00185 5.19193 2.62914 4.07703 3.74424C2.96212 4.85933 2.33508 6.37115 2.3335 7.948L2.3335 16.018C2.33535 17.5948 2.96264 19.1066 4.07773 20.2215C5.19283 21.3364 6.70465 21.9634 8.2815 21.965H16.3515C17.9283 21.9631 19.4401 21.3359 20.555 20.2208C21.6699 19.1057 22.2969 17.5938 22.2985 16.017V7.947C22.2966 6.37015 21.6694 4.85844 20.5543 3.74353C19.4392 2.62862 17.9273 2.00159 16.3505 2V2ZM20.2905 16.017C20.2905 16.5344 20.1886 17.0468 19.9906 17.5248C19.7926 18.0028 19.5024 18.4371 19.1365 18.803C18.7706 19.1689 18.3363 19.4591 17.8583 19.6571C17.3802 19.8551 16.8679 19.957 16.3505 19.957H8.2805C7.23572 19.9567 6.23382 19.5415 5.49514 18.8026C4.75646 18.0638 4.3415 17.0618 4.3415 16.017V7.947C4.34176 6.90222 4.75698 5.90032 5.49585 5.16165C6.23471 4.42297 7.23672 4.008 8.2815 4.008H16.3515C17.3963 4.00827 18.3982 4.42349 19.1369 5.16235C19.8755 5.90122 20.2905 6.90322 20.2905 7.948V16.018V16.017Z" fill="white" />
                    <path d="M12.3156 6.81897C10.947 6.82109 9.6351 7.36576 8.66746 8.33358C7.69983 9.3014 7.15542 10.6134 7.15356 11.982C7.15515 13.3509 7.69959 14.6633 8.66746 15.6314C9.63534 16.5994 10.9476 17.1441 12.3166 17.146C13.6857 17.1444 14.9982 16.5998 15.9663 15.6317C16.9344 14.6636 17.479 13.3511 17.4806 11.982C17.4784 10.6131 16.9335 9.30085 15.9653 8.33316C14.997 7.36547 13.6845 6.82129 12.3156 6.81997V6.81897ZM12.3156 15.138C11.4788 15.138 10.6763 14.8056 10.0846 14.2139C9.49297 13.6222 9.16056 12.8197 9.16056 11.983C9.16056 11.1462 9.49297 10.3437 10.0846 9.75205C10.6763 9.16037 11.4788 8.82797 12.3156 8.82797C13.1523 8.82797 13.9548 9.16037 14.5465 9.75205C15.1382 10.3437 15.4706 11.1462 15.4706 11.983C15.4706 12.8197 15.1382 13.6222 14.5465 14.2139C13.9548 14.8056 13.1523 15.138 12.3156 15.138Z" fill="white" />
                    <path d="M17.4894 8.09497C18.1726 8.09497 18.7264 7.54115 18.7264 6.85797C18.7264 6.1748 18.1726 5.62097 17.4894 5.62097C16.8063 5.62097 16.2524 6.1748 16.2524 6.85797C16.2524 7.54115 16.8063 8.09497 17.4894 8.09497Z" fill="white" />
                </svg>

            ), link: "https://www.instagram.com/",
        },
        {
            img: (
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2925 11.719V19.098H16.0145V12.213C16.0145 10.483 15.3955 9.303 13.8475 9.303C12.6655 9.303 11.9615 10.099 11.6525 10.868C11.5395 11.143 11.5105 11.526 11.5105 11.911V19.098H7.2305C7.2305 19.098 7.2885 7.438 7.2305 6.229H11.5105V8.053L11.4825 8.095H11.5105V8.053C12.0785 7.178 13.0935 5.927 15.3665 5.927C18.1815 5.927 20.2925 7.767 20.2925 11.719ZM2.7545 0.026001C1.2915 0.026001 0.333496 0.986001 0.333496 2.249C0.333496 3.484 1.2635 4.473 2.6985 4.473H2.7265C4.2195 4.473 5.1465 3.484 5.1465 2.249C5.1205 0.986001 4.2205 0.026001 2.7555 0.026001H2.7545ZM0.587496 19.098H4.8655V6.229H0.587496V19.098Z" fill="white" />
                </svg>

            ), link: "https://www.linkedin.com/",
        }
    ]
    return (
        <>
            {/* navbar */}
            <header>
                <ul className="linksrapidos">
                    <li className="logo">EduTrip</li>
                    <div className="highlight" ref={highlightRef}></div>
                    {links.map((link, index) => (
                        <li key={index} className="link-item" ref={(el) => (itemRefs.current[index] = el)} onClick={() => setActiveIndex(index)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                            <a href={link.href} style={{ color: hoveredIndex === index ? '#161A23' : activeIndex === index && hoveredIndex !== null ? '#fff' : activeIndex === index ? '#161A23' : '#fff' }} >
                                <span>{link.page}</span>
                            </a>
                        </li>
                    ))}
                    {/* <a href="/login">
                        <button className="login text-[#fff] bg-[#2D2F39]">Entrar</button>
                    </a> */}
                </ul>
            </header>

            {/* banner */}
            <section className='banner'>
                <div className='banner-container'>
                    <div className='banner-textos flex flex-column items-center gap-10'>
                        <h1>Trabalhe conosco</h1>
                        <p>Junte-se à EduTrip e ajude a construir um transporte escolar mais seguro e eficiente.</p>
                    </div>
                    <div className='banner-imgs'>
                        {banners.map((banner, index) => (
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
                <div className="trabalhe grid grid-flow-col grid-rows-3 gap-4">
                    {trabalheItens.map((trabalheItem, index) => (
                        <div key={index} className={trabalheItem.classNamee}>
                            <img src={trabalheItem.img} className='img-trabalhe'/>
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
                <div className='sec2 flex flex-col justify-center items-center'>
                    <div className='req-text'>
                        <h2>O que buscamos?</h2>
                        <p>Na EduTrip, prezamos pela segurança, pontualidade e cuidado com nossos alunos. Buscamos motoristas comprometidos, experientes e capacitados para fazer parte da nossa equipe.</p>
                    </div>
                    <div className='cont-busca flex justify-between'>
                    <div className="requisitos grid grid-flow-col grid-rows-5">
                        {requisitos.map((req, index) => (
                            <div key={index} className='req-cont'>
                                <img src={req.img} />
                                <p>{req.req}</p>
                            </div>
                        ))}
                    </div>
                    <img src='./img/jornada.svg' />
                    </div>
                    
                </div>
            </section>

            {/* candidatar-se */}
            <section className='sec1 candidate flex flex-col items-center justify-center'>
                <div className='candidate-text flex flex-col justify-center items-center'>
                    <h4>Contato</h4>
                    <h2>Candidate-se</h2>
                    <p>Preencha o formulário abaixo ou entre em contato conosco pelos canais disponíveis. Nossa equipe entrará em contato para seguir com o processo de seleção.</p>
                </div>
                <form className='flex flex-col gap-10'>
                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={textRef} />
                        <label htmlFor="floating_standard" className="py-8 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nome Completo</label>
                    </div>
                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Endereço</label>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className="relative z-0">
                            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer campo-w" placeholder=" " />
                            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto campo-w">Cidade</label>
                        </div>
                        <div className="relative z-0">
                            <input type="text" id="floating_standard cep" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer campo-w" placeholder=" " ref={cepRef} maxLength="9" required />
                            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto campo-w">CEP</label>
                        </div>
                    </div>

                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " ref={tellRef} />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Telefone para Contato</label>
                    </div>
                    <div className="relative z-0">
                        <input type="email" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para carregar</span> ou arrastar e soltar</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>

                    <button className='btn-form'>Enviar</button>

                </form>

                {/* colocar formas de contato */}
                <div className='contatos'>
                </div>


            </section>
            {/* footer */}
            <footer className=''>
                <div className="container">
                    <div className='cont-footer '>
                        <div className='cont-logo flex flex-row gap-6'>
                            <img src="/img/logo.png" alt="Logo do site" className='logo-img' />
                            <h1 className='logo'>EduTrip</h1>
                        </div>

                        <div className="cont-1 flex-wrap flex flex-row md:flex-col md:gap-4 justify-between">
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
                            <div className="f-col container-redes col-redes">
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
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
