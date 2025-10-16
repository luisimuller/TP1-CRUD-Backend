// /index.js
const express = require("express");
const mongoose = require('mongoose');
const envioRoutes = require("./routes/envioRoutes");
const choferRoutes = require("./routes/ChoferRoutes");
const clienteRoutes = require("./routes/ClienteRoutes");
const facturaRoutes = require("./routes/FacturaRoutes");
const vehiculoRoutes = require("./routes/vehiculoRoutes");


const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());

mongoose.connect("mongodb://localhost/");

//Directoria de recursos estaticos para front

const ChoferModel = require('./models/ChoferModel');
const { getChoferesPug } = require('./controllers/ChoferController');
const { getClientesPug } = require('./controllers/ClienteController');
const { getVehiculosPug } = require('./controllers/VehiculoController');

// Ruta para ver choferes con formato
app.get('/choferes', async (req, res) => {
    //const choferes = ChoferModel.getChoferes();
    const choferes = await getChoferesPug();
    res.render('choferes', {choferes,mostrarAccionesRapidas: false });
});

// Ruta para ver clientes con formato
app.get('/clientes-view', async (req, res) => {
    const clientes = await getClientesPug();
    res.render('clientes', {clientes, mostrarAccionesRapidas: false });
});

// Ruta para ver flota con formato
app.get('/flota', async (req, res) => {
    try {
        console.log('🚚 Cargando página de flota...');
        const vehiculos = await getVehiculosPug();
        console.log(`📊 Vehículos obtenidos para la vista: ${vehiculos ? vehiculos.length : 'null/undefined'}`);
        if (vehiculos && vehiculos.length > 0) {
            console.log('📋 Primeros vehículos:', vehiculos.slice(0, 2));
        }
        res.render('flota', {vehiculos: vehiculos || [], mostrarAccionesRapidas: false });
    } catch (error) {
        console.error('❌ Error al cargar flota:', error);
        res.render('flota', {vehiculos: [], mostrarAccionesRapidas: false });
    }
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/chofer', choferRoutes);

//Pug Templates
app.set('views','./src');
app.set('view engine', 'pug');



// Routes
app.use("/envios", envioRoutes);

app.use("/clientes", clienteRoutes);
app.use("/facturas", facturaRoutes);
app.use("/vehiculos", vehiculoRoutes);

//Rutas HTML
app.get('/index', function (req, res) {
    res.render('index');
});
app.get('/dashboard', function (req, res) {
    res.render('dashboard');
});
app.get('/flota', function (req, res) {
    res.render('flota');
});

app.get('/facturas', function (req, res) {
    res.render('facturas');
});



// Ruta principal
// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "API Sistema de Logística - TP Backend",
        endpoints: {
            envios: {
                listar: "GET /envios",
                obtener: "GET /envios/:id",
                crear: "POST /envios/agregar",
                actualizar: "PUT /envios/:id",
                actualizarParcial: "PATCH /envios/:id",
                eliminar: "DELETE /envios/:id"
            },
            clientes: {
                listar: "GET /clientes",
                obtener: "GET /clientes/:id",
                crear: "POST /clientes/agregar",
                actualizar: "PUT /clientes/:id",
                actualizarParcial: "PATCH /clientes/:id",
                eliminar: "DELETE /clientes/:id"
            },
            choferes: {
                listar: "GET /choferes",
                obtener: "GET /choferes/:id",
                crear: "POST /choferes/agregar",
                actualizar: "PUT /choferes/:id",
                actualizarParcial: "PATCH /choferes/:id",
                eliminar: "DELETE /choferes/:id"
            },
            facturas: {
                listar: "GET /facturas",
                obtener: "GET /facturas/:id",
                crear: "POST /facturas/agregar",
                actualizar: "PUT /facturas/:id",
                actualizarParcial: "PATCH /facturas/:id",
                eliminar: "DELETE /facturas/:id",
                porEnvio: "GET /facturas/envio/:idEnvio"
            }
        }
    });
});


app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}`);
});