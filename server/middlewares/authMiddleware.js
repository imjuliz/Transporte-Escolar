const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token === "SEGREDO") {
        next(); // Autenticado
    } else {
        res.status(401).send("Acesso não autorizado");
    }
};

export { authMiddleware };