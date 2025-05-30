import { read } from '../config/database.js';

const tabelas = {
  aluno: 'alunos',
  responsavel: 'responsaveis',
  motorista: 'motoristas',
  adm: 'adm',
};

const obterDadosDoUsuario = async (tipo, id) => {
  const tabela = tabelas[tipo];
  if (!tabela) return null;

  const where = `id = ${id}`;
  const usuario = await read(tabela, where);

  return usuario; // read já retorna 1 registro ou null
};

export default { obterDadosDoUsuario };
