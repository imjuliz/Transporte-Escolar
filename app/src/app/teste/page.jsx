// criar a pagina aqui - lorena TESTE DA API DE REGISTRAR USUARIO - CONTA DOS ADMINS
<<<<<<< Updated upstream
//A API localhost:3001/registrar está funcionando, mas ainda precisa arrumar a conexão do formulário com o servidor, para enviar as informações
=======
>>>>>>> Stashed changes

//cpf, email, senha, tipo

"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
<<<<<<< Updated upstream
import '../../components/Footer/Footer.jsx';
import React, { useEffect, useState } from "react";
import '../../styles/teste.css';

export default function RegistrarUsuario() {
    {/*useEffect(()=>
   
     document.getElementById('registrarForm').addEventListener('submit', async function(event) {
=======
import '../../styles/login.css';
import '../../components/Footer/Footer.jsx';
import { useState } from "react";

export default function RegistrarUsuario() {

    document.getElementById('registrarForm').addEventListener('submit', async function (event) {
>>>>>>> Stashed changes
        event.preventDefault();

        const form = document.getElementById('registrarForm');
        const formData = new FormData(form);

        try {
<<<<<<< Updated upstream
            const response = await fetch('http://localhost:3001/registrar', {
                method: 'POST',
                //headers: {
                   // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidGlwbyI6ImNvbXVtIiwiaWF0IjoxNzQ3MTYwOTQxLCJleHAiOjE3NDcxNjQ1NDF9.8JJKrhTr1iYV0Q29djaMh6VYUrLin7r4TwEUaelxfPY' // Substitua pelo seu token JWT
               // },
=======
            const response = await fetch('http://localhost:3000/administradores/cadastrar', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidGlwbyI6ImNvbXVtIiwiaWF0IjoxNzQ3MTYwOTQxLCJleHAiOjE3NDcxNjQ1NDF9.8JJKrhTr1iYV0Q29djaMh6VYUrLin7r4TwEUaelxfPY' // Substitua pelo seu token JWT
                },
>>>>>>> Stashed changes
                body: formData
            });

            const data = await response.json();
            document.getElementById('responseContent').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('responseContent').textContent = 'Erro ao enviar os dados.';
        }
<<<<<<< Updated upstream
    });*/}

    useEffect(() => {
        const form = document.getElementById('registrarForm');

        const handleSubmit = async (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch('http://localhost:3001/registrar', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                document.getElementById('responseContent').textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error('Erro:', error);
                document.getElementById('responseContent').textContent = 'Erro ao enviar os dados.';
            }
        };

        form.addEventListener('submit', handleSubmit);

        // Cleanup
        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, []);
=======
    })
>>>>>>> Stashed changes


    return (
        <>
<<<<<<< Updated upstream
        
            <h1>registrar usuario</h1>
            <form id="registrarForm">
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required></input>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required></input>

                <label htmlFor="senha">Senha:</label>
                <input type="text" id="senha" name="senha" required></input>

                <label htmlFor="tipo">Tipo de Usuário</label> {/**Só por enquanto, depois vou adicionar o tipo específico em cada rota ex: admin/registrar/motorista */}
=======
            <h1>registrar usuario</h1>
            <form id="registrarForm">
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required></input>

                <label for="descricao">Email:</label>
                <input type="text" id="email" name="email" required></input>

                <label for="isbn">Senha:</label>
                <input type="text" id="senha" name="senha" required></input>

                <label for="tipo">Tipo de Usuário</label> {/**Só por enquanto, depois vou adicionar o tipo específico em cada rota ex: admin/registrar/motorista */}
>>>>>>> Stashed changes
                <input type="text" id="tipo" name="tipo" required></input>

                <button type="submit">Registrar Usuário</button>
            </form>

            <div id="response">
                Resposta do Servidor:
                <pre id="responseContent"></pre>
            </div>

<<<<<<< Updated upstream
=======
            


>>>>>>> Stashed changes
        </>
    )
}