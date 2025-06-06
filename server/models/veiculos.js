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

export{verVeiculo, verViagensVeiculos}