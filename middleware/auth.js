// Middleware para verificar si el usuario está autenticado
const requiereAutenticacion = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
};

// Middleware para verificar roles específicos
const requiereRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.session.usuario) {
            return res.redirect('/login');
        }

        if (!rolesPermitidos.includes(req.session.usuario.rol)) {
            return res.status(403).render('error', {
                mensaje: 'No tiene permisos para acceder a esta sección',
                usuario: req.session.usuario
            });
        }

        next();
    };
};

// Middleware para verificar permisos específicos en una sección
const requierePermiso = (seccion, accion = 'ver') => {
    return (req, res, next) => {
        if (!req.session.usuario) {
            return res.redirect('/login');
        }

        const permisos = req.session.usuario.permisos;

        // Si es administrador, permitir todo
        if (req.session.usuario.rol === 'Administrador') {
            return next();
        }

        // Verificar si tiene permisos para la sección
        if (!permisos[seccion]) {
            return res.status(403).render('error', {
                mensaje: 'No tiene permisos para acceder a esta sección',
                usuario: req.session.usuario
            });
        }

        // Verificar si tiene permiso para la acción específica
        if (typeof permisos[seccion] === 'object' && !permisos[seccion][accion]) {
            return res.status(403).render('error', {
                mensaje: `No tiene permisos para ${accion} en esta sección`,
                usuario: req.session.usuario
            });
        }

        // Si la sección solo requiere acceso (boolean true)
        if (typeof permisos[seccion] === 'boolean' && !permisos[seccion]) {
            return res.status(403).render('error', {
                mensaje: 'No tiene permisos para acceder a esta sección',
                usuario: req.session.usuario
            });
        }

        next();
    };
};

// Middleware para agregar información del usuario a todas las vistas
const agregarUsuarioAVista = (req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    res.locals.estaAutenticado = !!req.session.usuario;
    next();
};

module.exports = {
    requiereAutenticacion,
    requiereRol,
    requierePermiso,
    agregarUsuarioAVista
};
