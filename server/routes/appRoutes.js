import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";
import { editarPerfilController } from "../controllers/EditarController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController); // <-- ESTA É A ROTA QUE O FRONT CHAMA

// Exemplo de rota protegida
router.get('/administrador/dashboard', autorizarAcesso('Administrador'), (req, res) => {
  res.json({ mensagem: "Área de Administrador" });
});

router.patch('/editarPerfil', editarPerfilController);
router.get('/aluno/perfil', autorizarAcesso('Aluno'), (req, res) => {
  res.json({ mensagem: "Perfil do Aluno" });
});

router.get('/motorista/dashboard', autorizarAcesso('Motorista'), (req, res) => {
  res.json({ mensagem: "Painel do Motorista" });
});

router.get('/responsavel/home', autorizarAcesso('Responsável'), (req, res) => {
  res.json({ mensagem: "Área do Responsável" });
});

export default router;