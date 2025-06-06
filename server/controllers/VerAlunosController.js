import { verAlunos, verDadosEscola } from "../models/alunos.js";
const verAlunosController = async (req, res) => {
    try {
        const listaDeAlunos = await verAlunos();
        res.status(200).json(listaDeAlunos)
    } catch (err) {
        console.error('Erro ao listar alunos!!!', err)
        res.status(500).json({ mensagem: 'não foi possivel listar os alunos!!!' })
    }
}

const verDadosEscolaController = async(req,res)=>{

    try{
       const escolas = await verDadosEscola();
       res.json(escolas)
    }catch(err){
console.error('Erro ao listar todas as escols', error);
res.status(500).json({mensagem: "erro ao listar escolas!!!"})
    }
}
export { verAlunosController, verDadosEscolaController } 