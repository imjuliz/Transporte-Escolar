"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import '../../styles/login.css'
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from "react";

export default function Login() {
    const usuarios = [
        {nome: 'Administrador'},
        {nome: 'Aluno'},
        {nome: 'Motorista'},
        {nome: 'Responsável'}
    ]

    return (
        <>
        <section className='login'>
            <div className='imgLogin'>
                <img src=""/>
                </div>

            <div className='login-btn'>
                <h3 className="">Você é:</h3>
                <div className="grid grid-flow-col grid-rows-4 login-btn-cont">
                {usuarios.map((usuario, index) => (
                            <div key={index} className='container-login'>
                                <p className='user'>{usuario.nome}</p>
                                <button><img src='./img/btn-user.svg'/></button>
                            </div>
                        ))}
                </div>
            </div>
        </section>
        </>
    )
    }