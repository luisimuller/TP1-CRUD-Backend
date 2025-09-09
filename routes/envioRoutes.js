// routes/envioRoutes.js
const express = require("express");
const router = express.Router();
const {
    getEnvios,
    getEnvio,
    addEnvio,
    updateEnvio,
    patchEnvio,
    deleteEnvio
} = require("../controllers/EnvioController");

// Rutas CRUD
router.get("/", getEnvios);              // GET    /envios
router.get("/:id", getEnvio);            // GET    /envios/:id
router.post("/agregar", addEnvio);       // POST   /envios/agregar
router.put("/:id", updateEnvio);         // PUT    /envios/:id
router.patch("/:id", patchEnvio);        // PATCH  /envios/:id
router.delete("/:id", deleteEnvio);      // DELETE /envios/:id

module.exports = router;
