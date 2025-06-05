import { read } from "../config/database.js";

const verVeiculo = async(veiculoId)=>{
    try{
        const where = `motorista_id = ${veiculoId} AND id > 4`;
        return await read('veiculos', where)
    }
    catch(err){
        console.error('Erro ao buscar veiculos!!!',err);
        throw err;
    }
}
export{verVeiculo}