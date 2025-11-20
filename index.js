// /index.js
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const envioRoutes = require("./routes/envioRoutes");
const choferRoutes = require("./routes/ChoferRoutes");
const clienteRoutes = require("./routes/ClienteRoutes");
const facturaRoutes = require("./routes/FacturaRoutes");
const vehiculoRoutes = require("./routes/vehiculoRoutes");
const authRoutes = require("./routes/AuthRoutes");
const { 
    requiereAutenticacion, 
    requierePermiso, 
    agregarUsuarioAVista 
} = require('./middleware/auth');


const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB CONNECTION (NOW REMOTE)
// mongoose.connect("mongodb://localhost/");
mongoose.connect("mongodb+srv://User:Password@cluster0.f2gxjdm.mongodb.net/");

// Inicializar usuarios del sistema
const Usuario = require('./models/UsuarioModel');

async function inicializarUsuarios() {
    try {
        // Borrar usuarios existentes y crear los nuevos
        console.log('📝 Verificando usuarios del sistema...');
        
        // Borrar todos los usuarios para recrearlos con la estructura correcta
        await Usuario.deleteMany({});
        console.log('🗑️ Usuarios anteriores eliminados');
        
        // Crear usuarios uno por uno para verificar el proceso de encriptación
        const admin = new Usuario({
            username: 'admin',
            password: 'admin123',
            nombre: 'Administrador',
            rol: 'Administrador',
            email: 'admin@logiflow.com'
        });
        await admin.save();
        console.log('✅ Usuario admin creado');
        
        const chofer = new Usuario({
            username: 'chofer1',
            password: 'chofer123',
            nombre: 'Juan Pérez',
            rol: 'Chofer',
            email: 'chofer1@logiflow.com'
        });
        await chofer.save();
        console.log('✅ Usuario chofer1 creado');
        
        const facturista = new Usuario({
            username: 'facturista1',
            password: 'facturista123',
            nombre: 'María García',
            rol: 'Facturista',
            email: 'facturista1@logiflow.com'
        });
        await facturista.save();
        console.log('✅ Usuario facturista1 creado');
        
        console.log('✅ Todos los usuarios creados exitosamente');
    } catch (error) {
        console.error('❌ Error al inicializar usuarios:', error);
    }
}

// Llamar a la inicialización después de conectar a la BD
mongoose.connection.on('connected', () => {
    console.log('✅ Conectado a MongoDB');
    inicializarUsuarios();
});

// Configuración de sesiones
app.use(session({
    secret: 'logiflow-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://User:Password@cluster0.f2gxjdm.mongodb.net/',
        touchAfter: 24 * 3600 // 24 horas
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Middleware para agregar usuario a las vistas
app.use(agregarUsuarioAVista);

//Pug Templates
app.set('views','./src');
app.set('view engine', 'pug');

//Directoria de recursos estaticos para front
app.use(express.static(path.join(__dirname, 'public')));

const ChoferModel = require('./models/ChoferModel');
const { getChoferesPug } = require('./controllers/ChoferController');
const { getClientesPug } = require('./controllers/ClienteController');
const { getVehiculosPug } = require('./controllers/VehiculoController');
const { getFacturasPug } = require('./controllers/FacturaController');

// Rutas de autenticación (públicas)
app.use('/', authRoutes);

// Ruta para ver choferes con formato (protegida)
app.get('/choferes', requiereAutenticacion, async (req, res) => {
    // Verificar permisos
    if (!req.session.usuario.permisos.choferes || !req.session.usuario.permisos.choferes.ver) {
        return res.status(403).render('error', {
            mensaje: 'No tiene permisos para acceder a esta sección',
            usuario: req.session.usuario
        });
    }
    const choferes = await getChoferesPug();
    res.render('choferes', {choferes,mostrarAccionesRapidas: false });
});

// Ruta para ver clientes con formato (protegida)
app.get('/clientes', requiereAutenticacion, async (req, res) => {
    // Verificar permisos
    if (!req.session.usuario.permisos.clientes || !req.session.usuario.permisos.clientes.ver) {
        return res.status(403).render('error', {
            mensaje: 'No tiene permisos para acceder a esta sección',
            usuario: req.session.usuario
        });
    }
    const clientes = await getClientesPug();
    res.render('clientes', {clientes, mostrarAccionesRapidas: false });
});

// Ruta para ver flota con formato (protegida)
app.get('/flota', requiereAutenticacion, async (req, res) => {
    // Verificar permisos
    if (!req.session.usuario.permisos.flota || !req.session.usuario.permisos.flota.ver) {
        return res.status(403).render('error', {
            mensaje: 'No tiene permisos para acceder a esta sección',
            usuario: req.session.usuario
        });
    }
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

app.use('/chofer', choferRoutes);

// Routes - Solo requieren autenticación, los permisos se verifican dentro de cada ruta
app.use("/envios", requiereAutenticacion, envioRoutes);
app.use("/clientes", requiereAutenticacion, clienteRoutes);
app.use("/facturas", requiereAutenticacion, facturaRoutes);
app.use("/vehiculos", requiereAutenticacion, vehiculoRoutes);

//Rutas HTML (protegidas)
app.get('/index', requiereAutenticacion, function (req, res) {
    res.render('index');
});

app.get('/dashboard', requiereAutenticacion, (req, res) => {
    console.log('📊 Acceso a dashboard - Usuario:', req.session.usuario.username, '- Rol:', req.session.usuario.rol);
    console.log('🔑 Permiso dashboard:', req.session.usuario.permisos.dashboard);
    
    // Si no tiene permiso para dashboard, redirigir a la primera opción disponible
    if (!req.session.usuario.permisos.dashboard) {
        console.log('⚠️ Sin permiso para dashboard, redirigiendo...');
        // Redirigir según el rol
        if (req.session.usuario.rol === 'Chofer') {
            console.log('➡️ Redirigiendo Chofer a /envios');
            return res.redirect('/envios');
        } else if (req.session.usuario.rol === 'Facturista') {
            console.log('➡️ Redirigiendo Facturista a /envios');
            return res.redirect('/envios');
        }
    }
    console.log('✅ Mostrando dashboard');
    res.render('dashboard');
});
// app.get('/flota', function (req, res) {
//     res.render('flota');
// });

app.get('/facturas', requiereAutenticacion, async (req, res) => {
    // Verificar permisos
    if (!req.session.usuario.permisos.facturas || !req.session.usuario.permisos.facturas.ver) {
        return res.status(403).render('error', {
            mensaje: 'No tiene permisos para acceder a esta sección',
            usuario: req.session.usuario
        });
    }
    const facturas = await getFacturasPug();
    res.render('facturas', { facturas });
});


// Ruta principal (pública - redirige al login)
app.get("/", (req, res) => {
    if (req.session.usuario) {
        return res.redirect('/dashboard');
    }
    res.redirect('/login');
});


app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}`);
});