const Usuario = require('../models/UsuarioModel');

class AuthController {
    // Mostrar formulario de login
    static mostrarLogin(req, res) {
        console.log('📄 Mostrando formulario de login');
        if (req.session.usuario) {
            return res.redirect('/dashboard');
        }
        res.render('login', { error: null });
    }

    // Procesar login
    static async login(req, res) {
        console.log('🔐 POST /login recibido');
        console.log('📦 Body:', req.body);
        try {
            const { username, password } = req.body;

            console.log('🔐 Intento de login:', { username, password: '***' });

            // Validar que se proporcionen los datos
            if (!username || !password) {
                console.log('❌ Faltan credenciales');
                return res.render('login', { 
                    error: 'Por favor ingrese usuario y contraseña' 
                });
            }

            // Buscar usuario
            const usuario = await Usuario.findOne({ username, activo: true });

            console.log('👤 Usuario encontrado:', usuario ? 'Sí' : 'No');

            if (!usuario) {
                console.log('❌ Usuario no encontrado o inactivo');
                return res.render('login', { 
                    error: 'Usuario o contraseña incorrectos' 
                });
            }

            // Verificar contraseña
            const passwordValida = await usuario.compararPassword(password);

            console.log('🔑 Contraseña válida:', passwordValida);

            if (!passwordValida) {
                console.log('❌ Contraseña incorrecta');
                return res.render('login', { 
                    error: 'Usuario o contraseña incorrectos' 
                });
            }

            // Crear sesión
            req.session.usuario = {
                id: usuario._id,
                username: usuario.username,
                nombre: usuario.nombre,
                rol: usuario.rol,
                email: usuario.email,
                permisos: usuario.obtenerPermisos()
            };

            console.log('✅ Login exitoso:', usuario.username, '-', usuario.rol);
            console.log('🔑 Permisos asignados:', JSON.stringify(req.session.usuario.permisos, null, 2));

            // Guardar sesión antes de redirigir
            req.session.save((err) => {
                if (err) {
                    console.error('Error al guardar sesión:', err);
                }
                res.redirect('/dashboard');
            });

        } catch (error) {
            console.error('Error en login:', error);
            res.render('login', { 
                error: 'Error al iniciar sesión. Intente nuevamente.' 
            });
        }
    }

    // Cerrar sesión
    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
            }
            res.redirect('/login');
        });
    }

    // Crear usuario inicial (solo para desarrollo)
    static async crearUsuarioInicial(req, res) {
        try {
            // Verificar si ya existe un administrador
            const adminExiste = await Usuario.findOne({ rol: 'Administrador' });

            if (adminExiste) {
                return res.json({ 
                    message: 'Ya existe un usuario administrador',
                    usuario: adminExiste.username 
                });
            }

            // Crear usuarios de prueba
            const usuariosIniciales = [
                {
                    username: 'admin',
                    password: 'admin123',
                    nombre: 'Administrador',
                    rol: 'Administrador',
                    email: 'admin@logiflow.com'
                },
                {
                    username: 'chofer1',
                    password: 'chofer123',
                    nombre: 'Juan Pérez',
                    rol: 'Chofer',
                    email: 'chofer1@logiflow.com'
                },
                {
                    username: 'facturista1',
                    password: 'facturista123',
                    nombre: 'María García',
                    rol: 'Facturista',
                    email: 'facturista1@logiflow.com'
                }
            ];

            const usuariosCreados = await Usuario.insertMany(usuariosIniciales);

            res.json({ 
                message: 'Usuarios iniciales creados exitosamente',
                usuarios: usuariosCreados.map(u => ({
                    username: u.username,
                    rol: u.rol
                }))
            });

        } catch (error) {
            console.error('Error al crear usuarios iniciales:', error);
            res.status(500).json({ 
                error: 'Error al crear usuarios iniciales',
                detalle: error.message 
            });
        }
    }

    // Registrar nuevo usuario (solo para admin)
    static async registrar(req, res) {
        try {
            const { username, password, nombre, rol, email } = req.body;

            // Validar que el usuario actual sea administrador
            if (req.session.usuario.rol !== 'Administrador') {
                return res.status(403).json({ 
                    error: 'No tiene permisos para crear usuarios' 
                });
            }

            // Verificar si el usuario ya existe
            const usuarioExiste = await Usuario.findOne({ 
                $or: [{ username }, { email }] 
            });

            if (usuarioExiste) {
                return res.status(400).json({ 
                    error: 'El usuario o email ya existe' 
                });
            }

            // Crear nuevo usuario
            const nuevoUsuario = new Usuario({
                username,
                password,
                nombre,
                rol,
                email
            });

            await nuevoUsuario.save();

            res.json({ 
                message: 'Usuario creado exitosamente',
                usuario: {
                    username: nuevoUsuario.username,
                    nombre: nuevoUsuario.nombre,
                    rol: nuevoUsuario.rol
                }
            });

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ 
                error: 'Error al crear usuario',
                detalle: error.message 
            });
        }
    }
}

module.exports = AuthController;
