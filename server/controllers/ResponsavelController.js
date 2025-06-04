import { verFilhos } from '../models/Responsavel.js';

const obterInformacoesFilhosController = async (req, res) => {
    try {
        const responsavelId = req.session.usuario?.id;
        console.log('responsavelId:', responsavelId);  // <-- aqui
        if (!responsavelId) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }
        const infoFilhos = await verFilhos(responsavelId);
        if (!infoFilhos || infoFilhos.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum filho vinculado encontrado.' });
        }
        return res.status(200).json({ infoFilhos });
    } catch (err) {
        console.error('Erro ao obter informações de seu(s) filho(s)', err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

export { obterInformacoesFilhosController }