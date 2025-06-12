import { historicoAlunoViagens, verMotorista, verVeiculo } from '../models/Aluno.js';

// logica pra ver o historico de viagens
const obterHistoricoViagensController = async (req, res) => {
  try {
    const alunoId = req.session.usuario?.id;
    const rows = await historicoAlunoViagens(alunoId);

    // agrupar por aluno (apesar de ser só um aluno, mantém padrão)
    const infoAlunos = [];
    const alunosMap = {};

    for (const row of rows) {
      if (!alunosMap[row.id_aluno]) {
        alunosMap[row.id_aluno] = {
          id_aluno: row.id_aluno,
          nome_aluno: row.nome_aluno,
          idade: row.idade,
          nome_escola: row.nome_escola,
          endereco_embarque: row.endereco_embarque,
          viagens: []
        };
        infoAlunos.push(alunosMap[row.id_aluno]);
      }

      alunosMap[row.id_aluno].viagens.push({
        tipo: row.tipo_viagem,
        horaEmbarque: row.hora_saida,
        horaSaida: row.hora_chegada_prevista,
        data: row.data,
        status: row.status_viagem,
        nome_motorista: row.nome_motorista
      });
    }

    res.json({ infoAlunos });

  } catch (error) {
    console.error('Erro ao buscar viagens do aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar viagens do aluno' });
  }
};

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
    }catch(error){
        console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
}

const alunoVerVeiculoController = async (req, res) => {
  try {
    const aluno_id = req.session.usuario?.id;
    if (!aluno_id) {
      return res.status(401).json({ erro: 'Aluno não autenticado!!!' });
    }

    const veiculo = await verVeiculo(aluno_id);

    if (!Array.isArray(veiculo)) {
      return res.json([]);
    }

    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    res.status(500).json({ erro: 'Erro ao buscar veículo' });
  }
};


export{verMotoristaController, obterHistoricoViagensController, alunoVerVeiculoController }
