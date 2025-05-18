import { read } from "../config/database.js";

async function buscarUsuarioPorEmailOuCPF(identificador) {
    const tipoBusca = /^\d{11}$/.test(identificador) ? "cpf" : "email";
    return await read("usuarios", `${tipoBusca} = '${identificador}'`);
}

export { buscarUsuarioPorEmailOuCPF };