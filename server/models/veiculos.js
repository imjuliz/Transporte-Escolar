import { read } from "../config/database.js";

const verVeiculo = async(id)=>{
    try{

        const where = `motorista_id = ${id} AND motorista_id > 4`;
        return await read('veiculos', where)
    }
    catch(err){
        console.error('Erro ao buscar veiculos!!!',err);
        throw err;
    }
}
export{verVeiculo}