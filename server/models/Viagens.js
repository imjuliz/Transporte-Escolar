import { read, readAll, readQuery } from '../config/database.js';

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

  if (!ponto || !escola) {
    console.error('Ponto de embarque ou escola não encontrados');
    return null;
  }

  // Usa o campo tipo_viagem para definir origem e destino
  const tipoViagem = (viagem.tipo_viagem || '').trim().toLowerCase();
  console.log('Tipo da viagem:', tipoViagem);

  let origem, destino;
  if (tipoViagem === 'ida') {
    origem = { lat: parseFloat(ponto.latitude), lng: parseFloat(ponto.longitude) };
    destino = { lat: parseFloat(escola.latitude), lng: parseFloat(escola.longitude) };
  } else if (tipoViagem === 'volta') {
    origem = { lat: parseFloat(escola.latitude), lng: parseFloat(escola.longitude) };
    destino = { lat: parseFloat(ponto.latitude), lng: parseFloat(ponto.longitude) };
  } else {
    console.error('Tipo de viagem inválido:', viagem.tipo_viagem);
    return null; // evita lançar erro e quebra a execução
  }

  return {
    viagemId: viagem.id,
    sentido: viagem.tipo_viagem,
    ponto: origem,
    escola: destino
  };
}

async function obterDadosDaViagemDoMotorista(motoristaId) {
  const motorista = await read('motoristas', `id = ${motoristaId}`);
  console.log('Motorista encontrado:', motorista);

  if (!motorista) {
    console.error('Motorista não encontrado');
    return null;
  }

  const veiculo = await read('veiculos', `motorista_id = ${motoristaId}`);
  console.log('Veículo vinculado ao motorista:', veiculo);

  if (!veiculo) {
    console.error('Motorista sem veículo vinculado');
    return null;
  }

  const veiculoId = veiculo.id;
  const condicao = `veiculo_id = ${veiculoId} AND status IN ('agendada', 'em_andamento')`;
  const viagens = await readAll('viagens', condicao);
  console.log('Viagens encontradas:', viagens);

  if (!viagens || viagens.length === 0) {
    console.error('Nenhuma viagem encontrada para o motorista ou veículo');
    return null;
  }

  // Converter hora para minutos
  function horaParaMinutos(hora) {
    const [h, m, s] = hora.split(':').map(Number);
    return h * 60 + m + Math.floor(s / 60);
  }

  const agora = new Date();
  const horaAtualMinutos = agora.getHours() * 60 + agora.getMinutes();

  // Filtrar viagem no horário atual
  const viagem = viagens.find(v => {
    const inicio = horaParaMinutos(v.hora_saida);
    const fim = horaParaMinutos(v.hora_chegada_prevista);
    return horaAtualMinutos >= inicio && horaAtualMinutos <= fim;
  });

  console.log('Viagem selecionada:', viagem);

  if (!viagem) {
    console.error('Nenhuma viagem ativa no horário atual');
    return null;
  }

  let origem, destino;

  if (viagem.ponto_inicial_tipo === 'ponto_embarque') {
    origem = await read('pontos_embarque', `id = ${viagem.ponto_inicial_id}`);
  } else if (viagem.ponto_inicial_tipo === 'escola') {
    origem = await read('escolas', `id = ${viagem.ponto_inicial_id}`);
  }

  if (viagem.ponto_final_tipo === 'ponto_embarque') {
    destino = await read('pontos_embarque', `id = ${viagem.ponto_final_id}`);
  } else if (viagem.ponto_final_tipo === 'escola') {
    destino = await read('escolas', `id = ${viagem.ponto_final_id}`);
  }

  if (!origem || !destino) {
    console.error('Origem ou destino não encontrados');
    return null;
  }

  return {
    viagemId: viagem.id,
    origem: {
      lat: parseFloat(origem.latitude),
      lng: parseFloat(origem.longitude)
    },
    destino: {
      lat: parseFloat(destino.latitude),
      lng: parseFloat(destino.longitude)
    }
  };
}

// async function obterDadosDasViagensDoResponsavel(responsavelId) {
//     const responsavelIdInt = parseInt(responsavelId, 10);
//     if (isNaN(responsavelIdInt)) {
//         console.error('ID de responsável inválido:', responsavelId);
//         return null;
//     }

//     const alunosVinculados = await readAll('responsaveis_alunos', `responsavel_id = ${responsavelIdInt}`);
//     if (!alunosVinculados || alunosVinculados.length === 0) {
//         console.error('O usuário não possui alunos vinculados');
//         return null;
//     }

//     const viagens = [];

//     for (const vinculacao of alunosVinculados) {
//         const sql = `
//             SELECT viagens.* FROM alunos_viagens
//             JOIN viagens ON alunos_viagens.viagem_id = viagens.id
//             WHERE alunos_viagens.aluno_id = ?
//               AND viagens.status IN ('agendada', 'em_andamento')
//               AND TIMESTAMP(CONCAT(viagens.data_viagem, ' ', viagens.hora_saida)) <= CURRENT_TIMESTAMP()
//               AND TIMESTAMP(CONCAT(viagens.data_viagem, ' ', viagens.hora_chegada_prevista)) >= CURRENT_TIMESTAMP()
//         `;

