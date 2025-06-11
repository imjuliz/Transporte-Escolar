import express from "express";
import { autorizarAcesso } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/LoginController.js";
import { obterPerfilUsuario, editarPerfilController, editarFotoPerfilController,editarPerfilMotoristaController} from '../controllers/PerfilController.js';
import { obterViagemPorUsuario } from "../controllers/ViagensController.js";
import { cadastrarAlunoComResponsavel, criarPontoEmbarqueController, criarEscolaController, cadastrarMotorista, cadastrarAdministrador, buscarEscolas, buscarPontoPorEscola, verTodosController, verResponsaveisController, verAdminsController, verMotoristasController, viagensEmAndamentoController, quantidadeViagensEmAndamentoController, contarUsuariosController, contarEscolasController, contarMotoristasController, viagensPorDiaController, usuariosPorTipoController, listarVeiculosController, buscarViagemPorEscolaEPontoController, contarIncidentesController, deletarPerfilController, registrarVeiculosController, verEscolasController, verPontosController, verificarResponsavel} from '../controllers/AdminController.js';;
import { obterInformacoesFilhosController, enviarResponsavelMensagem, mensagensParaResponsavel } from '../controllers/ResponsavelController.js'
import { verAlunosController, verVeiculoController, obterInformacoesviagensController, verDadosEscolaController, mensagensParaMotorista, enviarMotoristaMensagemController, obterInformacoesAlunosController} from "../controllers/MotoristaController.js";
import { upload } from '../middlewares/uploadMiddleware.js';
import { verMotoristaController, obterHistoricoViagensController } from "../controllers/AlunoController.js";
const router = express.Router();

// Rotas públicas
router.post("/login", loginController);

// rotas privadas
router.get('/administrador', autorizarAcesso('administrador'));
router.get('/responsavel', autorizarAcesso('responsavel'));
router.get('/aluno', autorizarAcesso('aluno'));
router.get('/motorista', autorizarAcesso('Motorista'));

// informaçoes na pagina "meu perfil"
router.get('/perfil', obterPerfilUsuario, autorizarAcesso( 'aluno', 'responsavel', 'administrador', 'Motorista'));
router.patch('/editarPerfil', editarPerfilController);

router.post('/editarPerfil/foto', upload.single('foto'), editarFotoPerfilController);
//
router.get('/viagens', obterInformacoesviagensController)

router.get('/verAlunos', verAlunosController)

// ver informaçoes das rotas
router.get('/viagem-mapa', obterViagemPorUsuario);


// ALUNOS ------------------------------------------------------------------------------------------
router.get('/verMotorista', verMotoristaController, autorizarAcesso('aluno'));//ver o motorista do onibus


// ADM ------------------------------------------------------------------------------------------
// cadastro de usuarios
router.post('/cadastro/aluno-com-responsavel', cadastrarAlunoComResponsavel, autorizarAcesso('administrador'));
router.post('/cadastro/motorista', cadastrarMotorista, autorizarAcesso('administrador'));
router.post('/cadastro/administrador', cadastrarAdministrador, autorizarAcesso('administrador'));

//cadastro de escolas ---- funcionando 
router.post ('/cadastro/cadastroEscolas', criarEscolaController, autorizarAcesso('administrador'));
//cadastro ponto de embarque ---- funcionando 
router.post ('/cadastro/cadastroPontos', criarPontoEmbarqueController, autorizarAcesso('administrador'));

//deletar usuarios - FUNCIONANDO
router.delete('/deletarUsuario', deletarPerfilController, autorizarAcesso('administrador'));

//registrar veiculo
router.post('/registrar-veiculo', registrarVeiculosController, autorizarAcesso('administrador'));

//ESCOLAS, pontos e viagens
router.get('/escolas', buscarEscolas)
router.get('/ponto-por-escola', buscarPontoPorEscola);
router.get('/viagem-por-escola-ponto', buscarViagemPorEscolaEPontoController);

//ver registros - adm
//listagem
router.get('/cadastros-alunos', verTodosController, autorizarAcesso('administrador'));
router.get('/cadastros-responsaveis', verResponsaveisController , autorizarAcesso('administrador'));
router.get('/cadastros-motoristas', verMotoristasController, autorizarAcesso('administrador'));
router.get('/cadastros-admins', verAdminsController, autorizarAcesso('administrador'));
router.get('/em-andamento', viagensEmAndamentoController, autorizarAcesso('administrador'));
//ver escolas
router.get('/cadastros-escolas', verEscolasController);
//ver pontos de embarque
router.get('/pontosEmbarque', verPontosController);
// contagem
router.get('/em-andamento/quantidade', quantidadeViagensEmAndamentoController);
router.get('/qtd-usuarios', contarUsuariosController)
router.get('/qtd-escolas', contarEscolasController)
router.get('/qtd-motoristas', contarMotoristasController)
router.get('/viagens-por-dia', viagensPorDiaController); //viagens por dia
router.get('/qtd-tipo', usuariosPorTipoController ) //usuarios por tipo
router.post('/verificar-responsavel', verificarResponsavel, autorizarAcesso('administrador'));

// responsavel -------------------------------------------------------------------------------------
router.get('/filhos', obterInformacoesFilhosController, autorizarAcesso('responsavel'))

// enviar mensagem (responsavel logado)
router.post('/mensagensMotorista', enviarResponsavelMensagem, autorizarAcesso('responsavel'));
router.get('/notificacoesResponsavel', mensagensParaResponsavel, autorizarAcesso('responsavel'));

//MOTORISTA -------------------------------------------------------------------------------------
router.get('/verVeiculo',verVeiculoController, autorizarAcesso('Motorista', 'aluno'));
router.get('/verEscolas', verDadosEscolaController, autorizarAcesso('Motorista'));
router.patch('/editarPerfilMotorista', editarPerfilMotoristaController, autorizarAcesso('Motorista'));

router.get('/listarVeiculos', listarVeiculosController,  autorizarAcesso('Motorista'));//para ver os veiculos (dashboard)

router.get('/contar-incidentes', contarIncidentesController,  autorizarAcesso('Motorista'));//contar incidentes (dashboard)

router.get('/notificacoesMotorista', mensagensParaMotorista, autorizarAcesso('Motorista'));// ver mensagens recebidas (motorista logado)


router.get('/alunosMensagem', obterInformacoesAlunosController, autorizarAcesso('Motorista'));//ver os alunos do onibus


router.post('/motoristaEnviarMensagem', enviarMotoristaMensagemController, autorizarAcesso('Motorista'));//enviar mensagens 

// aluno - ver viagens
router.get('/viagens-historico', obterHistoricoViagensController)
router.get('/verEscolas-alunos', buscarEscolas)

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