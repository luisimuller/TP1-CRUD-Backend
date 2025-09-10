// /index.js
const express = require("express");
const envioRoutes = require("./routes/envioRoutes");
const choferRoutes = require("./routes/ChoferRoutes"); // ← Agregar esta línea

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/envios", envioRoutes);
app.use("/choferes", choferRoutes); // ← Agregar esta línea

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "API Sistema de Logística - TP Backend",
        endpoints: {
            envios: {
                listar: "GET /envios",
                obtener: "GET /envios/:id",
                crear: "POST /envios/agregar",
                actualizar: "PUT /envios/:id",
                actualizarParcial: "PATCH /envios/:id",
                eliminar: "DELETE /envios/:id"
            },
            choferes: {
                listar: "GET /choferes",
                obtener: "GET /choferes/:id",
                crear: "POST /choferes/agregar",
                actualizar: "PUT /choferes/:id",
                actualizarParcial: "PATCH /choferes/:id",
                eliminar: "DELETE /choferes/:id"
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}`);
});

