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

export { historicoAlunoViagens };