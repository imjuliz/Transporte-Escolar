"use client";
import { Kings } from 'next/font/google'
import '../../../styles/globals.css'
import './trabalhe.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from "react";

export default function TrabalheConosco() {
    // formatação de cep
    const cepRef = useRef(null);

    useEffect(() => {
        const input = cepRef.current;
        if (!input) return;

        const handleInput = (e) => {
            const target = e.target;
            let value = target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            target.value = value;
        };

        input.addEventListener('input', handleInput);
        return () => {
            input.removeEventListener('input', handleInput);
        };
    }, []);

    //formatação de telefone
    function isValidPhone(phone) {
        // Aceita (xx) xxxxx-xxxx, xx xxxxx xxxx, xxxxxxxxxxx, etc.
        const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        return regex.test(phone);
      }

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
            classNamee: 'row-left'
        },
        {
            title: 'Jornada Organizada',
            text: 'No transporte escolar, os horários são fixos e previsíveis. Isso significa menos estresse, mais tempo para a família e uma melhor qualidade de vida. Valorizamos o equilíbrio entre trabalho e vida pessoal, oferecendo uma jornada clara, sem surpresas ou longas horas extras.',
            img: '',
            classNamee: 'row-right'
        },
        {
            title: 'Salário Competitivo',
            text: 'Reconhecemos o valor do trabalho dos nossos motoristas e oferecemos uma remuneração compatível com o mercado, justa e sempre em dia.',
            img: '',
            classNamee: 'row-left'
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
                <div className="grid grid-flow-col grid-rows-3 gap-4">
                    {trabalheItens.map((trabalheItem, index) => (
                        <div key={index} className={trabalheItem.classNamee}>
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
            <section className='sec1 candidate flex flex-col items-center justify-center'>
                <div className='candidate-text'>
                    <h4>Contato</h4>
                    <h2>Candidate-se</h2>
                    <p>Preencha o formulário abaixo ou entre em contato conosco pelos canais disponíveis. Nossa equipe entrará em contato para seguir com o processo de seleção.</p>
                </div>
                <form className='flex flex-col gap-10'>
                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="py-8 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Nome Completo</label>
                    </div>
                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Endereço</label>
                    </div>

                    <div className='flex flex-row justify-between'>
                        <div className="relative z-0">
                            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer campo-w" placeholder=" " />
                            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto campo-w">Cidade</label>
                        </div>
                        <div className="relative z-0">
                            <input type="text" id="floating_standard cep" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer campo-w" placeholder=" " maxLength="9" ref={cepRef} required />
                            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto campo-w">CEP</label>
                        </div>
                    </div>

                    <div className="relative z-0">
                        <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Telefone para Contato</label>
                    </div>
                    <div className="relative z-0">
                        <input type="email" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para carregar</span> ou arrastar e soltar</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG ou GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>

                    <button className='btn-form'>Enviar</button>

                </form>
                <div className='contatos'>
                </div>
            </section>
        </>
    );
}
