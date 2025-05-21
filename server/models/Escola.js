import { readAll} from '../config/database.js';

const listarAlunos = async ()=>{
    try{
       const condicao = "tipo = 'aluno'";
return await readAll('usuarios', condicao);//nome da tabela
    }catch(err){
        console.error('Erro ao listar alunos!', err);
        throw err;
    }};

    export {listarAlunos}
