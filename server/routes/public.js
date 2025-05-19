// ROTAS PUBLICAS - rotas que o usuario pode acessar SEM autenticação
import express from 'express';
import { loginController } from '../controllers/AuthController.js';

const router = express.Router()

// login
router.post('/login', loginController);

export default router;