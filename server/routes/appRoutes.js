import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { verAlunosController } from "../controllers/VerAlunosController.js";
import { obterPerfilUsuario, editarPerfilController } from '../controllers/PerfilController.js';
// import { getViagemUsuario } from '../controllers/ViagensController.js';
import { obterViagemPorUsuario } from "../controllers/ViagensController.js";
import { cadastrarAlunoComResponsavel, cadastrarMotorista, cadastrarAdministrador, buscarEscolas, buscarPontoPorEscola, deletarPerfilController } from '../controllers/AdminController.js';
import { adicionarIncidenteController } from "../controllers/IncidenteController.js";
const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas

router.get('/administrador', autorizarAcesso('Administrador'));

router.get('/responsavel', autorizarAcesso('Responsável'));

router.get('/aluno', autorizarAcesso('Aluno'));

router.get('/motorista', autorizarAcesso('Motorista'));

router.post('/incidente',adicionarIncidenteController);
// ver informaçoes na pagina "meu perfil"
router.get('/perfil', obterPerfilUsuario);
//
router.get('/verAlunos', verAlunosController)

router.patch('/editarPerfil', editarPerfilController);



// ver informaçoes das rotas
// router.get('/usuarios/minha-rota', getViagemUsuario);
router.get('/viagem/:tipo/:id', obterViagemPorUsuario);

// ADM ------------------------------------------------------------------------------------------
// cadastro de usuarios
router.post('/cadastro/aluno-com-responsavel', cadastrarAlunoComResponsavel);
router.post('/cadastro/motorista', cadastrarMotorista);
router.post('/cadastro/administrador', cadastrarAdministrador);
router.delete('/deletarUsuario', deletarPerfilController);

router.get('/escolas', buscarEscolas)
router.get('/ponto-por-escola', buscarPontoPorEscola);


export default router;