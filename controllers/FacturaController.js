const FacturaModel = require("../models/FacturaModel");

const getFacturas = (req, res) => {
    try {
        res.json(FacturaModel.getFacturas());
    } catch (error) {
        res.status(500).json({ message: "Error al obtener facturas", error: error.message });
    }
};

const getFactura = (req, res) => {
    try {
        const factura = FacturaModel.getById(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la factura", error: error.message });
    }
};

const addFactura = (req, res) => {
    try {
        const { idEnvio, fecha, monto, metodoPago } = req.body;
        
        if (!idEnvio || !fecha || !monto || !metodoPago) {
            return res.status(400).json({ 
                message: "Faltan datos obligatorios: idEnvio, fecha, monto, metodoPago" 
            });
        }
        
        const nuevaFactura = FacturaModel.addFactura({
            idEnvio: parseInt(idEnvio),
            fecha,
            monto: parseFloat(monto),
            metodoPago
        });
        
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFactura = (req, res) => {
    try {
        const actualizado = FacturaModel.updateFactura(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const patchFactura = (req, res) => {
    try {
        const actualizado = FacturaModel.patchFactura(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFactura = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = FacturaModel.removeFactura(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }
        res.json({ message: "Factura eliminada", eliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar factura", error: error.message });
    }
};

// Obtener facturas por envío
const getFacturasByEnvio = (req, res) => {
    try {
        const idEnvio = parseInt(req.params.idEnvio);
        const facturas = FacturaModel.getByEnvio(idEnvio);
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener facturas del envío", error: error.message });
    }
};

module.exports = {
    getFacturas,
    getFactura,
    addFactura,
    updateFactura,
    patchFactura,
    deleteFactura,
    getFacturasByEnvio
};