// models/EnvioModel.js
class EnvioModel {
    constructor() {
        this.envios = [
            { id: 1, cliente: "Pepe", origen: "Buenos Aires", destino: "Córdoba", estado: "pendiente" },
            { id: 2, cliente: "Natalia Natalia", origen: "Rosario", destino: "Mendoza", estado: "en tránsito" }
        ];
    }

    // Obtener todos los envíos
    getEnvios() {
        return this.envios;
    }
    
    // Obtener envío por ID
    getById(id) {
        return this.envios.find(e => e.id === parseInt(id)) || null;
    }

    // Agregar nuevo envío
    addEnvio(id, cliente, origen, destino, estado) {
        const nuevoEnvio = { id: parseInt(id), cliente, origen, destino, estado: estado || "pendiente" };
        this.envios.push(nuevoEnvio);
        return nuevoEnvio;
    }

    // Actualizar envío completo (PUT)
    updateEnvio(id, cliente, origen, destino, estado) {
        const index = this.envios.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        this.envios[index] = { id: parseInt(id), cliente, origen, destino, estado };
        return this.envios[index];
    }

    // Actualizar envío parcialmente (PATCH)
    patchEnvio(id, campos) {
        const index = this.envios.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        this.envios[index] = { ...this.envios[index], ...campos };
        return this.envios[index];
    }

    // Eliminar envío (DELETE)
    removeEnvio(id) {
        const index = this.envios.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = this.envios[index];
        this.envios.splice(index, 1);
        return eliminado;
    }
}

module.exports = new EnvioModel();
