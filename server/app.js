import express from "express";
import cors from "cors";
import session from "express-session";
import rotas from "./routes/appRoutes.js";

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

app.use((req, res, next) => {
  console.log("Tipo de Usuário:", req.session.usuario);
  console.log("Sessão atual:", req.session);
  next();
});

app.use('/', rotas);

// // teste
// app.get('/debug/sessao', (req, res) => {
//   res.json({
//     sessao: req.session,
//     usuario: req.session.usuario || null
//   });
// });

app.get('/validar-sessao', (req, res) => {
  if (req.session?.usuario) {
    res.status(200).json({ usuario: req.session.usuario });
  } else {
    res.status(401).json({ erro: 'Usuário não autenticado' });
  }
});

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
