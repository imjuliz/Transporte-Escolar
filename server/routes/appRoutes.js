import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";
import { editarPerfilController } from "../controllers/EditarController.js";
import rotaController from '../controllers/RotasController.js';
import { deletarPerfilController } from "../controllers/DeletarController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador/dashboard', autorizarAcesso('Administrador'), (req, res) => {
  res.json({ mensagem: "Área de Administrador" });
});

router.get('/verAlunos',verAlunosController)

router.patch('/editarPerfil', editarPerfilController);

router.delete('/deletarUsuario', deletarPerfilController);

router.get('/aluno/perfil', autorizarAcesso('Aluno'), (req, res) => {
  res.json({ mensagem: "Perfil do Aluno" });
});

router.get('/motorista/dashboard', autorizarAcesso('Motorista'), (req, res) => {
  res.json({ mensagem: "Painel do Motorista" });
});

router.get('/responsavel/home', autorizarAcesso('Responsável'), (req, res) => {
  res.json({ mensagem: "Área do Responsável" });
});

router.get('/aluno/minha-rota', autorizarAcesso('Aluno'), rotaController.listarRotas);
router.get('/aluno/minha-rota', autorizarAcesso('Aluno'), rotaController.obterRota);
router.post('/', rotaController.criarRota);
router.put('/:id', rotaController.atualizarRota);
router.delete('/:id', rotaController.deletarRota);

export default router;