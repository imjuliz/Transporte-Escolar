import express from "express";
const router = express.Router();

// Exemplo de rota
router.get("/", (req, res) => {
  res.send("Bem-vindo à rota do responsavel!");
});

export default router;

