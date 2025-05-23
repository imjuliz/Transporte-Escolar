"use client";
import { Kings } from 'next/font/google';
import Image from 'next/image'
import '../styles/informacoes.css'

export default function viagens() {

    //dos alunos, receber os dados que foram criados pelo administrador

    const alunos = [
        
        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina2.jpg'
        },
        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menina3.png'
        },
        {
            nome: 'Sofia',
            escola: 'ETEC Dona Carmin',
            img: '/img/menino.jpg'
        }
    ]
    return (
        <>

            <section className='infos'>

                <div className='page-indicador'>
                    <h1>Informações</h1>
                    <hr />
                </div>

                {alunos.map((aluno, index) => (

                    <div className=" container-aluno card mb-3 " key={index}>
                        <div className="row g-0">
                            <div className="foto-aluno col-md-4">
                                <img src={aluno.img} className="img-fluid rounded-start" alt="..."></img>
                            </div>
                            <div className=" conteudo-aluno col-md-8">
                                <div className="card-body">
                                    <h3 className="card-title">{aluno.nome}</h3>
                                    <p className="card-text">{aluno.escola}</p>
                                </div>

                                <a><button>Ver Informações</button></a>

                            </div>


                        </div>
                    </div>

                ))}


            </section>

        </>
    )
}