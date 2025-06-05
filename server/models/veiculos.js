import { read, readQuery} from "../config/database.js";

const verVeiculo = async(veiculoId)=>{
    try{
        const where = `motorista_id = ${veiculoId} AND id > 4`;
        return await read('veiculos', where)
    }
    catch(err){
        console.error('Erro ao buscar veiculos!!!',err);
        throw err;
    }
}

const verViagensVeiculos = async (motoristaId) => {
  // nessa query buscamos id, nome e idade do aluno, nome da escola que ele esta vinculado, o endereco do ponto de embarque da viagem q o aluno ta vinculado. busca se é ida ou volta, hora de saida e chegada, nome do motorista q conduz a viagem e no final retorna só os alunos vinculados ao id do responsavel q foi passado como parametro
  const consulta = `
 SELECT 
      m.id AS motorista_id,
      pe.endereco AS endereco_embarque,
      e.endereco as endereco_escola,
      v.hora_saida,
      v.hora_chegada_prevista,
      DATE_FORMAT(v.data_viagem, '%d/%m/%Y') AS data

      CASE
        WHEN NOW() > CONCAT(vi.data_viagem, ' ', vi.hora_chegada_prevista) THEN 'Concluída'
        WHEN NOW() BETWEEN CONCAT(vi.data_viagem, ' ', vi.hora_saida) AND CONCAT(vi.data_viagem, ' ', vi.hora_chegada_prevista) THEN 'Em andamento'
        ELSE 'Agendada'
      END AS status_viagem

    FROM viagens vi
    JOIN vi a ON vi.motorista_id = m.id
    Join vi ON vi.veiculo_id = v.id
    JOIN escolas e ON e.id = vi.escola_id
    JOIN viagens v ON v.id = av.viagem_id
    JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
    JOIN motoristas m ON m.id = vi.motorista_id
    JOIN veiculos v on v.id = vi.veiculo_id
    JOIN escolas on v.ponto_inicial_tipo = 'escola'
    WHERE vi.motorista_id = ?
      AND DATE(vi.data_viagem) = CURDATE()
    ORDER BY v.hora_saida;
  `;
  // passando o veiculoIdId como valor para o ?
  return readQuery(consulta, [motoristaId]);
};

export{verVeiculo, verViagensVeiculos}