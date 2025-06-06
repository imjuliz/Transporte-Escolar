import { verVeiculo, verViagensVeiculos } from "../models/veiculos.js";

const verVeiculoController = async (req, res) => {
    const veiculoId = req.session.usuario?.id;

    try {
        const rows = await verVeiculo(veiculoId);

        res.status(200).json(rows)
    } catch (err) {
        console.error('Erro ao pegar informações do veiculo!!!', err)
        res.status(500).json({ mensagem: 'não foi possivel pegar informações do veiculo!!!' })
    }
}

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

export { verVeiculoController, obterInformacoesviagensController } 