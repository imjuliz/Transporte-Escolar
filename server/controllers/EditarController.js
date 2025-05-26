import {editarPerfil} from '../models/Editar.js'

const editarPerfilController = async (req, res) => {
    try {
        const { cpf, email, senha } = req.body;

        const atualizacoes = {
            cpf: cpf,
            email: email,
            senha: senha,
        };

        await editarPerfil(email, atualizacoes);

        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!!!', email });
    } catch (err) {
        console.error('Erro ao atualizar perfil!!!', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar perfil!!!' });
    }
}
export {editarPerfilController}