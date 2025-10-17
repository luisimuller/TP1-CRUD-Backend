/*const database = require("../data/database");

class FacturaModel {
    // Obtener todas las facturas con datos relacionados
    getFacturas() {
        return database.facturas.map(factura => this.enriquecerFactura(factura));
    }
    
    // Obtener factura por ID con datos relacionados
    getById(id) {
        const factura = database.facturas.find(f => f.id === parseInt(id));
        return factura ? this.enriquecerFactura(factura) : null;
    }

    // Agregar nueva factura con validaciones
    addFactura(facturaData) {
        const { idEnvio, fecha, monto, metodoPago } = facturaData;
        
        // Validaciones
        if (!idEnvio || !fecha || !monto || !metodoPago) {
            throw new Error("Faltan datos obligatorios: idEnvio, fecha, monto, metodoPago");
        }

        // Validar que el envío exista (INTERACCIÓN entre módulos)
        const envio = database.envios.find(e => e.id === idEnvio);
        if (!envio) {
            throw new Error("El envío no existe");
        }

        // Validar que el envío no tenga ya una factura
        const facturaExistente = database.facturas.find(f => f.idEnvio === idEnvio);
        if (facturaExistente) {
            throw new Error("Este envío ya tiene una factura asociada");
        }

        // Validar que el monto sea positivo
        if (monto <= 0) {
            throw new Error("El monto debe ser mayor a 0");
        }

        const nuevaFactura = {
            id: Math.max(...database.facturas.map(f => f.id)) + 1,
            idEnvio,
            fecha,
            monto: parseFloat(monto),
            metodoPago
        };
        
        database.facturas.push(nuevaFactura);
        return this.enriquecerFactura(nuevaFactura);
    }

    // Actualizar factura completa
    updateFactura(id, facturaData) {
        const index = database.facturas.findIndex(f => f.id === parseInt(id));
        if (index === -1) return null;
        
        const { idEnvio, monto } = facturaData;
        
        // Validar que el envío exista si se proporciona
        if (idEnvio) {
            const envio = database.envios.find(e => e.id === idEnvio);
            if (!envio) {
                throw new Error("El envío no existe");
            }
            
            // Validar que no se duplique la factura para el mismo envío
            const facturaExistente = database.facturas.find(f => f.idEnvio === idEnvio && f.id !== parseInt(id));
            if (facturaExistente) {
                throw new Error("Ya existe una factura para este envío");
            }
        }
        
        // Validar monto positivo
        if (monto && monto <= 0) {
            throw new Error("El monto debe ser mayor a 0");
        }
        
        database.facturas[index] = { ...database.facturas[index], ...facturaData };
        return this.enriquecerFactura(database.facturas[index]);
    }

    // Actualizar factura parcialmente
    patchFactura(id, campos) {
        return this.updateFactura(id, campos);
    }

    // Eliminar factura
    removeFactura(id) {
        const index = database.facturas.findIndex(f => f.id === parseInt(id));
        if (index === -1) return null;
        
        return database.facturas.splice(index, 1)[0];
    }

    // Obtener facturas por envío
    getByEnvio(idEnvio) {
        const facturas = database.facturas.filter(f => f.idEnvio === parseInt(idEnvio));
        return facturas.map(factura => this.enriquecerFactura(factura));
    }

    // Método privado para enriquecer factura con datos relacionados
    enriquecerFactura(factura) {
        const envio = database.envios.find(e => e.id === factura.idEnvio);
        let envioEnriquecido = null;
        
        if (envio) {
            const cliente = database.getClienteById(envio.idCliente);
            envioEnriquecido = {
                id: envio.id,
                origen: envio.origen,
                destino: envio.destino,
                estado: envio.estado,
                costo: envio.costo,
                cliente: cliente ? {
                    id: cliente.id,
                    nombre: cliente.nombre,
                    razonSocial: cliente.razonSocial
                } : null
            };
        }
        
        return {
            ...factura,
            envio: envioEnriquecido
        };
    }
}

module.exports = new FacturaModel();*/

const mongoose = require("mongoose");

const FacturaSchema = new mongoose.Schema({
  idEnvio: { type: mongoose.Schema.Types.ObjectId, ref: "Envio", required: true, unique: true },
  fecha: { type: Date, default: Date.now },
  monto: { type: Number, required: true },
  metodoPago: { type: String, enum: ["efectivo", "transferencia", "tarjeta"], required: true }
});

module.exports = mongoose.model("Factura", FacturaSchema);

