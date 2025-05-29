import express from "express";
import cors from "cors";
import session from "express-session";
import rotas from "./routes/appRoutes.js";
// import rotasRoute from './routes/rotasRoute.js'

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'chave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true se usar HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

app.use((req, res, next) => {
  console.log("Sessão atual:", req.session);
  next();
});

app.use('/', rotas);

app.use('/administrador/dashboard', (req, res) => {
  console.log(req.session);
  res.json(req.session);
})

// app.use('/aluno/minha-rota', rotasRoute);


// teste
app.get('/debug/sessao', (req, res) => {
  res.json({
    sessao: req.session,
    usuario: req.session.usuario || null
  });
});

app.use((req,res)=>{
  res.status(404).json({mensagem: 'Rota não encontrada'});
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
