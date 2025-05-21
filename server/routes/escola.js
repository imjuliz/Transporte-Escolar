import express from 'express';
import { listarAlunosController } from '../controllers/EscolaController.js';

const router = express.Router();

router.get('/motorista/embarqueDesembarque/alunos', listarAlunosController);

router.options('/motorista/embarqueDesembarque/alunos', (req,res)=>{
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

export default router;