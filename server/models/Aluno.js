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
    JOIN escolas e ON e.id = a.escola_id
    JOIN viagens v ON v.id = av.viagem_id AND DATE(v.data_viagem) = CURDATE()
    LEFT JOIN pontos_embarque pe ON pe.id = v.ponto_inicial_id
    LEFT JOIN motoristas m ON m.id = v.motorista_id
    WHERE a.id = ?
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

export { historicoAlunoViagens, verMotorista };