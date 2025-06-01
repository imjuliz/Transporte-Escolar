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
// registrar novos usuarios
export const criarAluno = async (dados) => {
  try {
    return await create('alunos', dados);
  } catch (err) {
    console.error('Erro ao cadastrar aluno', err);
    throw err;
  }
};

export const criarResponsavel = async (dados) => {
  try {
    return await create('responsaveis', dados);
  } catch (err) {
    console.error('Erro ao cadastrar responsavel', err);
    throw err;
  }
};

export const criarMotorista = async (dados) => {
  try {
    return await create('motoristas', dados);
  } catch (err) {
    console.error('Erro ao cadastrar motorista', err);
    throw err;
  }
};

export const criarAdministrador = async (dados) => {
  try {
    return await create('adm', dados);
  } catch (err) {
    console.error('Erro ao cadastrar administrador', err);
    throw err;
  }
};

// verifica se o responsavel ja existe
export async function verificarResponsavelExistente({ cpf, email, telefone }) {
  const where = `cpf = ? OR email = ? OR telefone = ?`;
  const values = [cpf, email, telefone];
  const responsaveis = await readAll('responsaveis', where, values);
  return responsaveis;
}

// associa responsavel ao aluno
export const associarResponsavelAluno = async (responsavelId, alunoId, grau) => {
  return await create('responsaveis_alunos', {
    responsavel_id: responsavelId,
    aluno_id: alunoId,
    grau_parentesco: grau
  });
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
export const deletarPerfil = async (tabela, cpf) => {
  const usuario = await read(tabela, `cpf = '${cpf}'`);
  if (!usuario) return null;

  const resultado = await deleteRecord(tabela, `cpf = '${cpf}'`);
  return resultado;
}
