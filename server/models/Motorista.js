import { read, readQuery, readAll, create } from "../config/database.js";

const verAlunos = async () => {
  try {
    return await readQuery(`
            select escolas.id, escolas.nome
from escolas
inner join alunos on escolas.id  = alunos.escola_id
where escolas.id = ? ; `)
  } catch (err) {
    console.error('Erro ao listar os alunos!!!')
    throw err;
  }
};

// revisar - o motorista so pode ver as escolas as quais ele é responsavel por fazer viagem
const verDadosEscola = async () => {
  try {
    return await readAll('escolas')
  } catch (error) {
    console.error('erro ao ver escolas!!!', error);
    throw error
  }
};

// procura veiculos c base no id do motorista
const verVeiculo = async (motoristaId) => {
  if (!motoristaId) throw new Error('motoristaId não fornecido');
  try {
    const where = `motorista_id = ${motoristaId}`;
    return await read('veiculos', where);
  } catch (err) {
    console.error('Erro ao buscar veiculos!!!', err);
    throw err;
  }
};
//ver os alunos com base no id do motorista
// const verAlunosPorVeiculo = async (motoristaId) => {
//   if (!motoristaId) throw new Error('motoristaId não fornecido');
//   try {
//     // const where = `motorista_id = ${motoristaId}`;
//     const row = `SELECT DISTINCT alunos.nome as nome_aluno
//      FROM alunos_viagens 
//      INNER JOIN alunos ON alunos_viagens.aluno_id = alunos.id 
//      INNER JOIN viagens ON alunos_viagens.viagem_id = viagens.id
//      WHERE viagens.motorista_id = ${motoristaId};`
//     return await readQuery(row, [motoristaId]);
//   } catch (err) {
//     console.error('Erro ao buscar veiculos!!!', err);
//     throw err;
//   }
// };



// ve as viagens q o veiculo faz
const verViagensVeiculos = async (motoristaId) => {
  // selecionamos as colunas que apresentam os ids das viagens, id dos veiculos, nome da escola associada a viagem, endereco da escola e ponto de embarque, tipo de viagem (ida ou volta), hora de saida e chegada e a data da viagem, formatando ela p padrao do brasil. em seguida, cria uma coluna q calcula se a viagem esta em andamento, concluida ou agendada. dps comecamos pela tabela viagens e liagmos ela a tabela de motoristas, pegando so as viagens onde o motorista corresponde ao motorista id, dps faz a juncao de viagens ao veiculo, viagens a escola e viagens a ponto de embarque. por fim q gnt filtra as viagens do motorista logado, pega só as viagens do dia de hoje e rdena os resultados da hr mais cedo p a mais tarde
  const consulta = `
      SELECT 
        v.id AS id_viagem,
        ve.id AS id_veiculo,
        e.nome AS nome_escola,
        pe.endereco AS endereco_embarque,
        e.endereco AS endereco_escola,
        v.tipo_viagem,
        v.hora_saida,
        v.hora_chegada_prevista,
        DATE_FORMAT(v.data_viagem, '%d/%m/%Y') AS data,
        CASE
          WHEN NOW() > CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Concluída'
          WHEN NOW() BETWEEN CONCAT(v.data_viagem, ' ', v.hora_saida) AND CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Em andamento'
          ELSE 'Agendada'
        END AS status_viagem
      FROM viagens v
      JOIN motoristas m ON v.motorista_id = m.id
      JOIN veiculos ve ON v.veiculo_id = ve.id
      JOIN escolas e ON e.id = v.ponto_inicial_id
      JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
      WHERE v.motorista_id = ?
        AND DATE(v.data_viagem) = CURDATE()
      ORDER BY v.hora_saida;`
    ;
  return readQuery(consulta, [motoristaId]);
};

// recebe mensagens 
const mensagensPorMotorista = async (motoristaId) => {
  const sql = `
    SELECT m.*, a.nome AS aluno_nome, r.nome AS responsavel_nome
  FROM mensagens_responsaveis m
  JOIN alunos a ON m.aluno_id = a.id
  JOIN responsaveis r ON m.responsavel_id = r.id
  JOIN alunos_viagens av ON av.aluno_id = a.id
  JOIN viagens v ON v.id = av.viagem_id
  WHERE v.motorista_id = ?
  ORDER BY m.data_envio DESC
  `;
  const resultados = await readQuery(sql, [motoristaId]);
  console.log("Resultados mensagensPorMotorista:", resultados);
  return resultados;
};

async function escolasEAlunosPorMotorista(motoristaId) {
  const query = `
SELECT DISTINCT
  e.id AS escola_id,
  e.nome AS escola_nome,
  e.endereco AS escola_endereco,
  a.id AS aluno_id,
  a.nome AS aluno_nome,
  a.email AS aluno_email,
  r.id AS responsavel_id,
  r.nome AS responsavel_nome,
  r.email AS responsavel_email
FROM viagens v
JOIN alunos_viagens av ON av.viagem_id = v.id
JOIN alunos a ON a.id = av.aluno_id
JOIN escolas e ON e.id = a.escola_id
JOIN responsaveis_alunos ra ON ra.aluno_id = a.id
JOIN responsaveis r ON r.id = ra.responsavel_id
WHERE v.motorista_id = ?

`;
  const rows = await readQuery(query, [motoristaId]);

  const escolasMap = {};
  const resultado = [];

  for (const row of rows) {
    if (!escolasMap[row.escola_id]) {
      escolasMap[row.escola_id] = {
        escola_id: row.escola_id,
        escola_nome: row.escola_nome,
        escola_endereco: row.escola_endereco,
        alunos: []
      };
      resultado.push(escolasMap[row.escola_id]);
    }

    // Verifica se o aluno já foi adicionado
    if (!escolasMap[row.escola_id].alunos.some(a => a.aluno_id === row.aluno_id)) {
      escolasMap[row.escola_id].alunos.push({
        aluno_id: row.aluno_id,
        aluno_nome: row.aluno_nome,
        aluno_email: row.aluno_email,
        responsavel: row.responsavel_id ? {
          responsavel_id: row.responsavel_id,
          responsavel_nome: row.responsavel_nome,
          responsavel_email: row.responsavel_email
        } : null
      });
    }
  }

  return resultado;
}

const buscarResponsavelPorAluno = async (aluno_id) => {
  const query = `
    SELECT r.id AS responsavel_id
    FROM responsaveis r
    JOIN responsaveis_alunos ra ON ra.responsavel_id = r.id
    WHERE ra.aluno_id = ?
    LIMIT 1
  `;
  const [resultado] = await readQuery(query, [aluno_id]);
  return resultado?.responsavel_id || null;
};


const criarMotoristaMensagem = async (dados) => {
  return await create('mensagens_motoristas', {
    motorista_id: dados.motorista_id,
    aluno_id: dados.aluno_id,
    responsavel_id: dados.responsavel_id,
    tipo: dados.tipo,
    conteudo: dados.conteudo
  });
};


export { verAlunos, verDadosEscola, verVeiculo, verViagensVeiculos, buscarResponsavelPorAluno, mensagensPorMotorista, criarMotoristaMensagem, escolasEAlunosPorMotorista }