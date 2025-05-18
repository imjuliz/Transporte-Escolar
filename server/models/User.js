import { read } from '../config/database.js';

// função para buscar na tabela "usuarios", um usuario pelo seu email
export async function buscarUsuarioPorEmail(email) {
    return await read('usuarios', `email = '${email}'`);
}

export { buscarUsuarioPorEmail };