const VehiculoModel = require("../models/VehiculoModel");

const getVehiculos = (req, res) => {
    try {
        res.json(VehiculoModel.getVehiculos());
    } catch (error) {
        res.status(500).json({ message: "Error al obtener Vehiculos", error: error.message });
    }
};

module.exports = {
    getVehiculos
};
