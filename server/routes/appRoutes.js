import express from "express";
import autenticarUsuario from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";

const router = express.Router();

// Rotas públicas
router.post("/login", loginController);
router.get("/trabalheConosco", (req, res) => res.send("Página Trabalhe Conosco"));

// rotas privadas
router.get('/aluno/:subpasta', autenticarUsuario);

export default router;