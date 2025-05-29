import { readAll2 } from "../config/database.js";

const verAlunos = async()=>{
    try{
        const where =  " veiculo_id=1 " ;
        return await readAll2('alunos ', where , 'nomeCompleto, nomeEscola, turno' )
    }catch(err){
        console.error('Erro ao listar os alunos!!!')
        throw err;
    }};
export {verAlunos}