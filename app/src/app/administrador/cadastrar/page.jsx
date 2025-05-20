// criar a pagina aqui - lorena

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
//cpf, email, senha, tipo

"use client";
import { Kings } from 'next/font/google'
import '../../styles/globals.css'
import '../../styles/login.css';
<<<<<<< Updated upstream
import '../../components/Footer/Footer.jsx';
=======
>>>>>>> Stashed changes
import { useState } from "react";

export default function RegistrarUsuario() {

    document.getElementById('registrarForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = document.getElementById('registrarForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3000/administradores/cadastrar', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidGlwbyI6ImNvbXVtIiwiaWF0IjoxNzQ3MTYwOTQxLCJleHAiOjE3NDcxNjQ1NDF9.8JJKrhTr1iYV0Q29djaMh6VYUrLin7r4TwEUaelxfPY' // Substitua pelo seu token JWT
                },
                body: formData
            });

            const data = await response.json();
            document.getElementById('responseContent').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('Erro:', error);
            document.getElementById('responseContent').textContent = 'Erro ao enviar os dados.';
        }
    })


    return (
        <>
            <h1>registrar usuario</h1>
            <form id="registrarForm">
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required></input>

                <label for="descricao">Email:</label>
                <input type="text" id="email" name="email" required></input>

                <label for="isbn">Senha:</label>
                <input type="text" id="senha" name="senha" required></input>

                <label for="tipo">Tipo de Usuário</label> {/**Só por enquanto, depois vou adicionar o tipo específico em cada rota ex: admin/registrar/motorista */}
                <input type="text" id="tipo" name="tipo" required></input>

                <button type="submit">Registrar Usuário</button>
            </form>

            <div id="response">
                Resposta do Servidor:
                <pre id="responseContent"></pre>
            </div>

            


        </>
    )
}