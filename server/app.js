import express from "express";
import cors from "cors";
import session from "express-session";
import { autenticarUsuario } from "./middlewares/authMiddleware.js";
import rotas from "./routes/appRoutes.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
  session({
    secret: 'segredo-simples',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true se estiver em HTTPS
  })
);

app.use('/', rotas);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
