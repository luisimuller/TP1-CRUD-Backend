// // /src/models/ChoferModel.js
// const database = require("../data/database");

// class ChoferModel {
//     // Obtener todos los choferes
//     getChoferes() {
//         return database.choferes;
//     }
    
//     // Obtener chofer por ID
//     getById(id) {
//         return database.choferes.find(c => c.id === parseInt(id)) || null;
//     }

//     // Agregar nuevo chofer
//     addChofer(choferData) {
//         const { nombre, apellido, dni, licencia, telefono } = choferData;
        
//         // Validaciones
//         if (!nombre || !apellido || !dni || !licencia || !telefono) {
//             throw new Error("Faltan datos obligatorios: nombre, apellido, dni, licencia, telefono");
//         }

//         // Validar que el DNI no exista
//         const dniExistente = database.choferes.some(c => c.dni === dni);
//         if (dniExistente) {
//             throw new Error("Ya existe un chofer con este DNI");
//         }

//         // Generar un id único y consecutivo
//         let nuevoId = 1;
//         if (database.choferes.length > 0) {
//             nuevoId = Math.max(...database.choferes.map(chofer => chofer.id)) + 1;
//         }
//         const nuevoChofer = {
//             id: nuevoId,
//             nombre,
//             apellido,
//             dni,
//             licencia,
//             telefono
//         };
        
//         database.choferes.push(nuevoChofer);
//         return nuevoChofer;
//     }

//     // Actualizar chofer completo
//     updateChofer(id, choferData) {
//         const index = database.choferes.findIndex(c => c.id === parseInt(id));
//         if (index === -1) return null;
        
//         const { dni } = choferData;
        
//         // Validar que el DNI no exista en otro chofer
//         if (dni) {
//             const dniExistente = database.choferes.some(c => c.dni === dni && c.id !== parseInt(id));
//             if (dniExistente) {
//                 throw new Error("Ya existe otro chofer con este DNI");
//             }
//         }
        
//         database.choferes[index] = { ...database.choferes[index], ...choferData };
//         return database.choferes[index];
//     }

//     // Actualizar chofer parcialmente
//     patchChofer(id, campos) {
//         return this.updateChofer(id, campos);
//     }

//     // Eliminar chofer con validación de dependencias
//     removeChofer(id) {
//         const index = database.choferes.findIndex(c => c.id === parseInt(id));
//         if (index === -1) return null;
        
//         // Validar que el chofer no tenga envíos asignados (INTERACCIÓN entre módulos)
//         const choferTieneEnvios = database.envios.some(e => e.idChofer === parseInt(id));
//         if (choferTieneEnvios) {
//             throw new Error("No se puede eliminar el chofer porque tiene envíos asignados");
//         }
        
//         return database.choferes.splice(index, 1)[0];
//     }

//     // Buscar chofer por DNI
//     getByDni(dni) {
//         return database.choferes.find(c => c.dni === dni) || null;
//     }
// }

// module.exports = new ChoferModel();

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

module.exports = mongoose.model('ChoferModel', choferSchema); 