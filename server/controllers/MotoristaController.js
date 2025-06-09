import { verAlunos, verDadosEscola, verVeiculo, verViagensVeiculos, mensagensPorMotorista } from "../models/Motorista.js";

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

export { verAlunosController, verDadosEscolaController, verVeiculoController, obterInformacoesviagensController, mensagensParaMotorista } 