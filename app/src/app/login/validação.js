const form = document.querySelector('#loginForm');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');
const confirmPasswordInput = document.querySelector('#confirm-password');

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
