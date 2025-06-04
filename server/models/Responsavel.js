import { readQuery } from "../config/database.js";

const verFilhos = async (responsavelId) => {
  try {
    const consulta = `
      SELECT 
        a.id AS id_aluno,
        a.nome AS nome_aluno,
        TIMESTAMPDIFF(YEAR, a.dataNascimento, CURDATE()) AS idade,
        e.nome AS nome_escola,
        pe.endereco AS endereco_embarque,
        v.tipo_viagem,
        TIME_FORMAT(v.hora_saida, '%H:%i') AS hora_saida,
        TIME_FORMAT(v.hora_chegada_prevista, '%H:%i') AS hora_chegada_prevista,
        m.nome AS nome_motorista
      FROM responsaveis_alunos ra
      JOIN alunos a ON ra.aluno_id = a.id
      JOIN alunos_viagens av ON av.aluno_id = a.id
      JOIN viagens v ON v.id = av.viagem_id
      JOIN motoristas m ON m.id = v.motorista_id
      JOIN escolas e ON e.id = a.escola_id
      JOIN pontos_embarque pe ON pe.id = a.ponto_embarque_id
      WHERE ra.responsavel_id = ?
      ORDER BY a.nome, v.tipo_viagem
    `;
    const resultado = await readQuery(consulta, [responsavelId]);
    return resultado;
  } catch (error) {
    console.error("Erro ao buscar filhos do responsável:", error);
    throw error;
  }
};

export { verFilhos }
