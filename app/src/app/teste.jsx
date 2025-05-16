"use client";
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