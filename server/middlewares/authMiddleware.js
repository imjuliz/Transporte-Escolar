// export function autorizarAcesso(tipoPermitido) {
//   return (req, res, next) => {
//     if (!req.session.usuario) {
//       return res.status(401).json({ erro: 'Não autenticado' });
//     }

//     if (req.session.usuario.tipo !== tipoPermitido) {
//       return res.status(403).json({ erro: 'Acesso negado' });
//     }

//     next();
//   };
// }

export function autorizarAcesso(...tiposPermitidos) {
  return (req, res, next) => {
    if (!req.session.usuario) {
      console.log('Não autenticado');
      return res.status(401).json({ erro: 'Não autenticado' });
    }

    const tipoUsuario = req.session.usuario.tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const tiposNorm = tiposPermitidos.map(t =>
      t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    console.log('Tipo do usuário:', tipoUsuario);
    console.log('Tipos permitidos:', tiposNorm);

    if (!tiposNorm.includes(tipoUsuario)) {
      console.log('Acesso negado para tipo:', tipoUsuario);
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    console.log('Acesso permitido para tipo:', tipoUsuario);
    next();
  };
}
