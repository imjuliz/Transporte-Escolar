import express from "express";
import { loginController } from "../controllers/AuthController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota privada, protegida pelo middleware
router.get("/perfil", loginController, (req, res) => {
  res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
});

export default router;