//         const params = [vinculacao.aluno_id];
//         const viagensAluno = await readQuery(sql, params);
//         console.log(`Viagens ativas para aluno ${vinculacao.aluno_id}:`, viagensAluno);

//         for (const viagem of viagensAluno) {
//             let pontoInicial = null, pontoFinal = null;

//             if (viagem.ponto_inicial_tipo === 'ponto_embarque') {
//                 pontoInicial = await read('pontos_embarque', `id = ${viagem.ponto_inicial_id}`);
//             } else if (viagem.ponto_inicial_tipo === 'escola') {
//                 pontoInicial = await read('escolas', `id = ${viagem.ponto_inicial_id}`);
//             }

//             if (viagem.ponto_final_tipo === 'ponto_embarque') {
//                 pontoFinal = await read('pontos_embarque', `id = ${viagem.ponto_final_id}`);
//             } else if (viagem.ponto_final_tipo === 'escola') {
//                 pontoFinal = await read('escolas', `id = ${viagem.ponto_final_id}`);
//             }

//             if (pontoInicial && pontoFinal) {
//                 viagens.push({
//                     viagemId: viagem.id,
//                     alunoId: vinculacao.aluno_id,
//                     pontoInicial: {
//                         lat: parseFloat(pontoInicial.latitude),
//                         lng: parseFloat(pontoInicial.longitude)
//                     },
//                     pontoFinal: {
//                         lat: parseFloat(pontoFinal.latitude),
//                         lng: parseFloat(pontoFinal.longitude)
//                     }
//                 });
//             } else {
//                 console.error('Ponto inicial ou final inválido na viagem:', viagem.id);
//             }
//         }
//     }

//     return viagens.length > 0 ? viagens : null;
// }

async function obterDadosDasViagensDoResponsavel(responsavelId) {
  const responsavelIdInt = parseInt(responsavelId, 10);
  if (isNaN(responsavelIdInt)) {
    console.error('ID de responsável inválido:', responsavelId);
    return null;
  }

  const alunosVinculados = await readAll('responsaveis_alunos', `responsavel_id = ${responsavelIdInt}`);
  if (!alunosVinculados || alunosVinculados.length === 0) {
    console.error('O usuário não possui alunos vinculados');
    return null;
  }

  const resultado = [];

  for (const vinculacao of alunosVinculados) {
    const alunoId = vinculacao.aluno_id;

    const aluno = await read('alunos', `id = ${alunoId}`);
    if (!aluno) {
      console.error('Aluno não encontrado com id', alunoId);
      continue;
    }

    const sql = `
      SELECT viagens.* FROM alunos_viagens
      JOIN viagens ON alunos_viagens.viagem_id = viagens.id
      WHERE alunos_viagens.aluno_id = ?
        AND viagens.status IN ('agendada', 'em_andamento')
        AND TIMESTAMP(CONCAT(viagens.data_viagem, ' ', viagens.hora_saida)) <= CURRENT_TIMESTAMP()
        AND TIMESTAMP(CONCAT(viagens.data_viagem, ' ', viagens.hora_chegada_prevista)) >= CURRENT_TIMESTAMP()
    `;
    const params = [alunoId];
    const viagensAluno = await readQuery(sql, params);

    const viagensFormatadas = [];

    for (const viagem of viagensAluno) {
      let pontoInicial = null, pontoFinal = null;

      if (viagem.ponto_inicial_tipo === 'ponto_embarque') {
        pontoInicial = await read('pontos_embarque', `id = ${viagem.ponto_inicial_id}`);
      } else if (viagem.ponto_inicial_tipo === 'escola') {
        pontoInicial = await read('escolas', `id = ${viagem.ponto_inicial_id}`);
      }

      if (viagem.ponto_final_tipo === 'ponto_embarque') {
        pontoFinal = await read('pontos_embarque', `id = ${viagem.ponto_final_id}`);
      } else if (viagem.ponto_final_tipo === 'escola') {
        pontoFinal = await read('escolas', `id = ${viagem.ponto_final_id}`);
      }

      if (pontoInicial && pontoFinal) {
        viagensFormatadas.push({
          viagemId: viagem.id,
          pontoInicial: {
            lat: parseFloat(pontoInicial.latitude),
            lng: parseFloat(pontoInicial.longitude),
          },
          pontoFinal: {
            lat: parseFloat(pontoFinal.latitude),
            lng: parseFloat(pontoFinal.longitude),
          },
          hora_saida: viagem.hora_saida,
          hora_chegada_prevista: viagem.hora_chegada_prevista,
          status: viagem.status,
          data_viagem: viagem.data_viagem,
          // Outros campos da viagem que desejar enviar
        });
      } else {
        console.error('Ponto inicial ou final inválido na viagem:', viagem.id);
      }
    }

    resultado.push({
      id_aluno: aluno.id,
      nome_aluno: aluno.nome,
      viagens: viagensFormatadas
    });
  }

  return resultado;
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