//controllers:  cuida da lógica, decide o que fazer com os dados e responde às requisições. nesse caso, estão as funções do administrador

import { registrarUsuario } from "../models/Admin.js";

const registrarUsuarioController = async (req, res)=>{
    try{
        const {cpf, email, senha, tipo } = req.body;

        //armazena num arquivo json as informações que vamos enviar
        const usuarioData ={
            cpf : cpf,
            email: email,
            senha: senha,
            tipo: tipo
        }

        const usuarioId = await registrarUsuario(usuarioData);
        res.status(201).json({mensagem: 'Usuário criado com sucesso!', usuarioId});

    } catch (err){
        console.error('Erro ao registrar usuário: ', err);
        res.status(500).json({mensagem: 'Erro ao registrar usuario'});
    }
}

export { registrarUsuarioController }