import Viagens from '../models/Viagens.js';

export async function getViagemUsuario(req, res) {
  try {
    const usuarioLogado = req.session.usuario;

    // Verifica se o usuário está autenticado
    if (!usuarioLogado) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const { id } = usuarioLogado;
    const tipo = usuarioLogado.tipo?.toLowerCase().trim(); // 🔧 Normaliza o tipo

    console.log('Usuário logado:', { id, tipo }); // Debug útil

    switch (tipo) {
      case 'aluno': {
        const dados = await Viagens.obterDadosDaViagemDoAluno(id);
        if (!dados) return res.status(404).json({ erro: 'Viagem não encontrada para o aluno' });
        return res.json({ tipo, dados });
      }

      case 'motorista': {
        const viagens = await Viagens.obterViagensDoMotorista(id);
        return res.json({ tipo, viagens });
      }

      case 'responsavel': {
        const viagens = await Viagens.obterViagensDosFilhos(id);
        return res.json({ tipo, viagens });
      }

      case 'administrador': {
        return res.status(403).json({ erro: 'Administradores não possuem viagens associadas diretamente' });
      }

      default:
        return res.status(400).json({ erro: 'Tipo de usuário inválido' });
    }

  } catch (error) {
    console.error('Erro ao buscar rota da viagem do usuário:', error.stack || error);
    res.status(500).json({ erro: 'Erro ao buscar rota da viagem do usuário' });
  }

}
