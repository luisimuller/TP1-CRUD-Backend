// models/VehiculoModel.js
// Definición del esquema y modelo para los vehículos
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
// Exportar el modelo
module.exports = mongoose.model('VehiculoModel', vehiculoSchema);