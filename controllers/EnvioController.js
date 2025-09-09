// controllers/EnvioController.js
const EnvioModel = require("../models/EnvioModel");

// GET - listar todos
const getEnvios = (req, res) => {
    res.json(EnvioModel.getEnvios());
};

// GET - listar uno
const getEnvio = (req, res) => {
    const envio = EnvioModel.getById(req.params.id);
    if (!envio) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(envio);
};

// POST - agregar nuevo
const addEnvio = (req, res) => {
    const { id, cliente, origen, destino, estado } = req.body;
    if (!id || !cliente || !origen || !destino) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
    const nuevo = EnvioModel.addEnvio(id, cliente, origen, destino, estado);
    res.status(201).json(nuevo);
};

// PUT - reemplazar envío completo
const updateEnvio = (req, res) => {
    const { cliente, origen, destino, estado } = req.body;
    const actualizado = EnvioModel.updateEnvio(req.params.id, cliente, origen, destino, estado);
    if (!actualizado) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(actualizado);
};

// PATCH - actualizar envío parcialmente
const patchEnvio = (req, res) => {
    const actualizado = EnvioModel.patchEnvio(req.params.id, req.body);
    if (!actualizado) {
        return res.status(404).json({ message: "Envío no encontrado" });
    }
    res.json(actualizado);
};

// DELETE - eliminar envío
const deleteEnvio = (req, res) => {
    const id = parseInt(req.params.id); //asegurar que sea un número
    const eliminado = EnvioModel.removeEnvio(id);
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
