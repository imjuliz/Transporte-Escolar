import { read } from "../config/database.js";

async function buscarUsuarioPorEmailOuCPF(identificador) {
    // verifica se é CPF
    const tipoBusca = /^\d{11}$/.test(identificador) ? "cpf" : "email";
    // limpa formatação do CPF 
    const identificadorLimpo = identificador.replace(/\D/g, "");
    const usuario = await read("usuarios", `${tipoBusca} = '${identificadorLimpo}'`);
    if (!usuario) {
        return null; // Retorno explícito para evitar erros
    }
    return usuario; // Retorna o usuário corretamente
}

export { buscarUsuarioPorEmailOuCPF };