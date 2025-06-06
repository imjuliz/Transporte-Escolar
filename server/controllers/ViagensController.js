import { obterDadosDaViagemDoAluno, obterDadosDaViagemDoMotorista, obterDadosDasViagensDoResponsavel, buscarViagensDoAluno } from '../models/Viagens.js'

async function obterViagemPorUsuario(req, res) {
  try {
      const usuario = req.session.usuario;

      if (!usuario || !usuario.id || !usuario.tipo) {
          return res.status(401).json({ erro: 'Usuário não autenticado' });
      }

      const { id, tipo } = usuario;

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

async function listarViagensDoAluno(req, res) {
  try {
    const alunoId = req.params.alunoId;
    if (!alunoId) {
      return res.status(400).json({ error: 'ID do aluno é obrigatório.' });
    }

    const viagens = await buscarViagensDoAluno(alunoId);
    return res.status(200).json(viagens);
  } catch (error) {
    console.error('Erro ao listar viagens do aluno:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export { obterViagemPorUsuario, listarViagensDoAluno };
