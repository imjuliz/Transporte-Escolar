import { adicionarIncidente } from "../models/incidentes.js";

const adicionarIncidenteController = async (req, res) => {
    try {
        await adicionarIncidente(req.body);
        res.status(201).json({ mensagem: 'Incidente adicionado com sucesso!!!' })
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export { adicionarIncidenteController };