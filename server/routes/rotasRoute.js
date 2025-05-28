import express from 'express';
import rotaController from '../controllers/RotasController.js';
const router = express.Router();

router.get('/', rotaController.listarRotas);
router.get('/:id', rotaController.obterRota);
router.post('/', rotaController.criarRota);
router.put('/:id', rotaController.atualizarRota);
router.delete('/:id', rotaController.deletarRota);

export default router;