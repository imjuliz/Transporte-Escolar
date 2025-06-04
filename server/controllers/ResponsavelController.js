import { verFilhos } from '../models/Responsavel.js'

const obterInformacoesFilhosController = async (req, res) => {
    try {
        const responsavelId = req.session.usuario?.id;
        const infoFilhos = await verFilhos(responsavelId);
        if (!infoFilhos) {
            return res.status(404).json({ mensagem: 'Nenhum filho vinculado encontrado.' });
        }
        return res.status(200).json({ infoFilhos });
    } catch (err) {
        console.error('Erro ao obter informações de seu(s) filho(s)', err);
        throw err;
    }
}

export { obterInformacoesFilhosController }