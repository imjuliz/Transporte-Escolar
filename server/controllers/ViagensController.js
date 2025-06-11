import { obterDadosDaViagemDoAluno, obterDadosDaViagemDoMotorista, obterDadosDasViagensDoResponsavel, buscarViagensDoAluno } from '../models/Viagens.js'

// async function obterViagemPorUsuario(req, res) {
//   try {
//       const usuario = req.session.usuario;
//       if (!usuario || !usuario.id || !usuario.tipo) {
//           return res.status(401).json({ erro: 'Usuário não autenticado' });}
//       const { id, tipo } = usuario;
//       switch (tipo) {
//           case 'aluno': {
//               const dadosAluno = await obterDadosDaViagemDoAluno(id);
//               if (!dadosAluno) return res.status(404).json({ erro: 'Viagem não encontrada para o aluno' });
//               return res.json({ tipo, dados: dadosAluno });
//           }case 'motorista': {
//               const dadosMotorista = await obterDadosDaViagemDoMotorista(id);
//               if (!dadosMotorista) return res.status(404).json({ erro: 'Viagem não encontrada para o motorista' });
//               return res.json({ tipo, dados: dadosMotorista });}
//           case 'responsavel': {
//               const dadosResponsavel = await obterDadosDasViagensDoResponsavel(id);
//               if (!dadosResponsavel) return res.status(404).json({ erro: 'Viagens não encontradas para o responsável' });
//               return res.json({ tipo, dados: dadosResponsavel });
//           } default:
//               return res.status(400).json({ erro: 'Tipo de usuário inválido' });
//       } } catch (error) {
//       console.error('Erro ao obter viagem:', error);
//       return res.status(500).json({ erro: 'Erro interno do servidor' }); }}


//OBTER VIAGEM POR USUÁRIO --------------------------------------------------------
async function obterViagemPorUsuario(req, res) {

  try {
    const usuario = req.session.usuario;
    console.log('Usuário na sessão (viagens):', usuario);

    if (!usuario || !usuario.id || !usuario.tipo) {
      console.error('Usuário não autenticado ou dados faltando');
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const { id, tipo } = usuario;
    console.log('ID e tipo:', id, tipo);

    if (tipo === 'aluno') {
      const dadosAluno = await obterDadosDaViagemDoAluno(id);
      console.log('Dados do aluno:', dadosAluno);
      if (!dadosAluno) {
        return res.status(404).json({ erro: 'Nenhuma viagem ativa para o aluno' });
      }

      const { viagemId, sentido, ponto, escola } = dadosAluno;

      let origem, destino;
      if (sentido === 'ida') {
        origem = ponto;
        destino = escola;
      } else if (sentido === 'volta') {
        origem = escola;
        destino = ponto;
      } else {
        return res.status(400).json({ erro: 'Sentido da viagem inválido' });
      }

      return res.json({
        tipo,
        dados: {
          viagemId,
          origem,
          destino
        }});
    } else if (tipo === 'motorista') {
      const dadosMotorista = await obterDadosDaViagemDoMotorista(id);
      console.log('Dados do motorista:', dadosMotorista);
      if (!dadosMotorista) {
        return res.status(404).json({ erro: 'Nenhuma viagem ativa para o motorista' });
      }
      return res.json({ tipo, dados: dadosMotorista });

    } else if (tipo === 'responsavel') {
      const viagens = await obterDadosDasViagensDoResponsavel(id);
      console.log('Viagens encontradas para responsável:', viagens);
      if (!viagens || viagens.length === 0) {
        return res.status(404).json({ erro: 'Nenhuma viagem ativa para os alunos vinculados' });
      }
      return res.json({ infoFilhos: viagens });
    } else {
      console.error('Tipo de usuário desconhecido:', tipo);
      return res.status(400).json({ erro: 'Tipo de usuário desconhecido' });
    } } catch (erro) {
    console.error('Erro ao obter viagem:', erro);
    return res.status(500).json({ erro: 'Erro ao buscar dados da viagem' });
  }};

//LISTAR VIAGENS DO ALUNO --------------------------------------------------------
async function listarViagensDoAluno(req, res) {
  try {
    const alunoId = req.session.usuario;
    if (!alunoId) {
      return res.status(400).json({ error: 'ID do aluno é obrigatório.' });}
    const viagens = await buscarViagensDoAluno(alunoId);
    return res.status(200).json(viagens);
  } catch (error) {
    console.error('Erro ao listar viagens do aluno:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }};

export { obterViagemPorUsuario, listarViagensDoAluno };
