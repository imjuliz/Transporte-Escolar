import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";
import { editarPerfilController } from "../controllers/EditarController.js";
// import rotaController from '../controllers/RotasController.js';
import { deletarPerfilController } from "../controllers/DeletarController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterDadosAluno, obterDadosMotorista } from '../controllers/AlunoController.js';
// import { obterDadosMotorista } from "../controllers/AlunoController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.patch('/editarPerfil', editarPerfilController);

//rota adm
router.get('/administrador/dashboard', autorizarAcesso('Administrador'));

router.delete('/deletarUsuario', deletarPerfilController);

//rotas motorista
router.get('/motorista/dashboard', autorizarAcesso('Motorista'));
router.get('/motorista/perfil', autorizarAcesso('Motorista'), obterDadosMotorista )
router.get('/verAlunos',verAlunosController)

//rotas responsavel
router.get('/responsavel/home', autorizarAcesso('Responsável'));

//rotas aluno
router.get('/aluno/perfil', autorizarAcesso('Aluno'), obterDadosAluno);

router.get('/aluno/minha-rota', autorizarAcesso('Aluno')/*, rotaController.listarRotas*/);
router.get('/aluno/minha-rota', autorizarAcesso('Aluno')/*, rotaController.obterRota*/);
// router.post('/'/*, rotaController.criarRota*/);
// router.put('/:id'/*, rotaController.atualizarRota*/);
// router.delete('/:id'/*, rotaController.deletarRota*/);

export default router;