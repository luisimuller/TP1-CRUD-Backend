// controllers/EnvioController.js
// Importar modelos necesarios
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
  console.log('📄 Renderizando página de envíos');
  console.log('👤 Usuario:', req.session.usuario?.username, '- Rol:', req.session.usuario?.rol);
  console.log('🔑 Permisos envíos:', req.session.usuario?.permisos?.envios);
  
  // Verificar permisos
  if (!req.session.usuario.permisos.envios || !req.session.usuario.permisos.envios.ver) {
    console.log('❌ Acceso denegado a envíos');
    return res.status(403).render('error', {
      mensaje: 'No tiene permisos para acceder a esta sección',
      usuario: req.session.usuario
    });
  }
  
  console.log('✅ Acceso permitido a envíos');
  
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
// Funciones del controlador
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


const updateEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const patchEnvio = async (req, res) => {
  try {
    const envio = await Envio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!envio) return res.status(404).json({ message: "Envío no encontrado" });
    res.json(envio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


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

// Exportar las funciones del controlador
module.exports = {
  renderEnviosPage,
  getEnvios,
  getEnvio,
  addEnvio,
  updateEnvio,
  patchEnvio,
  deleteEnvio,
};
