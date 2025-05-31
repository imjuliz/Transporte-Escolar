// //controllers:  cuida da lógica, decide o que fazer com os dados e responde às requisições. nesse caso, estão as funções do administrador

// import { registrarUsuario, registrarVeiculos } from "../models/Admin.js";

// const registrarUsuarioController = async (req, res)=>{
//     try{
//         const {cpf, email, senha, tipo } = req.body;

//         //armazena num arquivo json as informações que vamos enviar
//         const usuarioData ={
//             cpf : cpf,
//             email: email,
//             senha: senha,
//             tipo: tipo
//         }

//         const usuarioId = await registrarUsuario(usuarioData);
//         res.status(201).json({mensagem: 'Usuário criado com sucesso!', usuarioId});

//     } catch (err){
//         console.error('Erro ao registrar usuário: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar usuario'});
//     }
// }

// const registrarVeiculosController = async (req, res)=>{
//     try{
//         const {motorista_cpf, fabricacao, placa, modelo, marca} = req.body;

//         //armazena num arquivo json as informações que vamos enviar
//         const veiculoData = {

//             motorista_cpf: motorista_cpf,
//             fabricacao: fabricacao,
//             placa: placa,
//             modelo: modelo,
//             marca: marca

//         }

//         const veiculoId = await registrarVeiculos(veiculoData);
//         res.status(201).json({mensagem: 'veículo registrado com sucesso!', veiculoId});
//     }
//     catch(err){
//         console.error('Erro ao registrar veículo: ', err);
//         res.status(500).json({mensagem: 'Erro ao registrar veículo'});
//     }
// }

// export { registrarUsuarioController, registrarVeiculosController }

import { criarRegistro, buscarEscolasPorNome } from '../models/Admin.js';

export const registrar = (tabela, entidadeNome) => {
    return async (req, res) => {
        const dados = req.body;
        try {
            await criarRegistro(tabela, dados);
            console.log(`Dados recebidos para tabela ${tabela}:`, dados);
            res.status(201).json({ mensagem: `${entidadeNome} cadastrado com sucesso` });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    };
};

// busca a escola pelo nome
// No seu controller
export const buscarEscolas = async (req, res) => {
    const { nome } = req.query;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório e deve ser uma string.' });
    }

    try {
        const escolas = await buscarEscolasPorNome(nome);
        res.json(escolas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar escolas.' });
    }
};


export const aluno = registrar('alunos', 'Aluno');
export const motorista = registrar('motoristas', 'Motorista');
export const responsavel = registrar('responsaveis', 'Responsável');
export const administrador = registrar('adm', 'Administrador');
export const escola = registrar('escolas', 'Escola');
export const pontoEmbarque = registrar('pontos_embarque', 'Ponto de Embarque');
export const veiculo = registrar('veiculos', 'Veículo');
