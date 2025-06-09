import { verAlunos, verDadosEscola, verVeiculo, verViagensVeiculos, mensagensPorMotorista, criarMotoristaMensagem, verAlunosPorVeiculo } from "../models/Motorista.js";

// ve os alunos que pegam o onibus
const verAlunosController = async (req, res) => {
    try {
        const listaDeAlunos = await verAlunos();
        res.status(200).json(listaDeAlunos)
    } catch (err) {
        console.error('Erro ao listar alunos!!!', err)
        res.status(500).json({ mensagem: 'não foi possivel listar os alunos!!!' })
    }
}

const verDadosEscolaController = async (req, res) => {
    try {
        const escolas = await verDadosEscola();
        res.json(escolas)
    } catch (error) {
        console.error('Erro ao listar todas as escols', error);
        res.status(500).json({ mensagem: "erro ao listar escolas!!!" })
    }
}

// ve os veiculos
const verVeiculoController = async (req, res) => {
  const motoristaId = req.session.usuario?.id;
  if (!motoristaId) {
    return res.status(400).json({ mensagem: 'Motorista não autenticado ou id inválido' });
  }
  try {
    const rows = await verVeiculo(motoristaId);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao pegar informações do veiculo!!!', err);
    res.status(500).json({ mensagem: 'não foi possivel pegar informações do veiculo!!!' });
  }
}

// obtem as informações das viagens do dia
const obterInformacoesviagensController = async (req, res) => {
    const motoristaId = req.session.usuario?.id;

    try {
        const rows = await verViagensVeiculos(motoristaId);

        const infoveiculos = [];
        const veiculosMap = {};

        for (const row of rows) {
            if (!veiculosMap[row.id_veiculo]) {
                veiculosMap[row.id_veiculo] = {
                    id_veiculo: row.id_veiculo,
                    nome_escola: row.nome_escola,
                    endereco_embarque: row.endereco_embarque,
                    viagens: []
                };
                infoveiculos.push(veiculosMap[row.id_veiculo]);
            }

            veiculosMap[row.id_veiculo].viagens.push({
                tipo: row.tipo_viagem,
                horaEmbarque: row.hora_saida,
                horaSaida: row.hora_chegada_prevista,
                data: row.data,
                status: row.status_viagem
            });
        }

        res.json({ infoveiculos });
    } catch (error) {
        console.error('Erro ao buscar informações do veículo:', error);
        res.status(500).json({ message: 'Erro ao buscar informações do veículo' });
    }
};

const obterInformacoesAlunosController = async (req, res) => {
  try {
      const motoristaId = req.session.usuario?.id;

      try {
          const rows = await verAlunosPorVeiculo(motoristaId);
          console.log('rows:', rows);

          
          const infoFilhos = [];//p agrupar os dados p/ aluno
          
          const alunosMap = {};// evita repetir alunos, agrupando as viagens de cada um

          // esse for percorre todas as linhas q vieram do banco (cada linha é uma viagem de um filho)
          for (const row of rows) {
              // se o aluno ainda NAO tiver nenhuma entrada, cria um objeto com os dados do aluno e uma lista vazia pras viagens dele
              if (!alunosMap[row.id_aluno]) {
                  alunosMap[row.id_aluno] = {
                      id_aluno: row.id_aluno,
                      nome_aluno: row.nome_aluno,
                  };
                  infoFilhos.push(alunosMap[row.id_aluno]);// add esse novo aluno criado no array infoFilhos
              }

              alunosMap[row.id_aluno].viagens.push({
                  tipo: row.tipo_viagem,
                  horaEmbarque: row.hora_saida,
                  horaSaída: row.hora_chegada_prevista,
                  data: row.data,
                  status: row.status_viagem
              });}

          res.json({ infoFilhos });

      } catch (error) {
          console.error('Erro ao buscar informações dos alunos:', error);
          res.status(500).json({ message: 'Erro ao buscar informaçoes dos alunos' });
      }} catch (error) {
      console.error('Erro geral no controller:', error);
      res.status(500).json({ message: 'Erro geral no controller' });
  }};

// motorista visualiza mensagens relacionadas aos alunos da viagem
const mensagensParaMotorista = async (req, res) => {
  try {
    const motoristaId = req.session.usuario?.id;
    console.log('motoristaId:', motoristaId);
    if (!motoristaId) {
      return res.status(401).json({ erro: 'Motorista não autenticado' });
    }

   const mensagens = await mensagensPorMotorista(motoristaId);

    if (!Array.isArray(mensagens)) {
      return res.json([]);
    }

    res.json(mensagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar mensagens' });
  }
};

const enviarMotoristaMensagemController = async (req, res) => {
  try {
    const motoristaId = req.session.usuario?.id;
    const { aluno_id, mensagem, motivo } = req.body;

    if (!motoristaId) {
      return res.status(401).json({ erro: 'Responsável não autenticado' });
    }

    await criarMotoristaMensagem({
      motorista_Id: motoristaId,
      aluno_id,
      tipo: motivo,
      conteudo: mensagem
    });

    res.status(201).json({ mensagem: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao enviar mensagem' });
  }
};

export { verAlunosController, verDadosEscolaController, verVeiculoController, obterInformacoesviagensController, mensagensParaMotorista, enviarMotoristaMensagemController, obterInformacoesAlunosController} 