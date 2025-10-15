const VehiculoModel = require("../models/VehiculoModel");
var mongoose = require('mongoose');
var Vehiculo = mongoose.model('VehiculoModel');

const getVehiculos = async (req, res) =>{
    try{
        const vehiculos = await Vehiculo.find({});
        res.status(200).json(vehiculos);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};
// const getVehiculos = (req, res) => {
//     try {
//         res.json(VehiculoModel.getVehiculos());
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener Vehiculos", error: error.message });
//     }
// };

module.exports = {
    getVehiculos
};
