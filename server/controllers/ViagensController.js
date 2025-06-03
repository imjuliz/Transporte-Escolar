import { obterDadosDaViagemDoAluno, obterDadosDaViagemDoMotorista, obterDadosDasViagensDoResponsavel } from '../models/Viagens.js'

async function obterViagemPorUsuario(req, res) {
    try {
        const { tipo, id } = req.params;

        switch (tipo) {
            case 'aluno': {
                const dadosAluno = await obterDadosDaViagemDoAluno(id);
                if (!dadosAluno) return res.status(404).json({ erro: 'Viagem não encontrada para o aluno' });
                return res.json({ tipo, dados: dadosAluno });
            }
            case 'motorista': {
                const dadosMotorista = await obterDadosDaViagemDoMotorista(id);
                if (!dadosMotorista) return res.status(404).json({ erro: 'Viagem não encontrada para o motorista' });
                return res.json({ tipo, dados: dadosMotorista });
            }
            case 'responsavel': {
                const dadosResponsavel = await obterDadosDasViagensDoResponsavel(id);
                if (!dadosResponsavel) return res.status(404).json({ erro: 'Viagens não encontradas para o responsável' });
                return res.json({ tipo, dados: dadosResponsavel });
            }
            default:
                return res.status(400).json({ erro: 'Tipo de usuário inválido' });
        }
    } catch (error) {
        console.error('Erro ao obter viagem:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export { obterViagemPorUsuario };
