import express from "express";
import cors from "cors";
import session from 'express-session';
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/authRotas.js";
// import { loggerController } from "./controllers/LoggerController.js";
const app = express();
const port = 3001;

// app.use(loggerController);
app.use(cors());
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", privateRoutes);

// para armazenar informações do usuário entre requisições
app.use(session({
    secret: 'tranporte-ecolar-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
