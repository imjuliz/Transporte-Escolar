import { verVeiculo } from "../models/veiculos.js";

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
export { verVeiculoController } 