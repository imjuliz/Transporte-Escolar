import { readQuery } from "../config/database.js";

const verFilhos = async (responsavelId) => {
  // nessa query buscamos id, nome e idade do aluno, nome da escola que ele esta vinculado, endereco do ponto de embarque da viagem que ele esta vinculado, se é ida ou volta, hora de saida e chegada, nome do motorista q conduz a viagem e no final retorna só os alunos vinculados ao id do responsavel q foi passado como parametro
  const consulta = `
    SELECT 
      a.id AS id_aluno,
      a.nome AS nome_aluno,
      a.idade,
      e.nome AS nome_escola,
      pe.endereco AS endereco_embarque,
      v.tipo_viagem,
      v.hora_saida,
      v.hora_chegada_prevista,
      m.nome AS nome_motorista
    FROM responsaveis_alunos ra
    JOIN alunos a ON a.id = ra.aluno_id
    JOIN escolas e ON e.id = a.escola_id
    JOIN alunos_viagens av ON av.aluno_id = a.id
    JOIN viagens v ON v.id = av.viagem_id
    JOIN pontos_embarque pe ON pe.id = v.ponto_embarque_id
    JOIN motoristas m ON m.id = v.motorista_id
    WHERE ra.responsavel_id = ?
  `;
  // passando o responsavelId como valor para o ?
  const rows = await readQuery(consulta, [responsavelId]);
  // criando um objeto vazio que vai ser usado p agrupar os dados por aluno (evita repeticoes e listar todas as viagens do mesmo aluno em um array)
  const agrupado = {};

  for (const row of rows) {
    const {
      id_aluno,
      nome_aluno,
      idade,
      nome_escola,
      endereco_embarque,
      tipo_viagem,
      hora_saida,
      hora_chegada_prevista,
      nome_motorista
    } = row;

    // usamos um objeto p agrupar as viagens p/ aluno. se o aluno n estiver dentro do objeto, adiciona esse aluno como uma nova entrada, se nao vai só juntar as viagens dele
    if (!agrupado[id_aluno]) {
      agrupado[id_aluno] = {
        id_aluno,
        nome_aluno,
        idade,
        nome_escola,
        endereco_embarque,
        viagens: []
      };
    }

    agrupado[id_aluno].viagens.push({
      tipo_viagem,
      hora_saida,
      hora_chegada_prevista,
      nome_motorista
    });
  }

  return Object.values(agrupado);
};

export default verFilhos;
