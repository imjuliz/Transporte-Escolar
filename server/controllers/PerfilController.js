import { obterDadosDoUsuario, editarPerfilMotorista } from '../models/Perfil.js';

// obter dados do perfil do usuario
const obterPerfilUsuario = async (req, res) => {
    try {
        const { tipo } = req.session.usuario;
        const {id} = req.session.usuario;

        const dados = await obterDadosDoUsuario( tipo, id);

        if (!dados) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.status(200).json(dados);
    } catch (erro) {
        console.error('Erro ao obter dados do perfil:', erro);
        res.status(500).json({ erro: 'Erro ao obter dados do perfil.' });
    }
};

// editar informaçoes do perfil
const editarPerfilMotoristaController = async (req, res) => {
    try {
        const { cpf, email, senha } = req.body;

        //armazena no arquivo json as info
        const atualizacoes = {
            cpf: cpf,
            email: email,
            senha: senha,
        };

        await editarPerfilMotorista(email, atualizacoes);

        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!!!', email });
    } catch (err) {
        console.error('Erro ao atualizar perfil!!!', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar perfil!!!' });
    }
}

export { obterPerfilUsuario, editarPerfilMotoristaController };