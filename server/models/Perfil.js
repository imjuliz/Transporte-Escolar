import { read, update } from '../config/database.js';

// buscar dados do perfil
const tabelas = {
  aluno: 'alunos',
  responsavel: 'responsaveis',
  motorista: 'motoristas',
  adm: 'adm',
};

const obterDadosDoUsuario = async (tipo, id) => {
  try{
    const tabela = tabelas[tipo];
  if (!tabela) return null;

  const where = `id = ${id}`;
  const usuario = await read(tabela, where);

  return usuario;
  }catch(err){
    console.error('Erro ao atualizar informações do perfil!!!', err);
    throw err;
  }

};

// busca escola por id
// export const buscarEscolasPorNome = async (id) => {
//   const where = `escola_id = ${id} LIMIT 1`;
//   return await readAll('alunos', where);
// };

// editar perfil
const editarPerfilMotorista = async (email, data) => {
  try {
    const where = `email = '${email}'`;
    return await update('motoristas', data, where);
  } catch (err) {
    console.error('Erro ao atualizar informações do perfil!!!', err);
    throw err;
  }
}

export { obterDadosDoUsuario, editarPerfilMotorista };