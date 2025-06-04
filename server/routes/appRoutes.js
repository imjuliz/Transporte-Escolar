import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterPerfilUsuario, editarPerfilController, uploadFotoPerfil} from '../controllers/PerfilController.js';
// import { getViagemUsuario } from '../controllers/ViagensController.js';
import { obterViagemPorUsuario } from "../controllers/ViagensController.js";
import { cadastrarAlunoComResponsavel, cadastrarMotorista, cadastrarAdministrador, buscarEscolas, buscarPontoPorEscola, deletarPerfilController , verTodosController, verResponsaveisController, verAdminsController, verMotoristasController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarEscolasController} from '../controllers/AdminController.js';
import { adicionarIncidenteController } from "../controllers/IncidenteController.js";
import { verVeiculoController } from "../controllers/VerVeiculosController.js";
import multer from 'multer';
const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas

// router.get('/administrador', autorizarAcesso('administrador'));

// router.get('/responsavel', autorizarAcesso('responsavel'));

// router.get('/aluno', autorizarAcesso('aluno'));

router.get('/motorista', autorizarAcesso('Motorista'));
router.get('/verVeiculo',verVeiculoController, autorizarAcesso('Motorista'));

router.post('/incidente',adicionarIncidenteController);
// ver informaçoes na pagina "meu perfil"
router.get('/perfil', obterPerfilUsuario);
router.get('/perfil', obterPerfilUsuario, autorizarAcesso('motorista', 'aluno', 'responsavel'));
//
router.get('/verAlunos', verAlunosController)

router.patch('/editarPerfil', editarPerfilController);

// ver informaçoes das rotas
router.get('/viagem/:tipo/:id', obterViagemPorUsuario);

// ADM ------------------------------------------------------------------------------------------
// cadastro de usuarios
router.post('/cadastro/aluno-com-responsavel', cadastrarAlunoComResponsavel);
router.post('/cadastro/motorista', cadastrarMotorista);
router.post('/cadastro/administrador', cadastrarAdministrador);
router.delete('/deletarUsuario', deletarPerfilController);

router.get('/escolas', buscarEscolas)
router.get('/ponto-por-escola', buscarPontoPorEscola);

//ver registros - adm
router.get('/cadastros-alunos', verTodosController);
router.get('/cadastros-responsaveis', verResponsaveisController );
router.get('/cadastros-motoristas', verMotoristasController);
router.get('/cadastros-admins', verAdminsController);
router.get('/em-andamento', viagensEmAndamentoController)
router.get('/em-andamento/quantidade', quantidadeViagensEmAndamentoController);
router.get('/qtd-usuarios', contarUsuariosController)
router.get('/qtd-escolas', contarEscolasController)

// responsavel
router.get('/filhos', obterInformacoesFilhosController)


export default router;