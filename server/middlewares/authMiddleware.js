import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ mensagem: 'Não autorizado: Token não fornecido'})
    }
    // se tiver o header authorization criamos uma constante em lista para armazenar o token e fazer a quebra pelo espaço
    const [ , token] = authHeader.split(' ');
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decoded.id;
        next()
    } catch(err){
        return res.status(403).json({mensagem: 'Token inválido'});
    }
};

export { authMiddleware };