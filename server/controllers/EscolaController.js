import { listarAlunos } from "../models/Escola.js";

const listarAlunosController = async (req,res)=>{
    const {tipo} = req.params
    try {
        const alunos = await listarAlunos(tipo);
        res.status(200).json(alunos);
    } catch (err) {
        console.error("Erro ao listar os alunos!!!", err);
        res.status(500).json({ mensagem: 'Erro ao listar alunos!!!' });
    }
}

export {listarAlunosController}