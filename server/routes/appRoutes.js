import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";
import { editarPerfilController } from "../controllers/EditarController.js";
import { deletarPerfilController } from "../controllers/DeletarController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import PerfilController from '../controllers/PerfilController.js';
import { getViagemUsuario } from '../controllers/ViagensController.js';

// import { obterDadosMotorista } from "../controllers/AlunoController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador/dashboard', autorizarAcesso('Administrador'));

router.get('/responsavel/home', autorizarAcesso('Responsável'));

router.get('/aluno/minha-rota', autorizarAcesso('Aluno'));

router.get('/motorista/dashboard', autorizarAcesso('Motorista'));

// ver informaçoes na pagina "meu perfil"
router.get('/perfil', PerfilController.obterPerfilUsuario);

router.get('/aluno/perfil', autorizarAcesso('Aluno'));

//
router.get('/verAlunos',verAlunosController)

router.patch('/editarPerfil', editarPerfilController);

router.delete('/deletarUsuario', deletarPerfilController);

// ver informaçoes das rotas
router.get('/usuarios/minha-rota', getViagemUsuario);

export default router;