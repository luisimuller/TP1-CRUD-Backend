// models/ClienteModel.js
// Definición del esquema y modelo para los clientes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        default: ""
    },
    telefono: {
        type: String,
        default: ""
    },
    mail: {
        type: String,
        default: ""
    }
});
// Exportar el modelo
module.exports = mongoose.model('ClienteModel', clienteSchema);