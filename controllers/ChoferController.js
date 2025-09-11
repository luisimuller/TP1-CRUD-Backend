// /src/controllers/ChoferController.js
const ChoferModel = require("../models/ChoferModel");

const getChoferes = (req, res) => {
    try {
        res.json(ChoferModel.getChoferes());
    } catch (error) {
        res.status(500).json({ message: "Error al obtener choferes", error: error.message });
    }
};

const getChofer = (req, res) => {
    try {
        const chofer = ChoferModel.getById(req.params.id);
        if (!chofer) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json(chofer);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el chofer", error: error.message });
    }
};

const addChofer = (req, res) => {
    try {
        const { nombre, apellido, dni, licencia, telefono } = req.body;
        
        if (!nombre || !apellido || !dni || !licencia || !telefono) {
            return res.status(400).json({ message: "Faltan datos obligatorios: nombre, apellido, dni, licencia, telefono" });
        }
        
        const nuevoChofer = ChoferModel.addChofer({
            nombre, apellido, dni, licencia, telefono
        });
        
        res.status(201).json(nuevoChofer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateChofer = (req, res) => {
    try {
        const actualizado = ChoferModel.updateChofer(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const patchChofer = (req, res) => {
    try {
        const actualizado = ChoferModel.patchChofer(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteChofer = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = ChoferModel.removeChofer(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json({ message: "Chofer eliminado", eliminado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getChoferes,
    getChofer,
    addChofer,
    updateChofer,
    patchChofer,
    deleteChofer
};
