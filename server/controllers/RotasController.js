import rotaModel from '../models/Rotas.js';

async function listarRotas(req, res) {
  try {
    const rotas = await rotaModel.rotas();
    res.json(rotas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar rotas' });
  }
}

async function obterRota(req, res) {
  const id = parseInt(req.params.id);
  try {
    const rota = await rotaModel.rotaPorId(id);
    if (rota) res.json(rota);
    else res.status(404).json({ error: 'Rota não encontrada' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter rota' });
  }
}

async function criarRota(req, res) {
  try {
    const novaRota = await rotaModel.criarRota(req.body);
    res.status(201).json({ id: novaRota });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar rota' });
  }
}

async function atualizarRota(req, res) {
  const id = parseInt(req.params.id);
  try {
    const linhasAfetadas = await rotaModel.atualizarRota(id, req.body);
    if (linhasAfetadas > 0)
      res.json({ message: 'Rota atualizada com sucesso' });
    else
      res.status(404).json({ error: 'Rota não encontrada para atualização' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar rota' });
  }
}

async function deletarRota(req, res) {
  const id = parseInt(req.params.id);
  try {
    const linhasAfetadas = await rotaModel.deletarRota(id);
    if (linhasAfetadas > 0)
      res.json({ message: 'Rota deletada com sucesso' });
    else
      res.status(404).json({ error: 'Rota não encontrada para deletar' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar rota' });
  }
}

export default { listarRotas, obterRota, criarRota, atualizarRota, deletarRota };