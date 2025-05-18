import { buscarUsuarioPorEmailOuCPF } from "../models/User.js";

const loginController = async (req, res) => {
  const { identificador, senha } = req.body; // pode ser CPF ou Email

  try {
    const usuario = await buscarUsuarioPorEmailOuCPF(identificador); 
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (senha !== usuario.senha) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    res.status(200).json({ mensagem: "Login realizado", token: "SEGREDO" });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

export { loginController };