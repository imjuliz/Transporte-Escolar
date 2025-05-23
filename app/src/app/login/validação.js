"use client"

const form = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');
const confirmPasswordInput = document.querySelector('#confirm-password');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (event) => {
    // Previne o envio do formulário
        event.preventDefault();

    // Valida o endereço de email
    if (!emailInput.checkValidity()) {
        alert('Por favor, insira um endereço de email válido.');
        return;
    }

    // // Valida a senha
    // if (passwordInput.value.length < 8) {
    //     alert('A senha deve ter pelo menos 8 caracteres.');
    //     return;
    // }

    // // Valida a confirmação da senha
    // if (passwordInput.value !== confirmPasswordInput.value) {
    //     alert('As senhas não correspondem.');
    //     return;
    // }

    // Se todos os campos estiverem válidos, envia o formulário
    form.submit();
});
}
});

function redirecionar(){

const redirect = window.location.href('/motorista/embarqueDesembarque')
if(redirect){
    alert('Você foi redirecionado!!!')
}
else if(!redirect){
    alert("Não foi possivel redirecionar!!!")
}
}
       
export {redirecionar}