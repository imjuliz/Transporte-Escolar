import express from "express";
import { loginController } from "../controllers/AuthController.js";
import { registrarUsuarioController  } from '../controllers/AdminController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota privada, protegida pelo middleware
router.get("/perfil", loginController, (req, res) => {
  res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
});

router.get("/motorista", loginController, (req, res) => {
  res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
});

// login
router.get('/admin/', (req, res) => {
  if (!req.session.usuario || req.session.usuario.tipo !== 'administrador') {
    return res.status(401).json({ mensagem: 'Acesso negado' });
}
});

// logout 
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ mensagem: 'Logout realizado com sucesso' });
});

//admin - registrar usuario
router.post('/', loginController, registrarUsuarioController);

export default router;