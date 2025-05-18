import express from "express";
import cors from "cors";
import publicRoutes from './routes/public.js'

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/', publicRoutes);

// Adicionar rotas do Express antes do Next.js
app.get('/home', (req, res) => {
    res.json({ title: "Conectando trajetos, garantindo segurança!" });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
