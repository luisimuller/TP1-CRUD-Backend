// models/ClienteModel.js
const database = require("../data/database");

class ClienteModel {
    // Obtener todos
    getClientes() {
        return database.clientes;
    }

    // Obtener por ID
    getById(id) {
        return database.clientes.find(c => c.id === parseInt(id)) || null;
    }

    // Agregar nuevo
    addCliente(clienteData) {
        const nuevoCliente = {
            id: database.clientes.length + 1,
            nombre: clienteData.nombre,
            apellido: clienteData.apellido,
            razonSocial: clienteData.razonSocial,
            direccion: clienteData.direccion || "",
            telefono: clienteData.telefono || "",
            mail: clienteData.mail || ""
        };
        database.clientes.push(nuevoCliente);
        return nuevoCliente;
    }

    // Actualizar completo
    updateCliente(id, clienteData) {
        const index = database.clientes.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;

        database.clientes[index] = { ...database.clientes[index], ...clienteData };
        return database.clientes[index];
    }

    // Actualizar parcial
    patchCliente(id, campos) {
        return this.updateCliente(id, campos);
    }

    // Eliminar
    removeCliente(id) {
        // Validar si tiene envíos antes de eliminar
        if (database.clienteTieneEnvios(id)) {
            throw new Error("No se puede eliminar el cliente porque tiene envíos asociados");
        }

        const index = database.clientes.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;

        return database.clientes.splice(index, 1)[0];
    }
}

module.exports = new ClienteModel();
