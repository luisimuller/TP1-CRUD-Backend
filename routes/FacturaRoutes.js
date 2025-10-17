const express = require("express");
const router = express.Router();
const { renderFacturasPage, getFacturas, addFactura, updateFactura, patchFactura, deleteFactura } = require("../controllers/FacturaController");

// Página
router.get("/", renderFacturasPage);

// API
router.get("/api", getFacturas);
router.post("/api/agregar", addFactura);
router.put("/api/:id", updateFactura);
router.patch("/api/:id", patchFactura);
router.delete("/api/:id", deleteFactura);

module.exports = router;
