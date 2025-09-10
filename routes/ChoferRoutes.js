// /src/routes/choferRoutes.js
const express = require("express");
const router = express.Router();
const {
    getChoferes,
    getChofer,
    addChofer,
    updateChofer,
    patchChofer,
    deleteChofer
} = require("../controllers/ChoferController");

// Rutas CRUD
router.get("/", getChoferes);              // GET    /choferes
router.get("/:id", getChofer);            // GET    /choferes/:id
router.post("/agregar", addChofer);       // POST   /choferes/agregar
router.put("/:id", updateChofer);         // PUT    /choferes/:id
router.patch("/:id", patchChofer);        // PATCH  /choferes/:id
router.delete("/:id", deleteChofer);      // DELETE /choferes/:id

module.exports = router;
