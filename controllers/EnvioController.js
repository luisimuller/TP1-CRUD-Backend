// /src/controllers/EnvioController.js
const EnvioModel = require("../models/EnvioModel");


const getEnvios = (req, res) => {
    try {
        res.json(EnvioModel.getEnvios());
    } catch (error) {
        res.status(500).json({ message: "Error al obtener envíos", error: error.message });
    }
};


const getEnvio = (req, res) => {
    try {
        const envio = EnvioModel.getById(req.params.id);
        if (!envio) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el envío", error: error.message });
    }
};


const addEnvio = (req, res) => {
    try {
        const { idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo } = req.body;
        
        if (!idCliente || !idVehiculo || !idChofer || !origen || !destino) {
            return res.status(400).json({ message: "Faltan datos obligatorios: idCliente, idVehiculo, idChofer, origen, destino" });
        }
        
        const nuevoEnvio = EnvioModel.addEnvio({
            idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo
        });
        
        res.status(201).json(nuevoEnvio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEnvio = (req, res) => {
    try {
        const actualizado = EnvioModel.updateEnvio(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const patchEnvio = (req, res) => {
    try {
        const actualizado = EnvioModel.patchEnvio(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteEnvio = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = EnvioModel.removeEnvio(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json({ message: "Envío eliminado", eliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar envío", error: error.message });
    }
};

module.exports = {
    getEnvios,
    getEnvio,
    addEnvio,
    updateEnvio,
    patchEnvio,
    deleteEnvio
};
