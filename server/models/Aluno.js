// logica pra ver o historico de viagens
import { readQuery } from '../config/database.js'

const historicoAlunoViagens = async (alunoId) => {
    try {
        const query = `
            SELECT viagens.id, alunos_viagens.aluno_id
            FROM alunos_viagens
            JOIN viagens ON alunos_viagens.viagem_id = viagens.id
            WHERE alunos_viagens.aluno_id = ? AND viagens.data_viagem = CURDATE()
        `;
        return await readQuery(query, [alunoId]);
    } catch (err) {
        console.error('Não foi possível encontrar viagens', err);
        throw err;
    }
}

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