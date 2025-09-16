const database = require("../data/database");

class VehiculoModel {
    // Obtener todos los vehiculos
    getVehiculos() {
        return database.vehiculos;
    }
}
module.exports = new VehiculoModel();