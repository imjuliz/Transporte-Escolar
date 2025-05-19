import { buscarUsuarioPorEmailOuCPF } from "../models/User.js";

const loginController = async (req, res) => {
  const { identificador, senha } = req.body;

  try {
    const usuario = await buscarUsuarioPorEmailOuCPF(identificador);

    if (!usuario || senha !== usuario.senha) {
      return res.status(401).json({ mensagem: "Senha inválida" });
    }

    res.status(200).json({ mensagem: "Login realizado com sucesso!"});
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

export { loginController };