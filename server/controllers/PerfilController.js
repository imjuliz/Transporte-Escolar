import { obterDadosDoUsuario, editarPerfil } from '../models/Perfil.js';

// obter dados do perfil do usuario
const obterPerfilUsuario = async (req, res) => {
    try {
        const { tipo, id } = req.session.usuario;

        const dados = await obterDadosDoUsuario(tipo, id);
        console.log(dados)
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
    try {
        const { cpf, email, senha } = req.body;
        const { tipo, id } = req.session.usuario;

        //armazena no arquivo json as info
        const atualizacoes = {
            cpf: cpf,
            email: email,
            senha: senha,
        };

        await editarPerfil(tipo, id, atualizacoes);

        res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!!!', email });
    } catch (err) {
        console.error('Erro ao atualizar perfil!!!', err);
        res.status(500).json({ mensagem: 'Erro ao atualizar perfil!!!' });
    }
}


export { obterPerfilUsuario, editarPerfilController };

// subir foto de perfil
// const uploadFotoPerfil = async (req, res) => {
//     //   try {
//     //     const { tipo, id } = req.session.usuario;
//     // // criar a pasta fotoPerfil dentro de /public/img
//     //     const filePath = /img/fotosfotoPerfil/${req.file.filename};

//     //     await editarPerfil(tipo, id, { fotoPerfil: filePath });
//     //     res.status(200).json({ mensagem: 'Foto enviada com sucesso!', url: filePath });
//     //   } catch (err) {
//     //     console.error('Erro no upload da imagem:', err);
//     //     res.status(500).json({ mensagem: 'Erro ao fazer upload da imagem.' });
//     //   }

//     try{
//         const { tipo, id } = req.session.usuario;
//         let fotoPerfil = null;

//         // se existir o arquivo, ele pega o nome completo e armazena em capaPath
//         if (req.file){ 
//             fotoPerfil = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
//         }

//         // armazena num arquivo json as informações que vamos enviar
//         const atualizarFoto = {
//             foto: fotoPerfil
//         }

//         await atualizarLivro(tipo, id, atualizarFoto);
//         res.status(201).json({ mensagem: 'Foto atualizada com sucesso'});
//     } catch(err){
//         console.error('Erro ao atualizar foto: ', err);
//         res.status(500).json({ mensagem: 'Erro ao atualizar foto'})
//     }
// };



// export { uploadFotoPerfil };