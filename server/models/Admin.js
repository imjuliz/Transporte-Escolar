import { create } from "../config/database.js";

//funcao que vai registrar os usuarios

const registrarUsuario = async (usuarioData) =>{
    try{
        return await create('usuarios', usuarioData);
    }
    catch(err){
        console.error('Erro ao registrar usuário: ', err);
        throw err;
    }
}

//funcao que vai registrar veiculos

const registrarVeiculos = async (veiculoData) =>{
    try{
        return await create ('veiculos', veiculoData);
        
    } catch (error){
        console.error('Erro ao criar livro: ', error);
        throw error;
    }
}

export { registrarUsuario, registrarVeiculos};