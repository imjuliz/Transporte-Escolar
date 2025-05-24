import express from "express";
import { loginController } from "../controllers/LoginController.js"
import { registrarUsuarioController  } from '../controllers/AdminController.js';

const router = express.Router();

// // Rota privada, protegida pelo middleware
// router.get("/perfil", loginController, (req, res) => {
//   res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
// });

// router.get("/motorista", loginController, (req, res) => {
//   res.json({ mensagem: "Bem-vindo ao seu perfil privado!" });
// });

// // login
// router.get('/administrador', (req, res) => {
//   if (!req.session.usuario || req.session.usuario.tipo !== 'administrador') {
//     return res.status(401).json({ mensagem: 'Acesso negado' });
// }
// });

// // logout 
// router.post('/logout', (req, res) => {
//   req.session.destroy();
//   res.json({ mensagem: 'Logout realizado com sucesso' });
// });

// //admin - registrar usuario
// router.post("/registrar", /*loginController*/ registrarUsuarioController);
// router.post('/administrador/cadastrar', loginController, registrarUsuarioController);

// pagina de login
router.post("/login", loginController);

export default router;