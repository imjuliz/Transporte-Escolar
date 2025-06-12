// logica pra ver o historico de viagens
import { readQuery } from '../config/database.js'

const historicoAlunoViagens = async (alunoId) => {
    const query = `
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
        CASE
            WHEN NOW() > CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Concluída'
            WHEN NOW() BETWEEN CONCAT(v.data_viagem, ' ', v.hora_saida) AND CONCAT(v.data_viagem, ' ', v.hora_chegada_prevista) THEN 'Em andamento'
            ELSE 'Agendada'
        END AS status_viagem
    FROM alunos_viagens av
    JOIN alunos a ON a.id = av.aluno_id
    JOIN viagens v ON v.id = av.viagem_id
    JOIN motoristas m ON v.motorista_id = m.id
    JOIN escolas e ON e.id = v.ponto_inicial_id
    JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
    WHERE a.id = ?
      AND DATE(v.data_viagem) = CURDATE()
    ORDER BY v.hora_saida;
    `;
    
    return await readQuery(query, [alunoId]);
};

const verMotorista = async (alunoId) => {
    try {
        const query = `
        select distinct nome, telefone, email 
        FROM alunos_viagens
        INNER JOIN viagens ON alunos_viagens.viagem_id = viagens.id
        INNER JOIN motoristas ON viagens.motorista_id = motoristas.id
        WHERE alunos_viagens.aluno_id = ?; `;
        return await readQuery(query, [alunoId]);
    }catch(err){
        console.error('Não foi possível pegar as informações do motorista', err);
        throw err;
    }
}

const verVeiculo = async (alunoId) => {
  try {
    const query = `
      SELECT DISTINCT 
        veiculos.placa, veiculos.modelo, veiculos.marca, veiculos.anoFabricacao, veiculos.capacidade
      FROM alunos_viagens
      INNER JOIN viagens ON alunos_viagens.viagem_id = viagens.id
      INNER JOIN veiculos ON viagens.veiculo_id = veiculos.id
      WHERE alunos_viagens.aluno_id = ?;
    `;
    return await readQuery(query, [alunoId]);
  } catch (err) {
    console.error('Não foi possível pegar as informações do veículo:', err);
    throw err;
  }
};

export { historicoAlunoViagens, verMotorista, verVeiculo };