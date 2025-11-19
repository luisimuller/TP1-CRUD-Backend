// controllers/ClienteController.js
// Importar el modelo de Cliente
const ClienteModel = require("../models/ClienteModel");
// Importar mongoose
var mongoose = require('mongoose');
// Obtener el modelo de Cliente
var Cliente = mongoose.model('ClienteModel');
// Funciones del controlador
const getClientesPug = async () => {
    return await Cliente.find({});
};

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find({});
        res.status(200).json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
    }
};

const addCliente = async (req, res) => {
    try {
        const { nombre, apellido, razonSocial, direccion, telefono, mail } = req.body;
        
        if (!nombre || !apellido || !razonSocial) {
            return res.status(400).json({ message: "Faltan datos obligatorios: nombre, apellido, razonSocial" });
        }
        
        const nuevoCliente = new Cliente({
            nombre: nombre,
            apellido: apellido,
            razonSocial: razonSocial,
            direccion: direccion || "",
            telefono: telefono || "",
            mail: mail || ""
        });

        await nuevoCliente.save();
        
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        const { nombre, apellido, razonSocial, direccion, telefono, mail } = req.body;

        const actualizado = await Cliente.updateOne({_id: req.params.id}, {
            nombre,
            apellido,
            razonSocial,
            direccion,
            telefono,
            mail
        });
        
        if (!actualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const patchCliente = async (req, res) => {
    try {
        const actualizado = await Cliente.updateOne({_id: req.params.id}, req.body);
        
        if (!actualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const clienteToDel = await Cliente.findById(id);
        
        if (!clienteToDel) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        
        const eliminado = await clienteToDel.deleteOne().exec();

        res.json({ message: "Cliente eliminado", eliminado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Exportar las funciones del controlador
module.exports = {
    getClientes,
    getClientesPug,
    getCliente,
    addCliente,
    updateCliente,
    patchCliente,
    deleteCliente
};
