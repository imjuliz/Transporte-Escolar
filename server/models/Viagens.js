import { read, readAll } from '../config/database.js';

// async function obterDadosDaViagemDoAluno(alunoId) {
//     // passa id do aluno p/ numero inteiro
//     const alunoIdInt = parseInt(alunoId, 10);
//     if (isNaN(alunoIdInt)) {
//         console.error('ID de aluno inválido:', alunoId);
//         return null;
//     }

//     // busca aluno
//     const aluno = await read('alunos', `id = ${alunoIdInt}`);

//     // se n achar o aluno ou faltar ponto de embarque
//     if (!aluno || !aluno.ponto_embarque_id) {
//         console.error('Aluno não encontrado ou sem ponto de embarque');
//         return null;
//     }

//     // busca informacoes da viagem correspondente ao id do aluno, traz as viagens c/ status 'agendada' ou 'em_andamento' e q comecaram/n terminaram ou q estao p/ comecar
//     const viagens = await readAll(`alunos_viagens JOIN viagens ON alunos_viagens.viagem_id = viagens.id`, `alunos_viagens.aluno_id = ${alunoIdInt} AND viagens.status IN ('agendada','em_andamento') AND CONCAT(viagens.data_viagem, ' ', viagens.hora_saida) <= NOW() AND CONCAT(viagens.data_viagem, ' ', viagens.hora_chegada_prevista) >= NOW()`);

//     // se nenhuma viagem ativa for encontrada retorna null
//     if (!viagens || viagens.length === 0) {
//         console.error('Nenhuma viagem ativa encontrada para o aluno');
//         return null;
//     }

//     // pega a primeira viagem encontrada
//     const viagem = viagens[0];

//     // passa id do ponto p/ numero inteiro
//     const pontoId = parseInt(aluno.ponto_embarque_id, 10);

//     // determina se a escola é ponto final ou inicial e pega o seu id
//     let escolaId = null;
//     if (viagem.ponto_final_tipo === 'escola') {
//         escolaId = parseInt(viagem.ponto_final_id, 10);
//     } else if (viagem.ponto_inicial_tipo === 'escola') {
//         escolaId = parseInt(viagem.ponto_inicial_id, 10);
//     }

//     // se o id da escola n for valido retorna null
//     if (!escolaId || isNaN(escolaId)) {
//         console.error('ID da escola inválido ou não encontrado');
//         return null;
//     }

//     // busca ponto de embarque e escola pelo id
//     const ponto = await read('pontos_embarque', `id = ${pontoId}`);
//     const escola = await read('escolas', `id = ${escolaId}`);

//     // se ponto ou escola n forem encontrados retorna null
//     if (!ponto || !escola) {
//         console.error('Ponto de embarque ou escola não encontrados');
//         return null;
//     }

//     // retorna um objeto c/ viagem e as coordenadas do ponto de embarque e da escola, converte lat e long p/ formato numerico
//     return {
//         viagemId: viagem.id,
//         ponto: { lat: parseFloat(ponto.latitude), lng: parseFloat(ponto.longitude) },
//         escola: { lat: parseFloat(escola.latitude), lng: parseFloat(escola.longitude) }
//     };
// }
async function obterDadosDaViagemDoAluno(alunoId) {
    console.log('Iniciando busca para alunoId:', alunoId);

    const alunoIdInt = parseInt(alunoId, 10);
    if (isNaN(alunoIdInt)) {
        console.error('ID de aluno inválido:', alunoId);
        return null;
    }

    const aluno = await read('alunos', `id = ${alunoIdInt}`);
    console.log('Aluno encontrado:', aluno);

    if (!aluno || !aluno.ponto_embarque_id) {
        console.error('Aluno não encontrado ou sem ponto de embarque');
        return null;
    }

    const tabela = `alunos_viagens JOIN viagens ON alunos_viagens.viagem_id = viagens.id`;
const condicao = `alunos_viagens.aluno_id = ${alunoIdInt} AND viagens.status IN ('agendada','em_andamento')`;

console.log('Tabela:', tabela);
console.log('Condição:', condicao);

const viagens = await readAll(tabela, condicao);
console.log('Viagens encontradas para aluno:', viagens);

    if (!viagens || viagens.length === 0) {
        console.error('Nenhuma viagem ativa encontrada para o aluno');
        return null;
    }

    const viagem = viagens[0];
    console.log('Viagem escolhida:', viagem);

    const pontoId = parseInt(aluno.ponto_embarque_id, 10);

    // determina se a escola é ponto final ou inicial e pega o seu id
    let escolaId = null;
    if (viagem.ponto_final_tipo === 'escola') {
        escolaId = parseInt(viagem.ponto_final_id, 10);
    } else if (viagem.ponto_inicial_tipo === 'escola') {
        escolaId = parseInt(viagem.ponto_inicial_id, 10);
    }

//busca ponto de embarque e escola pelo id
    const ponto = await read('pontos_embarque', `id = ${pontoId}`);
    const escola = await read('escolas', `id = ${escolaId}`);

    // se ponto ou escola n forem encontrados retorna null
    if (!ponto || !escola) {
        console.error('Ponto de embarque ou escola não encontrados');
        return null;
    }

    // retorna um objeto c/ viagem e as coordenadas do ponto de embarque e da escola, converte lat e long p/ formato numerico
    return {
        viagemId: viagem.id,
        ponto: { lat: parseFloat(ponto.latitude), lng: parseFloat(ponto.longitude) },
        escola: { lat: parseFloat(escola.latitude), lng: parseFloat(escola.longitude) }
    };
}


