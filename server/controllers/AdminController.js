// //controllers:  cuida da lógica, decide o que fazer com os dados e responde às requisições. nesse caso, estão as funções do administrador

// import { registrarUsuario, registrarVeiculos } from "../models/Admin.js";

// const registrarUsuarioController = async (req, res)=>{
//     try{
//         const {cpf, email, senha, tipo } = req.body;

//         //armazena num arquivo json as informações que vamos enviar
//         const usuarioData ={
//             cpf : cpf,
//             email: email,
//             senha: senha,
//             tipo: tipo
//         }

//         const usuarioId = await registrarUsuario(usuarioData);
//         res.status(201).json({mensagem: 'Usuário criado com sucesso!', usuarioId});

//     } catch (err){
//         console.error('Erro ao registrar usuário: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar usuario'});
//     }
// }

// const registrarVeiculosController = async (req, res)=>{
//     try{
//         const {motorista_cpf, fabricacao, placa, modelo, marca} = req.body;

//         //armazena num arquivo json as informações que vamos enviar
//         const veiculoData = {

//             motorista_cpf: motorista_cpf,
//             fabricacao: fabricacao,
//             placa: placa,
//             modelo: modelo,
//             marca: marca

//         }

//         const veiculoId = await registrarVeiculos(veiculoData);
//         res.status(201).json({mensagem: 'veículo registrado com sucesso!', veiculoId});
//     }
//     catch(err){
//         console.error('Erro ao registrar veículo: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar veículo'});
//     }
// }

// export { registrarUsuarioController, registrarVeiculosController }

import { verificarResponsavelExistente, criarAluno, criarResponsavel, criarMotorista, criarAdministrador, buscarEscolasPorNome, buscarPontoDeEmbarquePorEscola, deletarPerfil } from '../models/Admin.js';

// cadastro dos usuarios
export async function cadastrarAlunoComResponsavel(req, res) {
  try {
    const { aluno, responsavel } = req.body;

    // Verifica se o responsavel ja existe pelo CPF, email ou telefone
    const existentes = await verificarResponsavelExistente(responsavel);

    let responsavel_id;

    if (existentes.length > 0) {
      // procura um registro que bata exatamente com todas as informações
      const r = existentes.find(r =>
        r.cpf === responsavel.cpf &&
        r.nome === responsavel.nome &&
        r.email === responsavel.email &&
        r.telefone === responsavel.telefone
      );

      // se algum registro existe porem nao bate com os outros dados, rejeita
      if (!r) {
        return res.status(400).json({ erro: 'Informações inválidas do responsável.' });
      }

      // todos os dados batem — reutiliza
      responsavel_id = r.id;

    } else {
      // se nenhum dado bate, cria novo responsável
      responsavel_id = await criarResponsavel(responsavel);
    }

    // cria aluno
    const aluno_id = await criarAluno(aluno);

    // associa aluno ao responsavel
    await associarResponsavelAluno(responsavel_id, aluno_id);

    res.status(201).json({ mensagem: 'Aluno e responsável registrados com sucesso.' });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao registrar aluno e responsável.' });
  }
}

export const cadastrarMotorista = async (req, res) => {
  try {
    await criarMotorista(req.body);
    res.status(201).json({ mensagem: 'Motorista cadastrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const cadastrarAdministrador = async (req, res) => {
  try {
    await criarAdministrador(req.body);
    res.status(201).json({ mensagem: 'Administrador cadastrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// busca a escola pelo nome
export const buscarEscolas = async (req, res) => {
  const { nome } = req.query;

  if (!nome || typeof nome !== 'string') {
    return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório e deve ser uma string.' });
  }

  try {
    const escolas = await buscarEscolasPorNome(nome);
    res.json(escolas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar escolas.' });
  }
};

// busca o ponto de embarque baseado na escola
export const buscarPontoPorEscola = async (req, res) => {
  const { escolaId } = req.query;

  if (!escolaId) {
    return res.status(400).json({ erro: 'Parâmetro escolaId é obrigatório.' });
  }

  try {
    const pontos = await buscarPontoDeEmbarquePorEscola(escolaId);

    if (!pontos || pontos.length === 0) {
      return res.status(404).json({ erro: 'Nenhum ponto de embarque encontrado para essa escola.' });
    }

    res.json(pontos[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar ponto de embarque.' });
  }
};

// deleta perfil do usuario - revisar
const tabelasPermitidas = ['alunos', 'responsaveis', 'motoristas', 'adm'];

const deletarPerfilController = async (req, res) => {
  const { tabela, cpf } = req.body;

  if (!tabelasPermitidas.includes(tabela)) {
    return res.status(400).json({ erro: 'Tipo de usuário inválido.' });
  }

  try {
    const resultado = await deletarPerfil(tabela, cpf);

    if (resultado === null) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    if (resultado === 0) {
      return res.status(500).json({ mensagem: 'Erro ao excluir usuário.' });
    }

    res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (erro) {
    console.error('Erro ao excluir usuário:', erro);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};

export { deletarPerfilController }