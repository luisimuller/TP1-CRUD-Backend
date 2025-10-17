const mongoose = require("mongoose");

const EnvioSchema = new mongoose.Schema({
  idCliente: { type: mongoose.Schema.Types.ObjectId, ref: "ClienteModel", required: true },
  idVehiculo: { type: mongoose.Schema.Types.ObjectId, ref: "VehiculoModel", required: true },
  idChofer: { type: mongoose.Schema.Types.ObjectId, ref: "ChoferModel", required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fechaEnvio: { type: Date, default: Date.now },
  estado: { type: String, default: "pendiente" },
  costo: { type: Number, default: 0 }
});

module.exports = mongoose.model("Envio", EnvioSchema);
