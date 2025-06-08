import { buscarUsuarioPorEmail } from '../models/Auth.js';

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

    req.session.save((err) => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.status(500).json({ erro: 'Erro ao salvar sessão' });
      }

      // Retorna sucesso e dados para o frontend
      res.json({ id: usuario.id, mensagem: 'Login realizado com sucesso', tipo: req.session.usuario.tipo });

    });
    console.log("Sessão criada com ID:", req.sessionID);
    console.log("Usuário autenticado:", req.session.usuario);
  } catch (erro) {
    console.error("Erro no login:", erro.stack || erro);
    res.status(500).json({ erro: 'Erro no servidor ao realizar login' });
  }
}