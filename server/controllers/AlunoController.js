import { historicoAlunoViagens, verMotorista } from '../models/Aluno.js';

const verMotoristaController = async(req,res)=>{
    try{
        const aluno_id = req.session.usuario?.id;
        if(!aluno_id){
            return res.status(401).json({erro: 'Aluno não autenticado!!!'});
        }
        const perfil = await verMotorista(aluno_id);

        if (!Array.isArray(perfil)) {
          return res.json([]);
        }
        res.json(perfil);
    }catch(err){
        console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
}

export{verMotoristaController }
