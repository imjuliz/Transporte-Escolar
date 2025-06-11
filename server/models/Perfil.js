import { read, update } from '../config/database.js';

// buscar dados do perfil
const tabelas = {
  aluno: 'alunos',
  responsavel: 'responsaveis',
  motorista: 'motoristas',
  administrador: 'adm',
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
//editar perfil do motorista
const editarPerfilMotorista = async (tipo, id, dadosAtualizados) => {
  try {
    const tabela = tabelas[tipo];
    if (!tabela) throw new Error('Tipo de usuário inválido');

    const where = `id = ${id}`;
    return await update(tabela, dadosAtualizados, where);
  } catch (err) {
    console.error('Erro ao atualizar informações do perfil!!!', err);
    throw err;
  }
};

// editar perfil - responsaveis, alunos e adms
const editarPerfil = async (tipo, id, dadosAtualizados) => {
  try {
    const tabelas = {
      aluno: 'alunos',
      responsavel: 'responsaveis',
      motorista: 'motoristas',
      administrador: 'adm',
    };

    const tabela = tabelas[tipo];
    if (!tabela) throw new Error('Tipo de usuário inválido');

    const where = `id = ${id}`;
    return await update(tabela, dadosAtualizados, where);
  } catch (err) {
    console.error('Erro ao atualizar informações do perfil!!!', err);
    throw err;
  }
};

export { obterDadosDoUsuario, editarPerfil, editarPerfilMotorista };