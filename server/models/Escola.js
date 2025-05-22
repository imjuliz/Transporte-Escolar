import {read} from '../config/database.js';

const listarAlunos = async ()=>{
    try{
       const condicao = "tipo = 'aluno'";
return await read('usuarios', condicao);//nome da tabela
    }catch(err){
        console.error('Erro ao listar alunos!', err);
        throw err;
    }};

    export {listarAlunos}
