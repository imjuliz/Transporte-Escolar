import { readQuery, readAll } from "../config/database.js";

const verAlunos = async () => {
    try {
        return await readQuery(`
            select escolas.id, escolas.nome
from escolas
inner join alunos on escolas.id  = alunos.escola_id
where escolas.id = ? ; `)
    } catch (err) {
        console.error('Erro ao listar os alunos!!!')
        throw err;
    }
};


const verDadosEscola = async () => {
    try {
        return await readAll('escolas')
    } catch (error) {
        console.error('erro ao ver escolas!!!', error);
        throw error
    }
}

export { verAlunos, verDadosEscola }