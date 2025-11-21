const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Ruta para mostrar el formulario de login
router.get('/login', (req, res, next) => {
    console.log('🌐 GET /login solicitado');
    AuthController.mostrarLogin(req, res);
});

// Ruta para procesar el login
router.post('/login', (req, res, next) => {
    console.log('🌐 POST /login solicitado');
    AuthController.login(req, res);
});

// Ruta para cerrar sesión
router.get('/logout', AuthController.logout);

module.exports = router;
