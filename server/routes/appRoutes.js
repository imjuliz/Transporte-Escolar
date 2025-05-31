import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterPerfilUsuario, editarPerfilController } from '../controllers/PerfilController.js';
import { getViagemUsuario } from '../controllers/ViagensController.js';
import { aluno, motorista, responsavel, administrador, escola, pontoEmbarque, veiculo, buscarEscolas, buscarPontoPorEscola, deletarPerfilController } from '../controllers/AdminController.js';

const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador', autorizarAcesso('Administrador'));

router.get('/responsavel', autorizarAcesso('Responsável'));

router.get('/aluno', autorizarAcesso('Aluno'));

router.get('/motorista', autorizarAcesso('Motorista'));

// ver informaçoes na pagina "meu perfil"
router.get('/perfil', obterPerfilUsuario);
//
router.get('/verAlunos', verAlunosController)

router.patch('/editarPerfil', editarPerfilController);



// ver informaçoes das rotas
router.get('/usuarios/minha-rota', getViagemUsuario);

// ADM ------------------------------------------------------------------------------------------
// adicionar registros
router.post('/alunos', autorizarAcesso('Administrador'), aluno);
router.post('/motoristas', autorizarAcesso('Administrador'), motorista);
router.post('/responsaveis', autorizarAcesso('Administrador'), responsavel);
router.post('/administradores',autorizarAcesso('Administrador'),  administrador);
router.post('/escolas', autorizarAcesso('Administrador'), escola);
router.post('/pontos-embarque', autorizarAcesso('Administrador'), pontoEmbarque);
router.post('/veiculos', autorizarAcesso('Administrador'), veiculo);
router.delete('/deletarUsuario', deletarPerfilController);

router.get('/escolas', buscarEscolas)
router.get('/ponto-por-escola', buscarPontoPorEscola);


export default router;