// controllers/ClienteController.js
const ClienteModel = require("../models/ClienteModel");

// // Obtener todos los clientes
// const getClientes = (req, res) => {
//     try {
//         res.json(ClienteModel.getClientes());
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener clientes", error: error.message });
//     }
// };

// // Obtener cliente por ID
// const getCliente = (req, res) => {
//     try {
//         const cliente = ClienteModel.getById(req.params.id);
//         if (!cliente) {
//             return res.status(404).json({ message: "Cliente no encontrado" });
//         }
//         res.json(cliente);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener cliente", error: error.message });
//     }
// };

// Agregar cliente
const addCliente = (req, res) => {
    try {
        const { nombre, apellido, razonSocial, direccion, telefono, mail } = req.body;

        if (!nombre || !apellido || !razonSocial) {
            return res.status(400).json({ message: "Faltan datos obligatorios: nombre, apellido, razonSocial" });
        }

        const nuevoCliente = ClienteModel.addCliente({ nombre, apellido, razonSocial, direccion, telefono, mail });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar cliente (PUT)
const updateCliente = (req, res) => {
    try {
        const actualizado = ClienteModel.updateCliente(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar cliente parcialmente (PATCH)
const patchCliente = (req, res) => {
    try {
        const actualizado = ClienteModel.patchCliente(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar cliente
const deleteCliente = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = ClienteModel.removeCliente(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente eliminado", eliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente", error: error.message });
    }
};

var mongoose = require('mongoose');
var Cliente = mongoose.model('ClienteModel');

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        res.json( await Cliente.find({}));
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes", error: error.message });
    }
};

// Obtener cliente por ID
const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener cliente", error: error.message });
    }
};

module.exports = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    patchCliente,
    deleteCliente
};
