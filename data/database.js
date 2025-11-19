// data/database.js
// Simulación de una base de datos en memoria
class Database {
    constructor() {
        this.clientes = [
            { id: 1, nombre: "Pepe", apellido: "Gómez", razonSocial: "Pepe SRL", direccion: "Calle 123", telefono: "123456789", mail: "pepe@mail.com" },
            { id: 2, nombre: "Natalia", apellido: "López", razonSocial: "Nati SA", direccion: "Av. Siempre 456", telefono: "987654321", mail: "natalia@mail.com" }
        ];

        this.vehiculos = [
            { id: 1, patente: "ABC123", tipo: "camión", capacidad: "5000kg", estado: "activo" },
            { id: 2, patente: "DEF456", tipo: "furgón", capacidad: "2000kg", estado: "activo" }
        ];

        this.choferes = [
            { id: 1, nombre: "Carlos", apellido: "Pérez", dni: "30123456", licencia: "Profesional", telefono: "111222333" },
            { id: 2, nombre: "Laura", apellido: "Rodríguez", dni: "28987654", licencia: "Profesional", telefono: "444555666" }
        ];

        this.envios = [
            { id: 1, idCliente: 1, idVehiculo: 1, idChofer: 1, origen: "Buenos Aires", destino: "Córdoba", fechaEnvio: "2024-01-15", estado: "pendiente", costo: 1500 },
            { id: 2, idCliente: 2, idVehiculo: 2, idChofer: 2, origen: "Rosario", destino: "Mendoza", fechaEnvio: "2024-01-16", estado: "en tránsito", costo: 1200 }
        ];

        this.facturas = [
            { id: 1, idEnvio: 1, fecha: "2024-01-16", monto: 1500, metodoPago: "transferencia" },
            { id: 2, idEnvio: 2, fecha: "2024-01-17", monto: 1200, metodoPago: "efectivo" }
        ];
    }

    // Métodos de validación para interacciones
    existeCliente(idCliente) {
        return this.clientes.some(cliente => cliente.id === idCliente);
    }

    existeVehiculo(idVehiculo) {
        return this.vehiculos.some(vehiculo => vehiculo.id === idVehiculo);
    }

    existeChofer(idChofer) {
        return this.choferes.some(chofer => chofer.id === idChofer);
    }

    getClienteById(idCliente) {
        return this.clientes.find(cliente => cliente.id === idCliente);
    }

    getVehiculoById(idVehiculo) {
        return this.vehiculos.find(vehiculo => vehiculo.id === idVehiculo);
    }

    getChoferById(idChofer) {
        return this.choferes.find(chofer => chofer.id === idChofer);
    }

    clienteTieneEnvios(idCliente) {
        return this.envios.some(envio => envio.idCliente === idCliente);
    }
}

module.exports = new Database();
