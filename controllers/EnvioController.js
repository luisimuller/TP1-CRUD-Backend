// controllers/EnvioController.js
const EnvioModel = require("../models/EnvioModel");

const getEnvios = (req, res) => {
    res.json(EnvioModel.getEnvios());
};

const getEnvio = (req, res) => {
    const envio = EnvioModel.getById(req.params.id);
    if (!envio) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(envio);
};

const addEnvio = (req, res) => {
    const { id, cliente, origen, destino, estado } = req.body;
    if (!id || !cliente || !origen || !destino) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const nuevo = EnvioModel.addEnvio(id, cliente, origen, destino, estado);
    res.status(201).json(nuevo);
};

const updateEnvio = (req, res) => {
    const { cliente, origen, destino, estado } = req.body;
    const actualizado = EnvioModel.updateEnvio(req.params.id, cliente, origen, destino, estado);
    if (!actualizado) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(actualizado);
};

const patchEnvio = (req, res) => {
    const actualizado = EnvioModel.patchEnvio(req.params.id, req.body);
    if (!actualizado) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(actualizado);
};

const deleteEnvio = (req, res) => {
    const eliminado = EnvioModel.removeEnvio(req.params.id);
    if (!eliminado) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json({ message: "Envío eliminado", eliminado });
};

module.exports = {
    getEnvios,
    getEnvio,
    addEnvio,
    updateEnvio,
    patchEnvio,
    deleteEnvio,
};
