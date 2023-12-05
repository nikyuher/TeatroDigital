const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Almacén temporal de usuarios (en un entorno de producción, usar una base de datos)
const usuarios = [];

// Endpoint para registrar un nuevo usuario
app.post('/api/registro', (req, res) => {
    const { nombre, contrasena } = req.body;

    // Verifica si el usuario ya existe
    const usuarioExistente = usuarios.find(u => u.nombre === nombre);

    if (usuarioExistente) {
        res.json({ mensaje: 'El usuario ya existe' });
    } else {
        // Agrega el nuevo usuario al array
        usuarios.push({ nombre, contrasena });
        res.json({ mensaje: 'Registro exitoso' });
    }
});

// Endpoint para iniciar sesión
app.post('/api/login', (req, res) => {
    const { nombre, contrasena } = req.body;

    // Busca el usuario en el array
    const usuario = usuarios.find(u => u.nombre === nombre && u.contrasena === contrasena);

    if (usuario) {
        res.json({ mensaje: 'Inicio de sesión exitoso',nombre:nombre });
    } else {
        res.json({ mensaje: 'Credenciales incorrectas' });
    }
});

// Agrega esta ruta después de las rutas existentes
app.get('/api/usuarios', (req, res) => {
    res.json({ usuarios });
});


app.get('/', (req, res) => {
    res.send('Lanzado Correctamente')
  })

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});