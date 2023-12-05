const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 80;

app.use(cors());

// Define la ruta para servir archivos estáticos (como tu archivo HTML)
app.use(express.static(path.join(__dirname, '')));

// Inicia el servidor en el puerto 80
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});