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
//             tipo: tipo }
//         const usuarioId = await registrarUsuario(usuarioData);
//         res.status(201).json({mensagem: 'Usuário criado com sucesso!', usuarioId});
//     } catch (err){
//         console.error('Erro ao registrar usuário: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar usuario'});
//     }}
// const registrarVeiculosController = async (req, res)=>{
//     try{
//         const {motorista_cpf, fabricacao, placa, modelo, marca} = req.body;
//         //armazena num arquivo json as informações que vamos enviar
//         const veiculoData = {
//             motorista_cpf: motorista_cpf,
//             fabricacao: fabricacao,
//             placa: placa,
//             modelo: modelo,
//             marca: marca }
//         const veiculoId = await registrarVeiculos(veiculoData);
//         res.status(201).json({mensagem: 'veículo registrado com sucesso!', veiculoId});}
//     catch(err){
//         console.error('Erro ao registrar veículo: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar veículo'});
//     }}

// export { registrarUsuarioController, registrarVeiculosController }

import { verificarResponsavelExistente, criarAluno, criarResponsavel, criarMotorista, criarAdministrador, buscarEscolasPorNome, buscarPontoDeEmbarquePorEscola, deletarPerfil, VerTodos, VerResponsaveis, VerMotoristas, VerAdmins, buscarViagensEmAndamento , buscarQuantidadeViagensEmAndamento, qtdUsuarios, qtdMotoristas, qtdEscolas , qtdViagensPorDia, qtdTipoUsuario, listarVeiculos} from '../models/Admin.js';

