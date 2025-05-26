import { Router } from 'express';
import {editarPerfilController} from '../controllers/EditarController.js'

const router = Router();

router.patch('/editarPerfil', editarPerfilController);

router.get('/teste', (req, res) => {
    res.send('Rota de teste funcionando!');
});