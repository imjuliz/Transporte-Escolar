//validaçao dos usuarios antes de acessar rotas privadas

// const autenticarUsuario = async (req, res, next) => {
//     const { email, senha, tipo } = req.body;
//     // se não preencher os campos bloqueia a requisição
//     if (!email || !senha || !tipo) {
//         return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
//     }
//     try {
//         const usuario = await buscarUsuario(email, senha, tipo);
//         // se o usuário não for encontrado, bloqueia a requisição
//         if (!usuario) {
//             return res.status(401).json({ mensagem: 'Acesso negado: credenciais inválidas.' });
//         }

//         req.usuario = usuario; // guarda os dados do usuário autenticado na requisição
//         next(); // permite acesso à rota privada
//     } catch (err) {
//         console.error('Erro na autenticação:', err);
//         res.status(500).json({ mensagem: 'Erro interno ao autenticar usuário.' });
//     }
// };

export function autorizarAcesso(tipoPermitido) {
  return (req, res, next) => {
    if (!req.session.usuario) {
      return res.status(401).json({ erro: 'Não autenticado' });
    }

    if (req.session.usuario.tipo !== tipoPermitido) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    next();
  };
}
