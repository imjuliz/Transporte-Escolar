import { create, readQuery } from "../config/database.js";

const verFilhos = async (responsavelId) => {
  // nessa query buscamos id, nome e idade do aluno, nome da escola que ele esta vinculado, o endereco do ponto de embarque da viagem q o aluno ta vinculado. busca se é ida ou volta, hora de saida e chegada, nome do motorista q conduz a viagem e no final retorna só os alunos vinculados ao id do responsavel q foi passado como parametro
  const consulta = `
 SELECT 
  a.id AS id_aluno,
  a.nome AS nome_aluno,
  TIMESTAMPDIFF(YEAR, a.dataNascimento, CURDATE()) AS idade,
  e.nome AS nome_escola,
  pe.endereco AS endereco_embarque,
  v.tipo_viagem,
  v.hora_saida,
  v.hora_chegada_prevista,
  DATE_FORMAT(v.data_viagem, '%d/%m/%Y') AS data,
  m.nome AS nome_motorista,
  m.email AS email_motorista,
  m.telefone AS telefone_motorista,

  CASE
    WHEN NOW() > CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Concluída'
    WHEN NOW() BETWEEN CONCAT(v.data_viagem, ' ', v.hora_saida) AND CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Em andamento'
    ELSE 'Agendada'
  END AS status_viagem

FROM responsaveis_alunos ra
JOIN alunos a ON a.id = ra.aluno_id
JOIN escolas e ON e.id = a.escola_id
LEFT JOIN alunos_viagens av ON av.aluno_id = a.id
LEFT JOIN viagens v ON v.id = av.viagem_id AND DATE(v.data_viagem) = CURDATE()
LEFT JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
LEFT JOIN motoristas m ON m.id = v.motorista_id
WHERE ra.responsavel_id = ?
ORDER BY v.hora_saida;
  `;
  // passando o responsavelId como valor para o ?
  return readQuery(consulta, [responsavelId]);
};

// cria a mensagem
const criarResponsavelMensagem = async (dados) => {
  return await create('mensagens_responsaveis', {
    responsavel_id: dados.responsavel_id,
    aluno_id: dados.aluno_id,
    tipo: dados.tipo,
    conteudo: dados.conteudo
  });
};

// recebe mensagens 
const mensagensPorResponsavel = async (responsavelId) => {
  const sql = `
    SELECT m.*, a.nome AS aluno_nome, r.nome AS responsavel_nome, mo.nome AS motorista_nome
    FROM mensagens_motoristas m
    JOIN alunos a ON m.aluno_id = a.id
    JOIN responsaveis r ON m.responsavel_id = r.id
     JOIN motoristas mo ON m.motorista_id = mo.id
    WHERE m.responsavel_id = ?
    ORDER BY m.data_envio DESC
  `;
  const resultados = await readQuery(sql, [responsavelId]);
  return resultados;
};


export { verFilhos, criarResponsavelMensagem, mensagensPorResponsavel };
