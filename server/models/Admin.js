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

export { registrarUsuario };