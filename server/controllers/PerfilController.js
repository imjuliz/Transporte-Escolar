import { obterDadosDoUsuario, editarPerfil, editarPerfilMotorista } from '../models/Perfil.js';
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

        // Adiciona o tipo ao objeto retornado
        const resposta = { ...dados, tipo };

        res.status(200).json(resposta);

    } catch (erro) {
        console.error('Erro ao obter dados do perfil:', erro);
        res.status(500).json({ erro: 'Erro ao obter dados do perfil.' });
    }
};

// busca a escola pelo id
export const buscarEscolas = async (req, res) => {
    const { id } = req.query;

    if (!id || !isNaN(id)) {
      return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório e deve ser um numero.' });
    }
    try {
      const escolas = await buscarEscolasPorNome(id);
      res.json(escolas);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar escolas.' });
} };

const editarPerfilController = async (req, res) => {
  try {
    const id = req.session.usuario.id;
    const tipo = req.session.usuario.tipo;

    const { email, telefone } = req.body;
    

    const atualizacoes = {};
    if (email !== undefined && email !== "") atualizacoes.email = email;
    if (telefone !== undefined && telefone !== "") atualizacoes.telefone = telefone;

    if (Object.keys(atualizacoes).length === 0) {
      return res.status(400).json({ mensagem: 'Nenhum dado para atualizar.' });
    }

    await editarPerfil(tipo, id, atualizacoes);
    res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao atualizar perfil' });
  }
};

//editar pefil motorista
const editarPerfilMotoristaController = async (req, res) => {
  try {
    const id = req.session.usuario.id;
    const tipo = req.session.usuario.tipo;

    const { email, telefone, vencimento_habilitacao } = req.body;
    

    const atualizacoes = {};
    if (email !== undefined && email !== "") atualizacoes.email = email;
    if (telefone !== undefined && telefone !== "") atualizacoes.telefone = telefone;
    if(vencimento_habilitacao !== undefined && vencimento_habilitacao !="") atualizacoes.vencimento_habilitacao = vencimento_habilitacao

    if (Object.keys(atualizacoes).length === 0) {
      return res.status(400).json({ mensagem: 'Nenhum dado para atualizar.' });
    }

    await editarPerfilMotorista(tipo, id, atualizacoes);
    res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao atualizar perfil' });
  }
};

// upload da foto de perfil
const editarFotoPerfilController = async (req, res) => {
  try {
    const id = req.session.usuario.id;
    const tipo = req.session.usuario.tipo;

    if (!req.file) {
      return res.status(400).json({ mensagem: 'Nenhuma foto enviada.' });
    }

    const caminhoFoto = '/uploads/' + req.file.filename;

    await editarPerfil(tipo, id, { foto: caminhoFoto });

    res.status(200).json({ mensagem: 'Foto atualizada com sucesso!', foto: caminhoFoto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar foto' });
  }
};

export { obterPerfilUsuario, editarPerfilController, editarFotoPerfilController, editarPerfilMotoristaController };

