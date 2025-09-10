// /src/models/EnvioModel.js
const database = require("../data/database");

class EnvioModel {
    // Obtener todos los envíos con datos relacionados
    getEnvios() {
        return database.envios.map(envio => this.enriquecerEnvio(envio));
    }
    
    // Obtener envío por ID con datos relacionados
    getById(id) {
        const envio = database.envios.find(e => e.id === parseInt(id));
        return envio ? this.enriquecerEnvio(envio) : null;
    }

    // Agregar nuevo envío con validaciones
    addEnvio(envioData) {
        const { idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo } = envioData;
        
        // Validar referencias (INTERACCIONES entre módulos)
        if (!database.existeCliente(idCliente)) {
            throw new Error("El cliente no existe");
        }
        if (!database.existeVehiculo(idVehiculo)) {
            throw new Error("El vehículo no existe");
        }
        if (!database.existeChofer(idChofer)) {
            throw new Error("El chofer no existe");
        }

        const nuevoEnvio = {
            id: database.envios.length + 1,
            idCliente,
            idVehiculo,
            idChofer,
            origen,
            destino,
            fechaEnvio: fechaEnvio || new Date().toISOString().split('T')[0],
            estado: estado || "pendiente",
            costo: costo || 0
        };
        
        database.envios.push(nuevoEnvio);
        return this.enriquecerEnvio(nuevoEnvio);
    }

    // Actualizar envío completo con validaciones
    updateEnvio(id, envioData) {
        const index = database.envios.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        
        const { idCliente, idVehiculo, idChofer } = envioData;
        
        // Validar referencias si se proporcionan
        if (idCliente && !database.existeCliente(idCliente)) {
            throw new Error("El cliente no existe");
        }
        if (idVehiculo && !database.existeVehiculo(idVehiculo)) {
            throw new Error("El vehículo no existe");
        }
        if (idChofer && !database.existeChofer(idChofer)) {
            throw new Error("El chofer no existe");
        }
        
        database.envios[index] = { ...database.envios[index], ...envioData };
        return this.enriquecerEnvio(database.envios[index]);
    }

    // Actualizar envío parcialmente
    patchEnvio(id, campos) {
        return this.updateEnvio(id, campos);
    }

    // Eliminar envío
    removeEnvio(id) {
        const index = database.envios.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        
        return database.envios.splice(index, 1)[0];
    }

    // Método privado para enriquecer envío con datos relacionados
    enriquecerEnvio(envio) {
        const cliente = database.getClienteById(envio.idCliente);
        const vehiculo = database.getVehiculoById(envio.idVehiculo);
        const chofer = database.getChoferById(envio.idChofer);
        
        return {
            ...envio,
            cliente: cliente ? { 
                id: cliente.id, 
                nombre: cliente.nombre, 
                razonSocial: cliente.razonSocial 
            } : null,
            vehiculo: vehiculo ? { 
                id: vehiculo.id, 
                patente: vehiculo.patente, 
                tipo: vehiculo.tipo 
            } : null,
            chofer: chofer ? { 
                id: chofer.id, 
                nombre: chofer.nombre, 
                apellido: chofer.apellido 
            } : null
        };
    }
}

module.exports = new EnvioModel();
