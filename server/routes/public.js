// ROTAS PUBLICAS - rotas que o usuario pode acessar SEM autenticação
import express from 'express';
import { loginController } from '../controllers/LoginController.js';

const router = express.Router()

// login
router.post('/login', loginController);

//página inicial
router.post('/', loginController);

export default router;