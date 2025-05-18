import jwt from 'jsonwebtoken';
import { read, compare } from '../config/database.js'
// import { JWT_SECRET } from '../config/jwt.js';

//login. consulta o banco de dados e verifica
const loginController = async (req, res) => {
    const { email, senha } = req.body;
    //verifica se o usuario existe
    try {
        const usuario = await read('usuarios', `email = '${email}'`);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        // verifica se a senha corresponde
        const senhaCorreta = await compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' })
        }

        //criação do token. ele expira em 1 hora
        const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
};

export { loginController };