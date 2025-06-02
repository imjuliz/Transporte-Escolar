import { readAll2 } from "../config/database.js";

const verAlunos = async()=>{
    try{
        const where =  " escola_id=1 " ;
        return await readAll2('alunos ', where , 'nome, email, ponto_embarque_id' )
    }catch(err){
        console.error('Erro ao listar os alunos!!!')
        throw err;
    }};
export {verAlunos}