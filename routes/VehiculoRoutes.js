const express = require("express");
const router = express.Router();
const {
    getVehiculos,
    getVehiculo,
    addVehiculo,
    updateVehiculo,
    patchVehiculo,
    deleteVehiculo
} = require("../controllers/VehiculoController");

// Rutas CRUD
router.get("/", getVehiculos);           // GET    /vehiculos
router.get("/:id", getVehiculo);         // GET    /vehiculos/:id
router.post("/agregar", addVehiculo);    // POST   /vehiculos/agregar
router.put("/:id", updateVehiculo);      // PUT    /vehiculos/:id
router.patch("/:id", patchVehiculo);     // PATCH  /vehiculos/:id
router.delete("/:id", deleteVehiculo);   // DELETE /vehiculos/:id

module.exports = router;