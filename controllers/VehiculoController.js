// controllers/VehiculoController.js
// Importar el modelo Vehiculo
const Vehiculo = require("../models/VehiculoModel");
//Funciones del controlador 
const getVehiculosPug = async () => {
    try {
        console.log('🔍 Buscando vehículos para Pug...');
        const Vehiculo = require("../models/VehiculoModel");
        const vehiculos = await Vehiculo.find({});
        console.log(`📊 Encontrados ${vehiculos.length} vehículos`);
        return vehiculos;
    } catch (error) {
        console.error('❌ Error al obtener vehículos para Pug:', error.message);
    }
};

const getVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find({});
        res.status(200).json(vehiculos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el vehículo", error: error.message });
    }
};

const addVehiculo = async (req, res) => {
    try {
        const { patente, tipo, estado, capacidad } = req.body;

        if (!patente || !tipo || !estado || !capacidad) {
            return res.status(400).json({ message: "Faltan datos obligatorios: patente, tipo, estado, capacidad" });
        }

        const nuevoVehiculo = new Vehiculo({
            patente: patente,
            tipo: tipo,
            estado: estado,
            capacidad: capacidad
        });

        await nuevoVehiculo.save();

        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Ya existe un vehículo con esa patente" });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

const updateVehiculo = async (req, res) => {
    try {
        const { patente, tipo, estado, capacidad } = req.body;

        const actualizado = await Vehiculo.updateOne({ _id: req.params.id }, {
            patente,
            tipo,
            estado,
            capacidad
        });

        if (!actualizado) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Ya existe un vehículo con esa patente" });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

const patchVehiculo = async (req, res) => {
    try {
        const actualizado = await Vehiculo.updateOne({ _id: req.params.id }, req.body);

        if (!actualizado) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Ya existe un vehículo con esa patente" });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

const deleteVehiculo = async (req, res) => {
    try {
        const id = req.params.id;
        const vehiculoToDel = await Vehiculo.findById(id);

        if (!vehiculoToDel) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        const eliminado = await vehiculoToDel.deleteOne().exec();

        res.json({ message: "Vehículo eliminado", eliminado });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Exportar las funciones del controlador
module.exports = {
    getVehiculos,
    getVehiculosPug,
    getVehiculo,
    addVehiculo,
    updateVehiculo,
    patchVehiculo,
    deleteVehiculo
};
