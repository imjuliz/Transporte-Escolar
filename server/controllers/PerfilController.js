import { obterDadosDoUsuario, editarPerfil } from '../models/Perfil.js';
import session from "express-session";

// obter dados do perfil do usuario
const obterPerfilUsuario = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            req.session.save(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        const { tipo, id } = req.session.usuario;
        console.log("obterPerfilUsuario: ", req.session);

        const dados = await obterDadosDoUsuario(tipo, id);

        if (!dados) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.status(200).json(dados);

    } catch (erro) {
        console.error('Erro ao obter dados do perfil:', erro);
        res.status(500).json({ erro: 'Erro ao obter dados do perfil.' });
    }
};


// busca a escola pelo id
// export const buscarEscolas = async (req, res) => {
//     const { id } = req.query;

//     if (!id || !isNaN(id)) {
//       return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório e deve ser um numero.' });
//     }

//     try {
//       const escolas = await buscarEscolasPorNome(id);
//       res.json(escolas);
//     } catch (erro) {
//       console.error(erro);
//       res.status(500).json({ erro: 'Erro ao buscar escolas.' });
//     }
//   };

// editar informaçoes do perfil
const editarPerfilController = async (req, res) => {
    console.log("editarPerfilController: ", req.session)
    try {
        const { cpf, email, senha } = req.body;
        const { tipo, id } = req.session.usuario;
        // let fotoPerfil = null;

        if (req.file) {
            fotoPerfil = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }

        //armazena no arquivo json as info
        const atualizacoes = {
            cpf: cpf,
            email: email,
            senha: senha,
            // foto: fotoPerfil
        };

        await editarPerfil(tipo, id, atualizacoes);

        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!!!', email });
    } catch (err) {
        console.error('Erro ao atualizar perfil!!!', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar perfil!!!' });
    }
};


//upload foto
const uploadFotoPerfil = async (req, res) => {
    try {
        const { tipo, id } = req.session.usuario;
        // criar a pasta fotoPerfil dentro de /public/img
        const filePath = ` /img/fotosfotoPerfil/${req.file.filename}`;

        await editarPerfil(tipo, id, { fotoPerfil: filePath });
        res.status(200).json({ mensagem: 'Foto enviada com sucesso!', url: filePath });
    } catch (err) {
        console.error('Erro no upload da imagem:', err);
        res.status(500).json({ mensagem: 'Erro ao fazer upload da imagem.' });
    }
};

export { obterPerfilUsuario, editarPerfilController, uploadFotoPerfil };

