import { create2 } from "../config/database.js";


const adicionarIncidente = async (remetente)=>{
// try{
// req.body = [remetente = remetente]
//     return await create2('incidentes', remetente)

const adicionarIncidente = async (dados) => {
    try {
        return await create2('incidentes', dados)
    }
    catch (err) {
        console.error('Erro ao adicionar incidente', err);
        throw err;
    }
}}

export { adicionarIncidente };