import { verVeiculo } from "../models/veiculos.js";
const verVeiculoController = async (req, res) => {
    try {
        const veiculoInfo = await verVeiculo();
        res.status(200).json(veiculoInfo)
    } catch (err) {
        console.error('Erro ao pegar informações do veiculo!!!', err)
        res.status(500).json({ mensagem: 'não foi possivel pegar informações do veiculo!!!' })
    }
}
export { verVeiculoController } 