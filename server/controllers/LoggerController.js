// import { logger } from "../models/logger";

// const loggerController = async(req,res, next)=>{
//          const infos = {
//             dataLog : new Date(),
//             metodo : req.method,
//             url : req.url
//          }
//         try{
//        const [result]= await logger(infos);
//        res.status(201).json({mensagem: 'Registro inserido no logger com sucesso!!!'})
//     }catch(err){
//         console.error('Erro ao registrar no logger!!!', err);
//         res.status(500).json({mensagem:'Erro ao registrar no logger!!!'})
//     }
// }
// export {loggerController}