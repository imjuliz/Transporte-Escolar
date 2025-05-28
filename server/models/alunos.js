import { readAll2 } from "../config/database.js";

const verAlunos = async()=>{
    try{
        const where =  " tipo = 'aluno' " ;
        return await readAll2('usuarios ', where , 'email, cpf' )
    }catch(err){
        console.error('Erro ao listar os alunos!!!')
        throw err;
    }};
export {verAlunos}