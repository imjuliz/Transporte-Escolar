"use client";
import { Kings } from 'next/font/google';
import '../editar/editar.css'
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';



export default function EditarPerfil() {
    console.log("Componente EditarPerfil carregado");
    const cpfInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
  
    useEffect(() => {
      const cpfInput = cpfInputRef.current;
      const handleInput = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        e.target.value = value;
      };
      cpfInput.addEventListener('input', handleInput);
      return () => {
        cpfInput.removeEventListener('input', handleInput);
      };
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log("Enviando dados...");
      
        const data = {
          cpf: cpfInputRef.current?.value,
          email: emailInputRef.current?.value,
          senha: passwordInputRef.current?.value,
        };
      
        console.log("Dados enviados:", data);
      
        try {
          const response = await fetch('http://localhost:3001/editarPerfil', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data),
          });
      
          console.log("Resposta: ", response);
      
          if (response.ok) {
            console.log('Perfil atualizado com sucesso!');
          } else {
            const errText = await response.text();
            console.error('Erro ao atualizar perfil', errText);
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      };
    return (
        <>  
<section className='form'>
        
<form onSubmit={handleSubmit}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
            <input type="text" id="company" ref={cpfInputRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="000.000.000-00"  required />
        </div>  
    </div>
    <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
        <input type="email" id="email" ref={emailInputRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
        <input type="password" id="password" ref={passwordInputRef}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
    </div> 
    
    <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
</form>

        </section>
        </>
    )
}