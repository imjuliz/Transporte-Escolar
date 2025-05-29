import { deletarPerfil } from "../models/deletar.js";

const deletarPerfilController = async(req,res)=>{
    try{
        const {email} = req.body
        await deletarPerfil(email);
        res.status(200).json({mensagem: 'Usuário  deletado com sucesso!!!'})
    }catch(err){
        console.error('Erro ao deletar usuário!!!', err);
        res.status(500).json({mensagem: 'Erro ao deletar usuário!!!'})
    }
}
export {deletarPerfilController}