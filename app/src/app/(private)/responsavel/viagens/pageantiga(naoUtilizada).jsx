"use client";
import Image from 'next/image'
import './viagens2.css'

export default function viagens() {
    //logica para chamar os valores dos alunos e das viagens

    //dos alunos, receber os dados que foram criados pelo administrador

    //logica para mostrar os valores dos alunos quando muda a barra de navegação (usar codigo do petshop de produtos)
    const viagens = [
        {
            data: 'Hoje',
            tipo: 'Embarque de Saída',
            horaEmbarque: '12:00',
            horaDesembarque: '12:45'
        },
        {
            data: 'Hoje',
            tipo: 'Embarque de Entrada',
            horaEmbarque: '6:40',
            horaDesembarque: '7:01'
        }
    ];

    const viagensPassadas = [
        {
            data: '26/04',
            tipo: 'Embarque de Saída',
            horaEmbarque: '12:00',
            horaDesembarque: '12:45'
        },
        {
            data: '26/04',
            tipo: 'Embarque de Entrada',
            horaEmbarque: '6:30',
            horaDesembarque: '7:00'
        }
    ];

    const alunos = [
        {
            nome: "Ana Clara",
            foto: "/img/menina.png"
        }
    ]

    return (
        <>
            <section className='navegacao'>

                <div className='page-indicador'>
                    <h1>Viagens</h1>
                    <hr />
                </div>




                <div className="alunos flex ">

                    <div className="aluno-active flex gap-4 items-center">
                        {/*A logica para chamar os valores dos alunos e sua foto de perfil */}
                        <img className='fotodeperfil' src='/img/menina.png'></img>
                        <p className='nomealuno font-bold'>Ana Clara</p>
                    </div>
                    <div className="aluno flex gap-4 items-center">
                        <img className='fotodeperfil' src='/img/menina.png'></img>
                        <p className='nomealuno font-bold '>Ana Clara</p>
                    </div>

                </div>

                <div className='chrome'>
                    <div className='flex flex-column gap-[7vh]'>
                        {/**Viajens de Hoje */}
                        <div className='today days'>
                            <h2>Hoje</h2>
                            {viagens.map((viagem, index) => (
                                <div className='container-viagem flex flex-column items-start gap-3 bg-[#fff] rounded-[2vw]' key={index}>
                                    <div className='flex flex-row items-center'>
                                        <svg className='circle-t' width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill="#00B383" />
                                        </svg>
                                        <p className='mb-0 text-[#8F9BB3]'>{viagem.data}</p>
                                        <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3" />
                                        </svg>

                                        <p className='m-0 text-[#8F9BB3]'>{viagem.horaEmbarque} - {viagem.horaDesembarque}</p>
                                    </div>
                                    <div className='titulo-status flex items-center justify-between'>

                                        <h3>{viagem.tipo}</h3>
                                        <div className='status'>
                                            Em andamento
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>

                        {/**viagens do mÊs */}
                        <div className='mounth days'>
                            <h2>Esse mês</h2>
                            {viagensPassadas.map((viagemPassada, index) => (
                                <div className='container-viagem flex flex-column items-start gap-3 bg-[#fff] rounded-[2vw]' key={index}>
                                    <div className='flex flex-row items-center'>
                                        <svg className='circle-t' width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.89642 3.1647C3.75416 3.1647 2.82486 4.09401 2.82486 5.23626C2.82486 6.37852 3.75417 7.30782 4.89642 7.30782C6.03868 7.30782 6.96798 6.37851 6.96798 5.23626C6.96798 4.094 6.03867 3.1647 4.89642 3.1647ZM4.89642 0.339844C7.60064 0.339844 9.79284 2.53205 9.79284 5.23626C9.79284 7.94048 7.60063 10.1327 4.89642 10.1327C2.19221 10.1327 0 7.94047 0 5.23626C0 2.53205 2.19221 0.339844 4.89642 0.339844Z" fill="#00B383" />
                                        </svg>
                                        <p className='mb-0 text-[#8F9BB3]'>{viagemPassada.data}</p>
                                        <svg className='circle' width="5" height="5" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="1.5" cy="1.5" r="1.5" fill="#8F9BB3" />
                                        </svg>

                                        <p className='m-0 text-[#8F9BB3]'>{viagemPassada.horaEmbarque} - {viagemPassada.horaDesembarque}</p>
                                    </div>

                                    <div className='titulo-status flex items-center justify-between'>

                                        <h3>{viagemPassada.tipo}</h3>
                                        <div className='status'> {/**receber os valores do status - receber a viagem e o status dela */}
                                            Em andamento
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}