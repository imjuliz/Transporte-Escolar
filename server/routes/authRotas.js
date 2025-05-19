import express from "express";
import { loginController } from "../controllers/AuthController.js";
import { registrarUsuarioController  } from '../controllers/AdminController.js';

const router = express.Router();

// Rota privada, protegida pelo middleware
router.get("/perfil", loginController, (req, res) => {
  res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
});

router.get("/motorista", loginController, (req, res) => {
  res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
});

//admin - registrar usuario
router.post('/', loginController, registrarUsuarioController);

export default router;