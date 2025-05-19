import { create } from "../config/database.js";

//funcao que vai registrar os usuarios

const registrarUsuario = async () =>{
    try{
        return await create('usuarios');
    }
    catch(err){
        console.error('Erro ao registrar usuário: ', err);
        throw err;
    }
}

export { registrarUsuario };