import { create, readAll, read, readQuery, deleteRecord } from '../config/database.js';

// ----------------------------------registrar novos usuarios----------------------------------
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

//registrar veiculos
export const RegistarVeiculos = async (dados) =>{
  try{
    return await create ('veiculos', dados);
  } catch(err) {
    console.error('Erro ao registrar veículo: ', err);
    throw err
  }
}

// verifica se o responsavel ja existe
export const verificarResponsavelExistente = async ({ cpf, email, telefone }) => {
  const consulta = 'SELECT * FROM responsaveis WHERE cpf = ? OR email = ? OR telefone = ?';
  const values = [cpf, email, telefone];
  console.log('Valores para consulta:', values);
  try {
    return await readQuery(consulta, values);
  } catch (err) {
    throw err;
  }
};

export const associarResponsavelAluno = async (responsavelId, alunoId) => {
  try {
    return await create('responsaveis_alunos', {
      responsavel_id: responsavelId,
      aluno_id: alunoId
    });
  } catch (err) {
    throw err;
  }};
  // ----------------------------------registrar escolas----------------------------------
  const criarEscola = async (dados) => {
    try {
      return await create('escolas', dados);
    } catch (err) {
      console.error('Erro ao cadastrar escola', err);
      throw err;
    }
  };
 // ----------------------------------registrar pontos de embarque----------------------------------
  const criarPontosEmbarque = async (dados) => {
    try {
      return await create('pontos_embarque', dados);
    } catch (err) {
      console.error('Erro ao registrar ponto de embarque', err);
      throw err;
    }
  };

// busca o id da viagem pela escola e ponto-------------------------------------------------------------------
export const buscarViagemPorEscolaEPonto = async (escola_id, ponto_embarque_id) => {
  const query = `
    SELECT id FROM viagens 
    WHERE escola_id = ? AND ponto_embarque_id = ? 
    LIMIT 1
  `;
  const results = await readQuery(query, [escola_id, ponto_embarque_id]);
  if (results.length === 0) {
    throw new Error('Viagem não encontrada para escola e ponto informados');
  }
  return results[0].id;
};


// busca o nome da escola--------------------------------------------------------------------------------------
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
  );}

// deleta o perfil do USUARIO
export const deletarPerfil = async (tipo, id) => {

  const usuario = await read(tabela, `id = '${id}'`);
  if (!usuario) return null;

  const resultado = await deleteRecord(tabela, `cpf = '${cpf}'`);
  return resultado;
}



//---------------------------------

//funcoes de ver todos os registros

//ver todos os alunos
export const VerTodos = async () => {
  try {
    return await readAll('alunos');

  }
  catch (error) {
    console.error('Erro ao listar todos os alunos!: ', error);
    throw error;
  }
}

//ver todos os responsaveis
export const VerResponsaveis = async () => {
  try {
    return await readAll('responsaveis');
  }
  catch (error) {
    console.error('Erro ao ver todos os responsáveis:', error);
    throw error;
  }
}

//ver todos os motoristas
export const VerMotoristas = async () => {
  try {
    return await readAll('motoristas');
  }
  catch (error) {
    console.error('Erro ao ver motoristas: ', error);
    throw error;
  }
}

//ver todos os admins
export const VerAdmins = async () => {
  try {
    return await readAll('adm');
  }
  catch (error) {
    console.error('Erro ao ver administradores: ', error);
    throw error;
  }
}

// ver qntd de usuarios no total
async function qtdUsuarios() {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM alunos) AS total_alunos,
      (SELECT COUNT(*) FROM responsaveis) AS total_responsaveis,
      (SELECT COUNT(*) FROM motoristas) AS total_motoristas,
      (SELECT COUNT(*) FROM adm) AS total_administradores
  `;
  const resultado = await readQuery(sql);
  return resultado[0]; // retorna um objeto com os totais
}

async function qtdMotoristas() {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM motoristas) AS total_motoristas
  `;
  const resultado = await readQuery(sql);
  return resultado[0]; // retorna um objeto com os totais
}

// ver qntd de escolas no total
async function qtdEscolas() {
  const sql = `
    SELECT COUNT(*) AS total_escolas FROM escolas;
  `;
  const resultado = await readQuery(sql);
  return resultado[0];
}

// ver viagens em andamento
const buscarViagensEmAndamento = async () => {
  const sql = `
        SELECT * FROM viagens
        WHERE data_viagem = CURDATE()
        AND CURTIME() BETWEEN hora_saida AND hora_chegada_prevista
        AND status = 'agendada'
    `;
  return await readQuery(sql);
}

// ver qtd de viagens em andamento
const buscarQuantidadeViagensEmAndamento = async () => {
  const sql = `
    SELECT COUNT(*) AS total FROM viagens
    WHERE data_viagem = CURDATE()
    AND CURTIME() BETWEEN hora_saida AND hora_chegada_prevista
    AND status = 'agendada'
  `;
  const resultado = await readQuery(sql);
  return resultado[0].total; // retorna apenas o número
};

//-----------------------------
//para contar viagens por dia - gráfico do dashboard
const qtdViagensPorDia = async () => {
  const sql = `
  SELECT data_viagem AS data, COUNT(*) AS total_viagens
FROM viagens
GROUP BY data_viagem
ORDER BY data_viagem;
  `;

  return await readQuery(sql);
}

//para contar os tipos de usuário
const qtdTipoUsuario = async () => {
  const sql = `
  SELECT 'Alunos' AS name, COUNT(*) AS value FROM alunos
UNION ALL
SELECT 'Motoristas' AS name, COUNT(*) AS value FROM motoristas
UNION ALL
SELECT 'Responsáveis' AS name, COUNT(*) AS value FROM responsaveis
UNION ALL
SELECT 'Administradores' AS name, COUNT(*) AS value FROM adm;
`;
  return await readQuery(sql);
}

//para listar os veiculos
const listarVeiculos = async () => {
  try {
    return await readAll('veiculos');
  }
  catch (error) {
    console.error('Erro ao listar veículos: ', error);
    throw error;
  }
}

//para contar os incidentes por tipo - gráfico de barras
const contarIncidentes = async () => {
  const sql = `
  SELECT tipo, COUNT(*) AS quantidade
FROM incidentes
GROUP BY tipo;
  `;
  return await readQuery(sql)
};

// deleta o perfil do USUARIO
const deletarPerfil = async (tipo, email) => {

  const resultado = await deleteRecord(tipo, `email = '${email}' `);
  return resultado;
}

export { deletarPerfil, criarPontosEmbarque, criarEscola, buscarViagensEmAndamento, buscarQuantidadeViagensEmAndamento, qtdMotoristas, qtdUsuarios, qtdEscolas, qtdViagensPorDia, qtdTipoUsuario, listarVeiculos, contarIncidentes };