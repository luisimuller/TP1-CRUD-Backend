// /src/routes/envioRoutes.js
const express = require("express");
const router = express.Router();
const {
  renderEnviosPage,
  getEnvios,
  getEnvio,
  addEnvio,
  updateEnvio,
  patchEnvio,
  deleteEnvio
} = require("../controllers/EnvioController");

// Página
router.get("/", renderEnviosPage); // GET /envios

// API
router.get("/api", getEnvios);           // GET /envios/api
router.get("/api/:id", getEnvio);        // GET /envios/api/:id
router.post("/api/agregar", addEnvio);   // POST /envios/api/agregar
router.put("/api/:id", updateEnvio);     // PUT /envios/api/:id
router.patch("/api/:id", patchEnvio);    // PATCH /envios/api/:id
router.delete("/api/:id", deleteEnvio);  // DELETE /envios/api/:id

module.exports = router;
