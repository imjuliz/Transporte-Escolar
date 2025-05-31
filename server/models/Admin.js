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

import { create, readAll } from '../config/database.js';

export const criarRegistro = async (tabela, dados) => {
  return create(tabela, dados);
};

export const buscarEscolasPorNome = async (nome) => {
  const where = `nome LIKE "%${nome}%" LIMIT 10`;
  return await readAll('escolas', where);
};