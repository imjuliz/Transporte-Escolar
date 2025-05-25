import express from "express";
import cors from "cors";
import rotas from "./routes/appRoutes.js"; // Certifique-se do caminho correto das rotas

const app = express();
const port = 3001;

// Configuração dos middlewares
app.use(express.json()); // Permite processamento de JSON no corpo das requisições
app.use(cors());

// Aplicação das rotas
app.use(rotas);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});