// models/FacturaModel.js
// Definición del esquema y modelo para las facturas
const mongoose = require("mongoose");

const FacturaSchema = new mongoose.Schema({
  idEnvio: { type: mongoose.Schema.Types.ObjectId, ref: "Envio", required: true, unique: true },
  fecha: { type: Date, default: Date.now },
  monto: { type: Number, required: true },
  metodoPago: { type: String, enum: ["efectivo", "transferencia", "tarjeta"], required: true }
});
// Exportar el modelo
module.exports = mongoose.model("Factura", FacturaSchema);

