import { read } from "../config/database.js";

// // busca o email requisitado no banco de dados, baseado no tipo de usuario
// const buscarPorEmail = async (email, tipo) => {
//     try{
//         const condicao = `email = '${email.replace(/'/g, "''")}' and tipo = '${tipo}'`; // escapa aspas simples
//         return await read('usuarios', condicao);
//     } catch(err){
//         console.error('Erro ao fazer login: ', err)
//         throw err;
//     };
// }

// //busca o email, senha E tipo requisitados no banco de dados
// const buscarUsuario = async (email, senha, tipo) => {
//     try{
//         const condicao = `email = '${email.replace(/'/g, "''")}' and senha = '${senha}' and tipo = '${tipo}'`; // escapa aspas simples
//         return await read('usuarios', condicao);
//     } catch(err){
//         console.error('Erro ao fazer login: ', err)
//         throw err;
//     };
// }

// export { buscarPorEmail, buscarUsuario }

const tabelas = {
  aluno: 'alunos',
  motorista: 'motoristas',
  responsavel: 'responsaveis',
  administrador: 'adm'
};

export async function buscarUsuarioPorEmail(tipo, email) {
  const tabela = tabelas[tipo.toLowerCase()];
  if (!tabela) throw new Error('Tipo de usuário inválido');

  const usuario = await read(tabela, `email = '${email}'`);
  return usuario;
}
