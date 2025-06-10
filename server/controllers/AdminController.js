import {
  verificarResponsavelExistente,
  criarAluno, criarResponsavel, criarMotorista, criarAdministrador, criarEscola, criarPontosEmbarque,
  buscarEscolasPorNome, buscarPontoDeEmbarquePorEscola, buscarViagensEmAndamento, buscarQuantidadeViagensEmAndamento,
  VerTodos, VerResponsaveis, VerMotoristas, VerAdmins,
  qtdUsuarios, qtdMotoristas, qtdEscolas, qtdViagensPorDia, qtdTipoUsuario,
  listarVeiculos, contarIncidentes, deletarPerfil, RegistarVeiculos, verEscolas,
  verPontos
} from '../models/Admin.js';

// export { registrarUsuarioController, registrarVeiculosController }

// import { verificarResponsavelExistente, criarAluno, criarResponsavel, criarMotorista, criarAdministrador, buscarEscolasPorNome, buscarPontoDeEmbarquePorEscola, deletarPerfil, VerTodos, VerResponsaveis, VerMotoristas, VerAdmins, buscarViagensEmAndamento , buscarQuantidadeViagensEmAndamento, qtdUsuarios, qtdMotoristas, qtdEscolas , qtdViagensPorDia, qtdTipoUsuario, listarVeiculos, contarIncidentes, } from '../models/Admin.js';

// ------------------------------------------------------------ cadastro dos usuarios
// cadastro dos usuarios ------------------------------------------------------------ 
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

//registrar veículos
export const registrarVeiculosController = async (req, res) => {
  try {
    await RegistarVeiculos(req.body);
    res.status(201).json({ mensagem: 'Veículo Registrado com sucesso! ' });
  }
  catch (err) {
    res.status(500).json({ erro: err.mesage });
  }
}


//Cadastrar escola ---------------------------------------------------------------------------
const criarEscolaController = async (req, res) => {
  try {
    await criarEscola(req.body);
    res.status(201).json({ mensagem: 'Escola cadastrada com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

//Cadastrar ponto ---------------------------------------------------------------------------
const criarPontoEmbarqueController = async (req, res) => {
  try {
    await criarPontosEmbarque(req.body);
    res.status(201).json({ mensagem: 'Ponto de embarque cadastrado com sucesso.' });
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

//funcoes de ver registros ----------------------------------------------------------------------------

//ver todos os alunos
const verTodosController = async (req, res) => {
  try {
    const alunos = await VerTodos();
    res.json(alunos);
  }
  catch (error) {
    console.error('Erro ao listar todos os alunos: ', error);
    res.status(500).json({ mensagem: 'Erro ao listar alunos' })
  }
};

//ver todos os responsaveis
const verResponsaveisController = async (req, res) => {
  try {
    const responsaveis = await VerResponsaveis();
    res.json(responsaveis);
  }
  catch (error) {
    console.error('Erro ao listar todos os responsáveis: ', error);
    res.status(500).json({ mensagem: 'Erro ao listar responsáveis ' })
  }
};

//ver todos os motoristas
const verMotoristasController = async (req, res) => {
  try {
    const motoristas = await VerMotoristas();
    res.json(motoristas);
  }
  catch (error) {
    console.error('Erro ao listar todos os motoristas: ', error);
    res.status(500).json({ mensagem: 'Erro ao listar motoristas' })
  }
};

// ver todos os adms
const verAdminsController = async (req, res) => {
  try {
    const admins = await VerAdmins();
    res.json(admins);
  }
  catch (error) {
    console.error('Erro ao listar todos os administradores: ', error);
    res.status(500).json({ mensagem: 'Erro ao listar administradores' })
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
    res.status(200).json({ total_motoristas: total_geral });
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
async function viagensPorDiaController(req, res) {
  try {
    const qtd_viagens = await qtdViagensPorDia();
    return res.status(200).json({ qtd_viagens })
  }
  catch (error) {
    console.error('Erro ao ver quantidade de viagens por dia: ', error);
    return res.status(500).json({ erro: 'Erro ao ver qtd de viagens por dia' });
  }
}

//ver quantidade de usuarios por tipo - grafico de pizza
async function usuariosPorTipoController(req, res) {
  try {
    const qtd_tipo = await qtdTipoUsuario();
    return res.status(200).json({ qtd_tipo })
  }
  catch (error) {
    console.error('Erro ao ver quantidade de usuários por tipo: ', error);
    return res.status(500).json({ erro: 'Erro ao ver quantidade de usuários por tipo' });
  }
}

//listar veículos
async function listarVeiculosController(req, res) {
  try {
    const veiculos = await listarVeiculos();
    return res.status(200).json({ veiculos })
  }
  catch (error) {
    console.error('Erro ao listar veículos: ', error);
    return res.status(500).json({ erro: 'Erro ao listar veículos' });
  }
}


//contar incidentes
async function contarIncidentesController(req, res) {
  try {
    const incidentes = await contarIncidentes();
    return res.status(200).json({ incidentes });
  }
  catch (error) {
    console.error('Erro ao contar incidentes por tipo: ', error);
    return res.status(500).json({ erro: 'Erro ao contar incidentes por tipo' });
  }
};

//tabela de escolas
async function verEscolasController (req,res){
  try{
    const escolas = await verEscolas();
    return res.status(200).json({escolas})
  }
  catch(error){
    console.error('Erro ao ver os registros das escolas: ', error);
    return res.status(500).json({erro: 'Erro ao ver escolas cadastradas'});
  }
}

//ver pontos de embarque - tabela dashboard
async function verPontosController(req,res){
  try{
    const pontos = await verPontos();
    return res.status(200).json({pontos});
  }
  catch(error){
    console.error('Erro ao ver pontos de embarque: ', error);
    return res.status(500).json({erro: 'Erro ao ver pontos de embarque'});
  }
}

// --------------------- deleta perfil do usuario - FUNCIONANDO


const deletarPerfilController = async (req, res) => {

  const { tipo, email } = req.body
  try {

    const resultado = await deletarPerfil(tipo, email);

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

//excluir veiculos
/*export const excluirVeiculoController = async (req, res) => {
  const {id} = req.params
  try {
    const resultado = await excluirVeiculo("veiculos", id);

    if (resultado === null){
      return res.status(404).json({mensagem: 'Veículo não encontrado'});
    }
    if (resultado === 0){
      return res.status(500).json({mensagem: 'Erro ao excluir veículo'});
    }
    
    res.status(200).json({mensagem: 'Veículo excluído com sucesso.'});
  }
  catch(error){
    console.error(`Erro ao excluir veículo: `, error);
    res.status(500).json({erro: 'Erro ao excluir veículo'});
  }
}*/

// const deletarVeiculoController = async (req, res) => {

//   const {email, tipo} = req.body
//     try {

//       const resultado = await deletarPerfil(tipo,email);

//       if (resultado === null) {
//         return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
//       }

//       if (resultado === 0) {
//         return res.status(500).json({ mensagem: 'Erro ao excluir usuário.' });
//       }

//       res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
//     } catch (erro) {
//       console.error('Erro ao excluir usuário:', erro);
//       res.status(500).json({ erro: 'Erro interno do servidor.' });
//     } };



export { verTodosController, criarPontoEmbarqueController, criarEscolaController, deletarPerfilController, verResponsaveisController, verMotoristasController, verAdminsController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarMotoristasController, contarEscolasController, viagensPorDiaController, usuariosPorTipoController, listarVeiculosController, contarIncidentesController , verEscolasController, verPontosController};