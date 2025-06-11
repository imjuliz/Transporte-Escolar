import { historicoAlunoViagens, verMotorista } from '../models/Aluno.js';

// logica pra ver o historico de viagens
const obterHistoricoViagensController = async (req, res) => {
    try {
        const alunoId = req.session.usuario?.id;

        const rows = await historicoAlunoViagens(alunoId);
        console.log('rows:', rows);

        const infoViagens = [];
        const viagensMap = {};

        for (const row of rows) {
            if (!viagensMap[row.id_aluno]) {
                viagensMap[row.id_aluno] = {
                    id_aluno: row.id_aluno,
                    nome_aluno: row.nome_aluno,
                    idade: row.idade,
                    nome_escola: row.nome_escola,
                    endereco_embarque: row.endereco_embarque,
                    viagens: []
                };
                infoViagens.push(viagensMap[row.id_aluno]);
            }

            viagensMap[row.id_aluno].viagens.push({
                tipo: row.tipo_viagem,
                horaEmbarque: row.hora_saida,
                horaSaída: row.hora_chegada_prevista,
                data: row.data,
                status: row.status_viagem,
                nome_motorista: row.nome_motorista
            });
        }

        res.json({ infoViagens });

    } catch (error) {
        console.error('Erro ao buscar histórico de viagens do aluno:', error);
        res.status(500).json({ message: 'Erro ao buscar histórico de viagens do aluno' });
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

export{verMotoristaController, obterHistoricoViagensController }
