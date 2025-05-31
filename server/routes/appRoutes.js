import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { deletarPerfilController } from "../controllers/DeletarController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterPerfilUsuario, editarPerfilController } from '../controllers/PerfilController.js';
import { getViagemUsuario } from '../controllers/ViagensController.js';
import { aluno, motorista, responsavel, administrador, escola, pontoEmbarque, veiculo, buscarEscolas } from '../controllers/AdminController.js';

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

router.delete('/deletarUsuario', deletarPerfilController);

// ver informaçoes das rotas
router.get('/usuarios/minha-rota', getViagemUsuario);

// adicionar registros
router.post('/alunos', aluno);
router.post('/motoristas', motorista);
router.post('/responsaveis', responsavel);
router.post('/administradores', administrador);
router.post('/escolas', escola);
router.post('/pontos-embarque', pontoEmbarque);
router.post('/veiculos', veiculo);

router.get('/escolas', buscarEscolas)

export default router;