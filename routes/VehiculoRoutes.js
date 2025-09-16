const express = require("express");
const router = express.Router();
const {
    getVehiculos
} = require("../controllers/VehiculoController");

// Rutas CRUD
router.get("/", getVehiculos);       // GET    /vehiculos

module.exports = router;