// /src/routes/choferRoutes.js
const express = require("express");
const router = express.Router();
const {
    getChoferes,
    getChofer,
    addChofer,
    updateChofer,
    deleteChofer
} = require("../controllers/ChoferController");

// Rutas CRUD
router.get("/", getChoferes);              // GET    /chofer
router.get("/:id", getChofer);            // GET    /chofer/:id
router.post("/agregar", addChofer);       // POST   /chofer/agregar
router.put("/:id", updateChofer);         // PUT    /chofer/:id
router.patch("/:id", updateChofer);        // PATCH  /chofer/:id
router.delete("/:id", deleteChofer);      // DELETE /chofer/:id

module.exports = router;
