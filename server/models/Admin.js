// import { create } from "../config/database.js";

// //funcao que vai registrar os usuarios

// const registrarUsuario = async (usuarioData) =>{
//     try{
//         return await create('usuarios', usuarioData);
//     }
//     catch(err){
//         console.error('Erro ao registrar usuário: ', err);
//         throw err;
//     }
// }

// //funcao que vai registrar veiculos

// const registrarVeiculos = async (veiculoData) =>{
//     try{
//         return await create ('veiculos', veiculoData);

//     } catch (error){
//         console.error('Erro ao criar livro: ', error);
//         throw error;
//     }
// }

// export { registrarUsuario, registrarVeiculos};

import { create, readAll, read, readQuery, deleteRecord } from '../config/database.js';
// registrar novos usuarios, veiculos, escolas e pontos de
export const criarRegistro = async (tabela, dados) => {
  return create(tabela, dados);
};

// busca o nome da escola
export const buscarEscolasPorNome = async (nome) => {
  const where = `nome LIKE "%${nome}%" LIMIT 10`;
  return await readAll('escolas', where);
};

// busca o ponto de embarque relacionado a escola informada - revisar
export async function buscarPontoDeEmbarquePorEscola(escolaId) {
  return await readQuery(
    `
    SELECT pe.*
    FROM pontos_embarque pe
    JOIN escola_ponto_embarque epe ON pe.id = epe.ponto_embarque_id
    WHERE epe.escola_id = ?
    `,
    [escolaId]
  );
}

// deleta o perfil do USUARIO
const deletarPerfil = async (tabela, cpf)=>{
const usuario = await read(tabela, `cpf = '${cpf}'`);
    if (!usuario) return null;

    const resultado = await deleteRecord(tabela, `cpf = '${cpf}'`);
    return resultado;
}

export {deletarPerfil}