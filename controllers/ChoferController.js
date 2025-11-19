// controllers/ChoferController.js
// Importar el modelo de Chofer
const ChoferModel = require("../models/ChoferModel");
// Importar mongoose
var mongoose = require('mongoose');
// Obtener el modelo de Chofer
var Chofer = mongoose.model('ChoferModel');
// Funciones del controlador
const getChoferesPug = async () => {
  return await Chofer.find({});
};

const getChoferes = async (req, res) =>{
    try{
        const choferes = await Chofer.find({});
        res.status(200).json(choferes);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

const getChofer = async (req, res) => {
    try {
        const chofer = await Chofer.findById(req.params.id);
        if (!chofer) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json(chofer);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el chofer", error: error.message });
    }
};

const addChofer = async (req, res) => {
    try {
        const { nombre, apellido, dni, licencia, telefono } = req.body;
        
        if (!nombre || !apellido || !dni || !licencia || !telefono) {
            return res.status(400).json({ message: "Faltan datos obligatorios: nombre, apellido, dni, licencia, telefono" });
        }
        
        const nuevoChofer = new Chofer({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            licencia: licencia,
            telefono: telefono
        });

        await nuevoChofer.save();
        
        res.status(201).json(nuevoChofer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateChofer = async (req, res) => {
    try {
        const { nombre, apellido, dni, licencia, telefono } = req.body;

        const actualizado = await Chofer.updateOne({_id: req.params.id},{
            nombre,
            apellido,
            dni,
            licencia,
            telefono
    });
        if (!actualizado) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteChofer = async (req, res) => {
    try {
        const id = req.params.id;
        const choferToDel = await Chofer.findById(id);
        
        const eliminado = await choferToDel.deleteOne().exec();

        if (!eliminado) {
            return res.status(404).json({ message: "Chofer no encontrado" });
        }
        res.json({ message: "Chofer eliminado", eliminado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Exportar las funciones del controlador
module.exports = {
    getChoferes,
    getChoferesPug,
    getChofer,
    addChofer,
    updateChofer,
    deleteChofer
};
