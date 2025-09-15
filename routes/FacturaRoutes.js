const express = require("express");
const router = express.Router();
const {
    getFacturas,
    getFactura,
    addFactura,
    updateFactura,
    patchFactura,
    deleteFactura,
    getFacturasByEnvio
} = require("../controllers/FacturaController");

// Rutas CRUD
router.get("/", getFacturas);                 // GET    /facturas
router.get("/:id", getFactura);               // GET    /facturas/:id
router.post("/agregar", addFactura);          // POST   /facturas/agregar
router.put("/:id", updateFactura);            // PUT    /facturas/:id
router.patch("/:id", patchFactura);           // PATCH  /facturas/:id
router.delete("/:id", deleteFactura);         // DELETE /facturas/:id

// Ruta especial para obtener facturas por envío
router.get("/envio/:idEnvio", getFacturasByEnvio); // GET /facturas/envio/:idEnvio

module.exports = router;