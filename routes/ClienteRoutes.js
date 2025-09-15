// /routes/clienteRoutes.js
const express = require("express");
const router = express.Router();
const {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    patchCliente,
    deleteCliente
} = require("../controllers/ClienteController");

// Rutas CRUD
router.get("/", getClientes);              // GET    /clientes
router.get("/:id", getCliente);            // GET    /clientes/:id
router.post("/agregar", addCliente);       // POST   /clientes/agregar
router.put("/:id", updateCliente);         // PUT    /clientes/:id
router.patch("/:id", patchCliente);        // PATCH  /clientes/:id
router.delete("/:id", deleteCliente);      // DELETE /clientes/:id

module.exports = router;
