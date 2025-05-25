import { buscarUsuario, buscarPorEmail } from "../models/User.js";

// const loginController = async (req, res) => {
//   const { email, senha, tipo } = req.body;
//   //verifica se o usuario existe
//   try {
//     const usuario = await buscarPorEmail(email, tipo);
//     if (!usuario) {
//       return res.status(404).json({ mensagem: 'Usuário não encontrado' });
//     }
//     // verifica se a senha corresponde
//     const senhaCorreta = await buscarUsuario(email, senha, tipo)

//     if (!senhaCorreta) {
//       return res.status(401).json({ mensagem: 'Senha incorreta' })
//     }

//     res.status(200).json({ mensagem: "Login realizado com sucesso!" });
//   } catch (err) {
//     console.error("Erro ao fazer login:", err);
//     res.status(500).json({ mensagem: "Erro ao fazer login" });
//   }
// };

const loginController = async (req, res) => {
  const { email, senha, tipo } = req.body;

  if (!email || !senha || !tipo) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  try {
    const usuario = await buscarUsuario(email, senha, tipo);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // Salva dados na sessão
    req.session.usuario = { email, tipo };

    return res.status(200).json({ mensagem: 'Login bem-sucedido' });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ mensagem: 'Erro interno ao fazer login.' });
  }
};

export { loginController };