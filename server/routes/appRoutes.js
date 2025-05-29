import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";
import { editarPerfilController } from "../controllers/EditarController.js";
import rotaController from '../controllers/RotasController.js';
import { deletarPerfilController } from "../controllers/DeletarController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterDadosAluno } from '../controllers/AlunoController.js';
// import { obterDadosMotorista } from "../controllers/AlunoController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador/dashboard', autorizarAcesso('Administrador'));

router.get('/verAlunos',verAlunosController)

router.patch('/editarPerfil', editarPerfilController);

router.delete('/deletarUsuario', deletarPerfilController);

router.get('/aluno/perfil', autorizarAcesso('Aluno'), obterDadosAluno);

router.get('/motorista/dashboard', autorizarAcesso('Motorista'));

// router.get('/motorista/perfil', autorizarAcesso('Motorista'), obterDadosMotorista )

router.get('/responsavel/home', autorizarAcesso('Responsável'));

router.get('/aluno/minha-rota', autorizarAcesso('Aluno'), rotaController.listarRotas);
router.get('/aluno/minha-rota', autorizarAcesso('Aluno'), rotaController.obterRota);
router.post('/', rotaController.criarRota);
router.put('/:id', rotaController.atualizarRota);
router.delete('/:id', rotaController.deletarRota);

export default router;