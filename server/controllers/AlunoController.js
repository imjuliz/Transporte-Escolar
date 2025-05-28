import { read } from "../config/database.js";

// export const obterDadosAluno = async (req, res) => {
//     try {
//         if (!req.session.usuario || req.session.usuario.tipo !== 'Aluno') {
//           return res.status(401).json({ mensagem: "Faça login primeiro." });
//         }
    
//         const email = req.session.usuario.email;
    
//         const [aluno] = await read("alunos", `email = '${email.replace(/'/g, "''")}'`);
//         if (!aluno) {
//           return res.status(404).json({ mensagem: "Aluno não encontrado." });
//         }
    
//         res.json(aluno);
//       } catch (err) {
//         console.error("Erro ao buscar perfil do aluno:", err);
//         res.status(500).json({ mensagem: "Erro ao buscar perfil do aluno." });
//       }
// };

export const obterDadosAluno = async (req, res) => {
    try {
        if (!req.session.usuario || req.session.usuario.tipo !== 'Aluno') {
            return res.status(401).json({ mensagem: "Faça login primeiro." });
        }

        const email = req.session.usuario.email;

        const resultado = await read("alunos", `email = '${email.replace(/'/g, "''")}'`);
        
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ mensagem: "Aluno não encontrado." });
        }

        const aluno = resultado[0]; // Garantir que seja um objeto válido

        res.json(aluno);
    } catch (err) {
        console.error("Erro ao buscar perfil do aluno:", err);
        res.status(500).json({ mensagem: "Erro ao buscar perfil do aluno." });
    }
};
