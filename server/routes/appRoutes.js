import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { obterPerfilUsuario, editarPerfilController, editarFotoPerfilController,editarPerfilMotoristaController} from '../controllers/PerfilController.js';
// import { getViagemUsuario } from '../controllers/ViagensController.js';
import { obterViagemPorUsuario } from "../controllers/ViagensController.js";
import { cadastrarAlunoComResponsavel, cadastrarMotorista, cadastrarAdministrador, buscarEscolas, buscarPontoPorEscola, deletarPerfilController , verTodosController, verResponsaveisController, verAdminsController, verMotoristasController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarEscolasController, contarMotoristasController, viagensPorDiaController, usuariosPorTipoController, listarVeiculosController, buscarViagemPorEscolaEPontoController, contarIncidentesController} from '../controllers/AdminController.js';
//import { cadastrarAlunoComResponsavel, cadastrarMotorista, cadastrarAdministrador, buscarEscolas, buscarPontoPorEscola, deletarPerfilController , verTodosController, verResponsaveisController, verAdminsController, verMotoristasController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarEscolasController, contarMotoristasController, viagensPorDiaController, usuariosPorTipoController, buscarViagemPorEscolaEPontoController} from '../controllers/AdminController.js';
import { adicionarIncidenteController } from "../controllers/IncidenteController.js";
import { obterInformacoesFilhosController, enviarResponsavelMensagem } from '../controllers/ResponsavelController.js'
import { verAlunosController, verVeiculoController, obterInformacoesviagensController, verDadosEscolaController, mensagensParaMotorista, enviarMotoristaMensagemController, obterInformacoesAlunosController} from "../controllers/MotoristaController.js";
import { upload } from '../middlewares/uploadMiddleware.js'; 
import multer from 'multer';
const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador', autorizarAcesso('administrador'));
router.get('/responsavel', autorizarAcesso('responsavel'));
router.get('/aluno', autorizarAcesso('aluno'));
router.get('/motorista', autorizarAcesso('Motorista'));

// informaçoes na pagina "meu perfil"
router.get('/perfil', obterPerfilUsuario);
router.get('/perfil', obterPerfilUsuario, autorizarAcesso( 'aluno', 'responsavel'));
router.patch('/editarPerfil', editarPerfilController);

router.post('/editarPerfil/foto', upload.single('foto'), editarFotoPerfilController);
//
router.get('/viagens', obterInformacoesviagensController)

router.get('/verAlunos', verAlunosController)

// ver informaçoes das rotas
router.get('/viagem-mapa', obterViagemPorUsuario);

// ADM ------------------------------------------------------------------------------------------
// cadastro de usuarios
router.post('/cadastro/aluno-com-responsavel', cadastrarAlunoComResponsavel);
router.post('/cadastro/motorista', cadastrarMotorista);
router.post('/cadastro/administrador', cadastrarAdministrador);
router.delete('/deletarUsuario', deletarPerfilController);

//ESCOLAS, pontos e viagens
router.get('/escolas', buscarEscolas)
router.get('/ponto-por-escola', buscarPontoPorEscola);
router.get('/viagem-por-escola-ponto', buscarViagemPorEscolaEPontoController);

//ver registros - adm
//listagem
router.get('/cadastros-alunos', verTodosController);
router.get('/cadastros-responsaveis', verResponsaveisController );
router.get('/cadastros-motoristas', verMotoristasController);
router.get('/cadastros-admins', verAdminsController);
router.get('/em-andamento', viagensEmAndamentoController)
// contagem
router.get('/em-andamento/quantidade', quantidadeViagensEmAndamentoController);
router.get('/qtd-usuarios', contarUsuariosController)
router.get('/qtd-escolas', contarEscolasController)
router.get('/qtd-motoristas', contarMotoristasController)
router.get('/viagens-por-dia', viagensPorDiaController); //viagens por dia
router.get('/qtd-tipo', usuariosPorTipoController ) //usuarios por tipo


// responsavel -------------------------------------------------------------------------------------
router.get('/filhos', obterInformacoesFilhosController)
// enviar mensagem (responsavel logado)
router.post('/mensagens', enviarResponsavelMensagem);

//MOTORISTA -------------------------------------------------------------------------------------
router.get('/verVeiculo',verVeiculoController, autorizarAcesso('Motorista'));
router.get('/verEscolas', verDadosEscolaController, autorizarAcesso('motorista'));
router.patch('/editarPerfilMotorista', editarPerfilMotoristaController, autorizarAcesso('motorista'));
router.post('/enviarIncidente',adicionarIncidenteController);
//para ver os veiculos (dashboard)
router.get('/listarVeiculos', listarVeiculosController);
//contar incidentes (dashboard)
router.get('/contar-incidentes', contarIncidentesController);
// ver mensagens recebidas (motorista logado)
router.get('/notificacoes', mensagensParaMotorista);

//ver os alunos do onibus
router.get('/alunosMensagem', obterInformacoesAlunosController);

//enviar mensagens 
router.post('/mensagem', enviarMotoristaMensagemController, autorizarAcesso('motorista'));

// logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }
    res.clearCookie('connect.sid'); // limpa o cookie da sessão no cliente
    return res.status(200).json({ message: 'Logout efetuado com sucesso' });
  });
});


export default router;