import { readQuery } from "../config/database.js";

const verFilhos = async (responsavelId) => {
    try {
        const consulta = `
            SELECT 
                alunos.id AS id_aluno,
                alunos.nome AS nome_aluno,
                alunos.dataNascimento AS aluno_dataNascimento,
                alunos.email AS email_aluno,
                escolas.nome AS nome_escola,
                escolas.endereco AS endereco_escola,
                pontos_embarque.nome AS nome_ponto_embarque,
                pontos_embarque.endereco AS endereco_ponto_embarque,
                viagens.horario_embarque,
                viagens.horario_desembarque
            FROM responsaveis_alunos
            INNER JOIN alunos ON responsaveis_alunos.aluno_id = alunos.id
            INNER JOIN escolas ON alunos.escola_id = escolas.id
            INNER JOIN pontos_embarque ON alunos.ponto_embarque_id = pontos_embarque.id
            WHERE responsaveis_alunos.responsavel_id = ?
        `;

        const filhos = await readQuery(consulta, [responsavelId]);

        if (!filhos || filhos.length === 0) {
            console.warn('O usuário não possui filhos vinculados.');
            return null;
        }
        return filhos;
    } catch (err) {
        console.error('Erro ao obter informações dos filhos', err);
        throw err;
    }
}

export { verFilhos }
