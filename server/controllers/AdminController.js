//controllers:  cuida da lógica, decide o que fazer com os dados e responde às requisições. nesse caso, estão as funções do administrador

import { registrarUsuario, registrarVeiculos } from "../models/Admin.js";

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

const registrarVeiculosController = async (req, res)=>{
    try{
        const {motorista_cpf, fabricacao, placa, modelo, marca} = req.body;

        //armazena num arquivo json as informações que vamos enviar
        const veiculoData = {
            
            motorista_cpf: motorista_cpf,
            fabricacao: fabricacao,
            placa: placa,
            modelo: modelo,
            marca: marca
            
        }

        const veiculoId = await registrarVeiculos(veiculoData);
        res.status(201).json({mensagem: 'veículo registrado com sucesso!', veiculoId});
    }
    catch(err){
        console.error('Erro ao registrar veículo: ', err);
        res.status(500).json({mensagem: 'Erro ao registrar veículo'});
    }
}

export { registrarUsuarioController, registrarVeiculosController }