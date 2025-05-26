import {update} from '../config/database.js';

// const editarPerfil = async (email,data)=>{
//     try{
//         return await update('usuarios', data, email);
//     }catch(err){
//         console.error('Erro ao atualizar informações do perfil!!!', err)
//     }
// }
const editarPerfil = async (email, data) => {
    try {
        const where = `email = '${email}'`;
        return await update('usuarios', data, where);
    } catch (err) {
        console.error('Erro ao atualizar informações do perfil!!!', err);
        throw err;
    }
}
export {editarPerfil}