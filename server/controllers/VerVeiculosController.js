import { verVeiculo, verViagensVeiculos} from "../models/veiculos.js";

const verVeiculoController = async (req, res) => {
    const motoristaId = req.session.usuario?.id;

    try {
        const rows = await verVeiculo(motoristaId);
        res.status(200).json(rows)
    } catch (err) {
        console.error('Erro ao pegar informações do veiculo!!!', err)
        res.status(500).json({ mensagem: 'não foi possivel pegar informações do veiculo!!!' })
    }
}

const obterInformacoesviagensController = async (req, res) => {
    try {
        const motoristaId = req.session.usuario?.id;

        try {
            const rows = await verViagensVeiculos(motoristaId);
            console.log('rows:', rows);

            //p agrupar os dados p/ aluno
            const infoveiculos = [];
            // evita repetir alunos, agrupando as viagens de cada um
            const veiculosMap = {};

            // esse for percorre todas as linhas q vieram do banco (cada linha é uma viagem de um filho)
            for (const row of rows) {
                // se o aluno ainda NAO tiver nenhuma entrada, cria um objeto com os dados do aluno e uma lista vazia pras viagens dele
                if (!veiculosMap[row.id_veiculo]) {
                    veiculosMap[row.id_veiculo] = {
                        id_veiculo: row.id_veiculo,
                        nome_escola: row.nome_escola,
                        endereco_embarque: row.endereco_embarque,
                        viagens: []
                    };
                    // add esse novo aluno criado no array infoFilhos
                    infoveiculos.push(veiculosMap[row.id_veiculo]);
                }

                veiculosMap[row.id_veiculo].viagens.push({
                    tipo: row.tipo_viagem,
                    horaEmbarque: row.hora_saida,
                    horaSaída: row.hora_chegada_prevista,
                    data: row.data,
                    status: row.status_viagem
                });
            }

            res.json({ infoveiculos });

        } catch (error) {
            console.error('Erro ao buscar informações do veiculo:', error);
            res.status(500).json({ message: 'Erro ao buscar informaçoes do veiculo' });
        }
    } catch (error) {
        console.error('Erro geral no controller:', error);
        res.status(500).json({ message: 'Erro geral no controller' });
    }
};


export { verVeiculoController, obterInformacoesviagensController } 