async function obterDadosDaViagemDoMotorista(motoristaId) {
    const motoristaIdInt = parseInt(motoristaId, 10);
    if (isNaN(motoristaIdInt)) {
        console.error('ID de motorista inválido:', motoristaId);
    }
    const veiculo = await read('veiculos', `motorista_id = ${motoristaIdInt}`);
    if (!veiculo) {
        console.error('Nenhum veículo encontrado para o motorista:', motoristaIdInt);
        return null;
    }

    // a viagem deve estar agendada ou em andamento, associada ao motorista logado ou ao veiculo que ele dirige e dentro do horario de inicio e fim da viagem
    // const viagem = await read(
    //     'viagens',
    //     `(motorista_id = ${motoristaIdInt} OR veiculo_id = ${veiculo.id}) 
    //      AND status IN ('agendada', 'em_andamento') 
    //      AND CONCAT(data_viagem, ' ', hora_saida) >= NOW()
    //      ORDER BY data_viagem ASC, hora_saida ASC 
    //      LIMIT 1`
    // );
    const viagens = await readQuery(`
  SELECT * FROM viagens 
  WHERE (motorista_id = ? OR veiculo_id = ?) 
    AND status IN ('agendada', 'em_andamento') 
    AND CONCAT(data_viagem, ' ', hora_saida) <= NOW()
    AND CONCAT(data_viagem, ' ', hora_chegada_prevista) >= NOW()
  ORDER BY data_viagem ASC, hora_saida ASC 
  LIMIT 1
`, [motoristaIdInt, veiculo.id]);

    const viagem = viagens[0];

    if (!viagem) {
        console.error('Nenhuma viagem encontrada para o motorista ou veículo');
        return null;
    }

    let pontoInicial = null, pontoFinal = null;
    // pega as coordenadas do ponto inicial
    if (viagem.ponto_inicial_tipo === 'ponto_embarque') {
        pontoInicial = await read('pontos_embarque', `id = ${viagem.ponto_inicial_id}`);
    } else if (viagem.ponto_inicial_tipo === 'escola') {
        pontoInicial = await read('escolas', `id = ${viagem.ponto_inicial_id}`);
    }
    // pega as coordenadas do ponto final
    if (viagem.ponto_final_tipo === 'ponto_embarque') {
        pontoFinal = await read('pontos_embarque', `id = ${viagem.ponto_final_id}`);
    } else if (viagem.ponto_final_tipo === 'escola') {
        pontoFinal = await read('escolas', `id = ${viagem.ponto_final_id}`);
    }

    if (!pontoInicial || !pontoFinal) return null;

    // retorna dados da viagem e coordenadas dos pontos
    return {
        viagemId: viagem.id,
        pontoInicial: { lat: parseFloat(pontoInicial.latitude), lng: parseFloat(pontoInicial.longitude) },
        pontoFinal: { lat: parseFloat(pontoFinal.latitude), lng: parseFloat(pontoFinal.longitude) }
    };
}

