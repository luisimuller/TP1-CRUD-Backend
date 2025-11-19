// controllers/FacturaController.js
// Importar modelos necesarios
const Factura = require("../models/FacturaModel");
const Envio = require("../models/EnvioModel");

// ----------------- RENDER PÁGINA -----------------
// Render página de facturas
const renderFacturasPage = async (req, res) => {
  try {
    // Solo mostrar facturas con envío poblado
    const facturas = await Factura.find().populate("idEnvio").lean();

    // Para el modal: envíos que aún no tienen factura
    const facturados = await Factura.find({}, "idEnvio");
    const idsFacturados = facturados.map(f => f.idEnvio.toString());
    const enviosDisponibles = await Envio.find({ _id: { $nin: idsFacturados } }).lean();

    res.render("facturas", {
      facturas, enviosDisponibles,
      mostrarAccionesRapidas: false
    });
  } catch (err) {
    res.status(500).send("Error al cargar facturas");
  }
};
// ----------------- API -----------------
// GET /facturas/api
const getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find().populate("idEnvio").lean();
    res.json(facturas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /facturas/api/agregar
const addFactura = async (req, res) => {
  try {
    const { idEnvio, fecha, monto, metodoPago } = req.body;

    const envio = await Envio.findById(idEnvio);
    if (!envio) return res.status(400).json({ message: "El envío no existe" });

    const existente = await Factura.findOne({ idEnvio });
    if (existente) return res.status(400).json({ message: "Este envío ya tiene una factura" });

    const factura = await Factura.create({ idEnvio, fecha, monto, metodoPago });
    res.status(201).json(factura);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /facturas/api/:id
const updateFactura = async (req, res) => {
  try {
    const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!factura) return res.status(404).json({ message: "Factura no encontrada" });
    res.json(factura);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /facturas/api/:id
const patchFactura = updateFactura;

// DELETE /facturas/api/:id
const deleteFactura = async (req, res) => {
  try {
    const factura = await Factura.findByIdAndDelete(req.params.id);
    if (!factura) return res.status(404).json({ message: "Factura no encontrada" });
    res.json({ message: "Factura eliminada", factura });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { renderFacturasPage, getFacturas, addFactura, updateFactura, patchFactura, deleteFactura };
