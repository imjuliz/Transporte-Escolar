import Perfil from '../models/Perfil.js';

const obterPerfilUsuario = async (req, res) => {
    try {
        const { tipo, id } = req.session.usuario;

        const dados = await Perfil.obterDadosDoUsuario(tipo, id);

        if (!dados) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.status(200).json(dados);
    } catch (erro) {
        console.error('Erro ao obter dados do perfil:', erro);
        res.status(500).json({ erro: 'Erro ao obter dados do perfil.' });
    }
};

export default { obterPerfilUsuario };
