const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['Administrador', 'Chofer', 'Facturista'],
        default: 'Facturista'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Método para encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

// Método para obtener permisos según el rol
usuarioSchema.methods.obtenerPermisos = function() {
    const permisos = {
        Administrador: {
            dashboard: true,
            envios: { ver: true, crear: true, editar: true, eliminar: true },
            flota: { ver: true, crear: true, editar: true, eliminar: true },
            choferes: { ver: true, crear: true, editar: true, eliminar: true },
            clientes: { ver: true, crear: true, editar: true, eliminar: true },
            facturas: { ver: true, crear: true, editar: true, eliminar: true },
            usuarios: { ver: true, crear: true, editar: true, eliminar: true }
        },
        Chofer: {
            dashboard: false,
            envios: { ver: true, crear: false, editar: false, eliminar: false },
            flota: { ver: false, crear: false, editar: false, eliminar: false },
            choferes: { ver: false, crear: false, editar: false, eliminar: false },
            clientes: { ver: false, crear: false, editar: false, eliminar: false },
            facturas: { ver: false, crear: false, editar: false, eliminar: false },
            usuarios: { ver: false, crear: false, editar: false, eliminar: false }
        },
        Facturista: {
            dashboard: false,
            envios: { ver: true, crear: false, editar: false, eliminar: false },
            flota: { ver: false, crear: false, editar: false, eliminar: false },
            choferes: { ver: false, crear: false, editar: false, eliminar: false },
            clientes: { ver: true, crear: false, editar: false, eliminar: false },
            facturas: { ver: true, crear: true, editar: true, eliminar: false },
            usuarios: { ver: false, crear: false, editar: false, eliminar: false }
        }
    };
    
    return permisos[this.rol] || {};
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