async function obterDadosDasViagensDoResponsavel(responsavelId) {
    // passa id p/ inteiro
    const responsavelIdInt = parseInt(responsavelId, 10);
    if (isNaN(responsavelIdInt)) {
        console.error('ID de responsável inválido:', responsavelId);
    }

    // busca alunos vinculados ao responsavel
    const alunosVinculados = await readAll('responsaveis_alunos', `responsavel_id = ${responsavelIdInt}`);
    if (!alunosVinculados || alunosVinculados.length === 0) {
        console.error('O usuário não possui alunos vinculados');
        return null;
    }

    const viagens = [];

    // p/ cd aluno vinculado, usamos join entre 'alunos_viagens' e 'viagens' para pegar so viagens ativas e no horario associadas a ele
    for (const vinculacao of alunosVinculados) {
        const viagensAluno = await readAll(`alunos_viagens JOIN viagens ON alunos_viagens.viagem_id = viagens.id`, `alunos_viagens.aluno_id = ${vinculacao.aluno_id} AND viagens.status IN ('agendada', 'em_andamento') AND CONCAT(viagens.data_viagem, ' ', viagens.hora_saida) <= NOW() AND CONCAT(viagens.data_viagem, ' ', viagens.hora_chegada_prevista) >= NOW()`);

        for (const viagem of viagensAluno) {
            let pontoInicial = null, pontoFinal = null;
            // se ponto inicial for "ponto_embarque"
            if (viagem.ponto_inicial_tipo === 'ponto_embarque') {
                pontoInicial = await read('pontos_embarque', `id = ${viagem.ponto_inicial_id}`);
            }// se ponto inicial for "escola" 
            else if (viagem.ponto_inicial_tipo === 'escola') {
                pontoInicial = await read('escolas', `id = ${viagem.ponto_inicial_id}`);
            }
            // mesmo processo p/ ponto final da viagem
            if (viagem.ponto_final_tipo === 'ponto_embarque') {
                pontoFinal = await read('pontos_embarque', `id = ${viagem.ponto_final_id}`);
            } else if (viagem.ponto_final_tipo === 'escola') {
                pontoFinal = await read('escolas', `id = ${viagem.ponto_final_id}`);
            }
            //Se os dois pontos existem, adiciona um objeto ao array c/ id da viagem, id do aluno e lat/lng do ponto inicial e final 
            if (pontoInicial && pontoFinal) {
                viagens.push({
                    viagemId: viagem.id,
                    alunoId: vinculacao.aluno_id,
                    pontoInicial: { lat: parseFloat(pontoInicial.latitude), lng: parseFloat(pontoInicial.longitude) },
                    pontoFinal: { lat: parseFloat(pontoFinal.latitude), lng: parseFloat(pontoFinal.longitude) }
                });
            } else {
                console.error('Ponto inicial ou final inválidos para viagem:', viagem.id);
            }
        }
    }
    // retorna o array com viagens encontradas ou null se vazio
    return viagens.length > 0 ? viagens : null;
}

async function buscarViagensDoAluno(alunoId) {
    const query = `
    SELECT 
      viagens.data_viagem,
      viagens.hora_saida,
      viagens.hora_chegada_prevista,
      
      CASE
        WHEN viagens.ponto_inicial_tipo = 'ponto_embarque' THEN
          (SELECT pontos_embarque.endereco FROM pontos_embarque WHERE pontos_embarque.id = viagens.ponto_inicial_id)
        WHEN viagens.ponto_inicial_tipo = 'escola' THEN
          (SELECT escolas.endereco FROM escolas WHERE escolas.id = viagens.ponto_inicial_id)
        ELSE
          'Endereço não encontrado'
      END AS endereco_de_ida,
      
      CASE
        WHEN viagens.ponto_final_tipo = 'ponto_embarque' THEN
          (SELECT pontos_embarque.endereco FROM pontos_embarque WHERE pontos_embarque.id = viagens.ponto_final_id)
        WHEN viagens.ponto_final_tipo = 'escola' THEN
          (SELECT escolas.endereco FROM escolas WHERE escolas.id = viagens.ponto_final_id)
        ELSE
          'Endereço não encontrado'
      END AS endereco_de_destino,
      
      CASE
        WHEN viagens.data_viagem = CURDATE() 
             AND CURTIME() BETWEEN viagens.hora_saida AND viagens.hora_chegada_prevista THEN
          'em andamento'
        WHEN viagens.data_viagem = CURDATE() 
             AND CURTIME() < viagens.hora_saida THEN
          'ainda hoje'
        WHEN viagens.data_viagem = CURDATE() 
             AND CURTIME() > viagens.hora_chegada_prevista THEN
          'já aconteceu'
        ELSE
          'fora do período analisado'
      END AS status_viagem
      
    FROM viagens
    INNER JOIN alunos_viagens ON alunos_viagens.viagem_id = viagens.id
    WHERE alunos_viagens.aluno_id = ?
      AND viagens.data_viagem >= CURDATE()
    ORDER BY viagens.data_viagem, viagens.hora_saida;
  `;

    const viagens = await readQuery(query, [alunoId]);
    return viagens;
}

export { obterDadosDaViagemDoAluno, obterDadosDaViagemDoMotorista, obterDadosDasViagensDoResponsavel, buscarViagensDoAluno };