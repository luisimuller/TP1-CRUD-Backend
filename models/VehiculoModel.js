// const database = require("../data/database");

// class VehiculoModel {
//     // Obtener todos los vehiculos
//     getVehiculos() {
//         return database.vehiculos;
//     }
// }

// module.exports = new VehiculoModel();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vehiculoSchema = new Schema({
    patente: 
        {
            type: String,
            required: true,
            unique: true
        },
    tipo: 
        {
            type: String,
            enum: ['Camión', 'Furgón','Camioneta']
        },
    estado: 
        {
            type: String,
            required: true,
            enum: ['Activo', 'En Reparación', 'Retirado']
        },
    capacidad: 
        {
            type: Number,
            required: true
        }
});

module.exports = mongoose.model('VehiculoModel', vehiculoSchema);