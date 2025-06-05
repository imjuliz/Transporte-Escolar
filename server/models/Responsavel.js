import { readQuery } from "../config/database.js";

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
      DATE(v.data_viagem) AS data,
      m.nome AS nome_motorista,

      CASE
        WHEN NOW() > CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Concluída'
        WHEN NOW() BETWEEN CONCAT(v.data_viagem, ' ', v.hora_saida) AND CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Em andamento'
        ELSE 'Agendada'
      END AS status_viagem

    FROM responsaveis_alunos ra
    JOIN alunos a ON a.id = ra.aluno_id
    JOIN escolas e ON e.id = a.escola_id
    JOIN alunos_viagens av ON av.aluno_id = a.id
    JOIN viagens v ON v.id = av.viagem_id
    JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
    JOIN motoristas m ON m.id = v.motorista_id
    WHERE ra.responsavel_id = ?
      AND DATE(v.data_viagem) = CURDATE()
    ORDER BY v.hora_saida;
  `;
  // passando o responsavelId como valor para o ?
  return readQuery(consulta, [responsavelId]);
};

export { verFilhos };
