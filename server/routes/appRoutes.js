import express from "express";
import { autorizarUsuario } from "../middlewares/authMiddleware.js"; 
import { loginController } from "../controllers/LoginController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController); // <-- ESTA É A ROTA QUE O FRONT CHAMA

// Exemplo de rota protegida
router.get('/administrador/dashboard', autorizarUsuario(['Administrador']), (req, res) => {
  res.send("Área de Administrador");
});

export default router;