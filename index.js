const express = require("express");
const envioRoutes = require("./routes/envioRoutes");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Uso de rutas
app.use("/envios", envioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}/envios`);
});