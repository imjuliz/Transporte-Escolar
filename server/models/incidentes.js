import { create } from "../config/database.js";

const adicionarIncidente = async (dados)=>{
try{
    return await create('incidentes', dados)
}
catch(err){
console.error('Erro ao adicionar incidente', err);
throw err;
}}

export {adicionarIncidente};