// ------------------------------------------------------------ cadastro dos usuarios
export const cadastrarAlunoComResponsavel = async (req, res) => {
  try {
    const { aluno, responsavel } = req.body;

    // 1. Verifica ou cria responsável
    const existentes = await verificarResponsavelExistente(responsavel);
    let responsavel_id;
    if (existentes.length > 0) {
      const r = existentes.find(r =>
        r.cpf === responsavel.cpf &&
        r.nome === responsavel.nome &&
        r.email === responsavel.email &&
        r.telefone === responsavel.telefone
      );
      if (!r) {
        return res.status(400).json({ erro: 'Informações inválidas do responsável.' });
      }
      responsavel_id = r.id;
    } else {
      responsavel_id = await criarResponsavel(responsavel);
    }

    // 2. Busca o viagem_id a partir da escola_id e ponto_embarque_id do aluno
    const viagem_id = await buscarViagemPorEscolaEPonto(aluno.escola_id, aluno.ponto_embarque_id);

    // 3. Remove viagem_id do objeto aluno para evitar erro na query de insert
    const { viagem_id: _, ...dadosAluno } = aluno;

    // 4. Cria aluno
    const aluno_id = await criarAluno(dadosAluno);

    // 5. Associa responsável e aluno
    await associarResponsavelAluno(responsavel_id, aluno_id);

    // 6. Associa aluno e viagem
    await associarAlunoViagem(aluno_id, viagem_id);

    return res.status(201).json({ mensagem: 'Aluno e responsável registrados com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: error.message || 'Erro ao registrar aluno e responsável.' });
  }
};

export const buscarViagemPorEscolaEPontoController = async (req, res) => {
  const { escola_id, ponto_embarque_id } = req.query;
  if (!escola_id || !ponto_embarque_id) {
    return res.status(400).json({ erro: 'Parâmetros escola_id e ponto_embarque_id são obrigatórios' });
  }
  try {
    const viagemId = await buscarViagemPorEscolaEPonto(escola_id, ponto_embarque_id);
    return res.json({ id: viagemId });
  } catch (error) {
    return res.status(404).json({ erro: error.message });
  }
};

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

// --------------------- deleta perfil do usuario - revisar


const deletarPerfilController = async (req, res) => {

const {email, tipo} = req.body
  try {
 
    const resultado = await deletarPerfil(tipo,email);

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

//--------------------------------
//funcoes de ver registros

//ver todos os alunos
const verTodosController = async (req, res) =>{
  try{
    const alunos = await VerTodos();
    res.json(alunos);
  }
  catch (error){
    console.error ('Erro ao listar todos os alunos: ', error);
    res.status(500).json({mensagem: 'Erro ao listar alunos'})
  }
};

//ver todos os responsaveis
const verResponsaveisController = async (req, res) =>{
  try{
    const responsaveis = await VerResponsaveis();
    res.json(responsaveis);
  }
  catch (error){
    console.error ('Erro ao listar todos os responsáveis: ', error);
    res.status(500).json({mensagem: 'Erro ao listar responsáveis '})
  }
};

//ver todos os motoristas
const verMotoristasController = async (req, res) =>{
  try{
    const motoristas = await VerMotoristas();
    res.json(motoristas);
  }
  catch(error){
    console.error('Erro ao listar todos os motoristas: ', error);
    res.status(500).json({mensagem: 'Erro ao listar motoristas'})
  }
};

// ver todos os adms
const verAdminsController = async (req, res) =>{
  try{
    const admins = await VerAdmins();
    res.json (admins);
  }
  catch (error){
    console.error('Erro ao listar todos os administradores: ', error);
    res.status(500).json({mensagem: 'Erro ao listar administradores'})
  }
};

//------------------------------dashboard

// ver qtnd de todos os usuarios
const contarUsuariosController = async (req, res) => {
  try {
    const totais = await qtdUsuarios();
    const total_geral = 
      totais.total_alunos +
      totais.total_responsaveis +
      totais.total_motoristas +
      totais.total_administradores;
      res.status(200).json(total_geral);
  } catch (error) {
    console.error('Erro ao contar usuários:', error);
    res.status(500).json({ mensagem: 'Erro ao contar usuários' });
  }
};

const contarMotoristasController = async (req, res) => {
  try {
    const totais = await qtdMotoristas();
    const total_geral = totais.total_motoristas;
      res.status(200).json({total_motoristas: total_geral});
  } catch (error) {
    console.error('Erro ao contar motoristas:', error);
    res.status(500).json({ mensagem: 'Erro ao contar motoristas' });
  }
};

// ver qtnd total de escolas
const contarEscolasController = async (req, res) => {
  try {
    const totais = await qtdEscolas();
    const total_geral = totais.total_escolas;
    res.status(200).json({ total_escolas: total_geral });
  } catch (error) {
    console.error('Erro ao contar escolas:', error);
    res.status(500).json({ mensagem: 'Erro ao contar escolas' });
  }
};

// ver todas as viagens em andamento
async function viagensEmAndamentoController(req, res) {
    try {
        const viagens = await buscarViagensEmAndamento();

        return res.status(200).json(viagens);
    } catch (error) {
        console.error('Erro ao buscar viagens em andamento:', error);
        return res.status(500).json({ erro: 'Erro interno ao buscar viagens em andamento' });
    }
}

async function quantidadeViagensEmAndamentoController(req, res) {
  try {
    const total = await buscarQuantidadeViagensEmAndamento();
    return res.status(200).json({ total });
  } catch (error) {
    console.error('Erro ao contar viagens em andamento:', error);
    return res.status(500).json({ erro: 'Erro ao contar viagens em andamento' });
  }
}

//ver quantidade de viagens por dia - gráfico line chart
async function viagensPorDiaController(req,res){
  try{
    const qtd_viagens = await qtdViagensPorDia();
    return res.status(200).json({qtd_viagens})
  }
  catch(error){
    console.error('Erro ao ver quantidade de viagens por dia: ', error);
    return res.status(500).json({erro: 'Erro ao ver qtd de viagens por dia'});
  }
}

//ver quantidade de usuarios por tipo - grafico de pizza
async function usuariosPorTipoController(req,res){
  try{
    const qtd_tipo = await qtdTipoUsuario();
    return res.status(200).json({qtd_tipo})
  }
  catch(error){
    console.error('Erro ao ver quantidade de usuários por tipo: ' , error);
    return res.status(500).json({erro: 'Erro ao ver quantidade de usuários por tipo'});
  }
}

//listar veículos
async function listarVeiculosController(req,res){
  try{
    const veiculos = await listarVeiculos();
    return res.status(200).json({veiculos})
  }
  catch(error){
    console.error('Erro ao listar veículos: ', error);
    return res.status(500).json({erro: 'Erro ao listar veículos'});
  }
}

export {verTodosController, verResponsaveisController, verMotoristasController, verAdminsController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarMotoristasController, contarEscolasController, viagensPorDiaController, usuariosPorTipoController, listarVeiculosController};