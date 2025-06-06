import { verFilhos } from '../models/Responsavel.js';

const obterInformacoesFilhosController = async (req, res) => {
    try {
        const responsavelId = req.session.usuario?.id;

        try {
            const rows = await verFilhos(responsavelId);
            console.log('rows:', rows);

            //p agrupar os dados p/ aluno
            const infoFilhos = [];
            // evita repetir alunos, agrupando as viagens de cada um
            const alunosMap = {};

            // esse for percorre todas as linhas q vieram do banco (cada linha é uma viagem de um filho)
            for (const row of rows) {
                // se o aluno ainda NAO tiver nenhuma entrada, cria um objeto com os dados do aluno e uma lista vazia pras viagens dele
                if (!alunosMap[row.id_aluno]) {
                    alunosMap[row.id_aluno] = {
                        id_aluno: row.id_aluno,
                        nome_aluno: row.nome_aluno,
                        idade: row.idade,
                        nome_escola: row.nome_escola,
                        endereco_embarque: row.endereco_embarque,
                        viagens: []
                    };
                    // add esse novo aluno criado no array infoFilhos
                    infoFilhos.push(alunosMap[row.id_aluno]);
                }

                alunosMap[row.id_aluno].viagens.push({
                    tipo: row.tipo_viagem,
                    horaEmbarque: row.hora_saida,
                    horaSaída: row.hora_chegada_prevista,
                    data: row.data,
                    status: row.status_viagem
                });
            }

            res.json({ infoFilhos });

        } catch (error) {
            console.error('Erro ao buscar informações dos filhos:', error);
            res.status(500).json({ message: 'Erro ao buscar informaçoes dos filhos' });
        }
    } catch (error) {
        console.error('Erro geral no controller:', error);
        res.status(500).json({ message: 'Erro geral no controller' });
    }
};

// editar perfil


export { obterInformacoesFilhosController }
