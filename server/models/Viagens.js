import { read, readAll } from '../config/database.js';

async function obterDadosDaViagemDoAluno(alunoId) {
    const alunoIdInt = parseInt(alunoId, 10);
    if (isNaN(alunoIdInt)) throw new Error('ID de aluno inválido');

    const aluno = await read('alunos', `id = ${alunoIdInt}`);

    if (!aluno || !aluno.viagem_id || !aluno.ponto_embarque_id) return null;

    const viagemId = parseInt(aluno.viagem_id, 10);
    const pontoId = parseInt(aluno.ponto_embarque_id, 10);

    if (isNaN(viagemId) || isNaN(pontoId)) throw new Error('Dados do aluno incompletos');

    const viagem = await read('viagens', `id = ${viagemId}`);
    if (!viagem) return null;

    // Identificar o ID da escola baseado nos tipos de ponto
    let escolaId = null;
    if (viagem.ponto_final_tipo === 'escola') {
        escolaId = parseInt(viagem.ponto_final_id, 10);
    } else if (viagem.ponto_inicial_tipo === 'escola') {
        escolaId = parseInt(viagem.ponto_inicial_id, 10);
    }

    if (!escolaId || isNaN(escolaId)) return null;

    const ponto = await read('pontos_embarque', `id = ${pontoId}`);
    const escola = await read('escolas', `id = ${escolaId}`);

    if (!ponto || !escola) return null;

    console.log('📍 Ponto de embarque encontrado:', ponto);
    console.log('🏫 Escola encontrada:', escola);

    return {
        viagemId: viagem.id,
        ponto: { lat: parseFloat(ponto.latitude), lng: parseFloat(ponto.longitude) },
        escola: { lat: parseFloat(escola.latitude), lng: parseFloat(escola.longitude) }
    };
}
async function obterViagensDoMotorista(motoristaId) {
    const motoristaIdInt = parseInt(motoristaId, 10);
    if (isNaN(motoristaIdInt)) throw new Error('ID de motorista inválido');

    return await readAll('viagens', `motorista_id = ${motoristaIdInt}`);
}

async function obterViagensDosFilhos(responsavelId) {
    const responsavelIdInt = parseInt(responsavelId, 10);
    if (isNaN(responsavelIdInt)) throw new Error('ID de responsável inválido');

    const filhos = await readAll('alunos', `responsavel_id = ${responsavelIdInt}`);
    const viagens = [];

    for (const filho of filhos) {
        if (filho.viagem_id) {
            const viagem = await read('viagens', `id = ${parseInt(filho.viagem_id, 10)}`);
            if (viagem) viagens.push({ aluno: filho.nome, viagem });
        }
    }

    return viagens;

}

export default {
    obterDadosDaViagemDoAluno,
    obterViagensDoMotorista,
    obterViagensDosFilhos
};