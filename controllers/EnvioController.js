/*const EnvioModel = require("../models/EnvioModel");


const getEnvios = (req, res) => {
    try {
        res.json(EnvioModel.getEnvios());
    } catch (error) {
        res.status(500).json({ message: "Error al obtener envíos", error: error.message });
    }
};


const getEnvio = (req, res) => {
    try {
        const envio = EnvioModel.getById(req.params.id);
        if (!envio) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el envío", error: error.message });
    }
};


const addEnvio = (req, res) => {
    try {
        const { idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo } = req.body;
        
        if (!idCliente || !idVehiculo || !idChofer || !origen || !destino) {
            return res.status(400).json({ message: "Faltan datos obligatorios: idCliente, idVehiculo, idChofer, origen, destino" });
        }
        
        const nuevoEnvio = EnvioModel.addEnvio({
            idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo
        });
        
        res.status(201).json(nuevoEnvio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEnvio = (req, res) => {
    try {
        const actualizado = EnvioModel.updateEnvio(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const patchEnvio = (req, res) => {
    try {
        const actualizado = EnvioModel.patchEnvio(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteEnvio = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = EnvioModel.removeEnvio(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Envío no encontrado" });
        }
        res.json({ message: "Envío eliminado", eliminado });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar envío", error: error.message });
    }
};

module.exports = {
    getEnvios,
    getEnvio,
    addEnvio,
    updateEnvio,
    patchEnvio,
    deleteEnvio
};*/

/// controllers/EnvioController.js

const Envio = require("../models/EnvioModel");
const Cliente = require("../models/ClienteModel");
const Chofer = require("../models/ChoferModel");
const Vehiculo = require("../models/VehiculoModel");
const Factura = require("../models/FacturaModel");

// Función para obtener vehículos para Pug
const getVehiculosPug = async () => {
  try {
    const vehiculos = await Vehiculo.find().lean();
    return vehiculos;
  } catch (err) {
    console.error("Error al obtener vehículos:", err.message);
    return [];
  }
};

// ----------------- RENDER PÁGINA -----------------
const renderEnviosPage = async (req, res) => {
  try {
    const envios = await Envio.find()
      .populate("idCliente")
      .populate("idVehiculo")
      .populate("idChofer")
      .lean();

    const clientes = await Cliente.find().lean();
    const choferes = await Chofer.find().lean();
    const vehiculos = await getVehiculosPug();

    res.render("envios", { envios, clientes, choferes, vehiculos, 
  mostrarAccionesRapidas: false });
  } catch (err) {
    console.error("Error al cargar envíos:", err.message);
    res.status(500).send("Error al cargar envíos");
  }
};

// ----------------- API -----------------
// GET /envios/api
const getEnvios = async (req, res) => {
  try {
    const envios = await Envio.find()
      .populate("idCliente")
      .populate("idVehiculo")
      .populate("idChofer")
      .lean();
    res.json(envios);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener envíos", error: err.message });
  }
};

// GET /envios/api/:id
const getEnvio = async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id)
      .populate("idCliente")
      .populate("idVehiculo")
      .populate("idChofer")
      .lean();
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener envío", error: err.message });
  }
};

// POST /envios/api/agregar
const addEnvio = async (req, res) => {
  try {
    const { idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo } = req.body;

    if (!idCliente || !idVehiculo || !idChofer || !origen || !destino) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const envio = await Envio.create({ idCliente, idVehiculo, idChofer, origen, destino, fechaEnvio, estado, costo });
    res.status(201).json(envio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /envios/api/:id
const updateEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /envios/api/:id
const patchEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /envios/api/:id
const deleteEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndDelete(req.params.id);
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });

    // Eliminar factura asociada
    await Factura.deleteOne({ idEnvio: envio._id });

    res.json({ message: "Envío y factura asociada eliminados", envio });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar envío", error: err.message });
  }
};

module.exports = {
  renderEnviosPage,
  getEnvios,
  getEnvio,
  addEnvio,
  updateEnvio,
  patchEnvio,
  deleteEnvio,
};
