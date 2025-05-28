import { deleteRecord } from "../config/database";

const deletarPerfil = async (email)=>{
    try{
        const where = `email = '${email}'`;
        return await deleteRecord('usuarios', where)
    }
    catch(err){
console.error('Erro ao deletar usuário!!!');
throw err;
    }
}
export {deletarPerfil}