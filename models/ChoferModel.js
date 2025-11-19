// models/ChoferModel.js
// Definición del esquema y modelo para los choferes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var choferSchema = new Schema({
    nombre: {type: String},
    apellido: {type: String},
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    licencia:
        {
            type : String,
            enum : ['Profesional','Civil'] 
        },
    telefono: {
        type: Number,
        required: true
    }
});
// Exportar el modelo
module.exports = mongoose.model('ChoferModel', choferSchema); 