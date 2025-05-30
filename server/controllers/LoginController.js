import { buscarUsuarioPorEmail } from '../models/Auth.js';

// const loginController = async (req, res) => {
//   const { email, senha, tipo } = req.body;

//   if (!email || !senha || !tipo) {
//     return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
//   }

//   try {
//     const usuario = await buscarUsuario(email, senha, tipo);

//     if (!usuario) {
//       return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
//     }

//     // Salva dados na sessão
//     req.session.usuario = { id: usuario.id, email: usuario.email, tipo: usuario.tipo };

//     return res.status(200).json({ mensagem: 'Login bem-sucedido' });
//   } catch (err) {
//     console.error('Erro no login:', err);
//     return res.status(500).json({ mensagem: 'Erro interno ao fazer login.' });
//   }
// };

// export { loginController };

export async function loginController(req, res) {
  const { email, senha, tipo } = req.body;

  if (!email || !senha || !tipo) {
    return res.status(400).json({ erro: 'Email, senha e tipo são obrigatórios' });
  }

  try {
    const usuario = await buscarUsuarioPorEmail(tipo, email);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const senhaCorreta = senha === usuario.senha;

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    // Salva ID e tipo na sessão
    req.session.usuario = {
      id: usuario.id,
      tipo: tipo.toLowerCase()
    };

    console.log("✅ Usuário autenticado:", req.session.usuario);

    res.json({ mensagem: 'Login realizado com sucesso', tipo: req.session.usuario.tipo });

  } catch (erro) {
    console.error("Erro no login:", erro.stack || erro);
    res.status(500).json({ erro: 'Erro no servidor ao realizar login' });
  }
}