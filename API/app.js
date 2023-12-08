const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Almacén temporal 
const usuarios = [];
const obrasTeatros = [];

// Registrar un nuevo usuario
app.post('/api/registro', (req, res) => {
    const { nombre, contrasena } = req.body;

    const usuarioExistente = usuarios.find(u => u.nombre === nombre);

    if (usuarioExistente) {
        res.json({ mensaje: 'El Usuario ya existe' });
    } else {
        usuarios.push({ nombre, contrasena });
        res.json({ mensaje: 'Registro Exitoso' });
    }
});

//Iniciar sesión
app.post('/api/login', (req, res) => {
    const { nombre, contrasena } = req.body;

    const usuario = usuarios.find(u => u.nombre === nombre && u.contrasena === contrasena);

    if (usuario) {
        res.json({ mensaje: 'Inicio de sesión exitoso', nombre: nombre });
    } else {
        res.json({ mensaje: 'Credenciales Incorrectas' });
    }
});

//Obras Teatro Anadir
app.post('/api/obrasTeatro/anadir', (req, res) => {
    const { genero, imagen, nombre, descripcion, precio } = req.body;

    const obra = obrasTeatros.find(u => u.nombre === nombre);

    if (obra) {
        res.json({ mensaje: 'La Obra ya existe' });
    } else {
        obrasTeatros.push({ genero, imagen, nombre, descripcion, precio });
        res.json({ mensaje: 'Obra añadida Correctamente' });
    }
});


//Buscar obras segun el genero
app.get('/api/obrasTeatro/:genero', (req, res) => {
    const genero = req.params.genero;

    const obrasPorGenero = obrasTeatros.filter(obra => obra.genero === genero);

    if (obrasPorGenero.length > 0) {
        res.json({ obrasTeatro: obrasPorGenero });
    } else {
        res.json({ mensaje: `No hay obras de teatro del genero ${genero}` });
    }
});

//Buscar obra en Especifico
app.get('/api/obrasTeatro/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    const Obra = obrasTeatros.find(obra => obra.nombre === nombre);

    if (Obra) {
        res.json({
            imagen: Obra.imagen,
            nombre: Obra.nombre,
            descripcion: Obra.descripcion,
            precio: Obra.precio
        });
    } else {
        res.json({ mensaje: `No existe la obra ${nombre}` });
    }
});

//Mostrar Obras Teatro
app.get('/api/obrasTeatro', (req, res) => {
    res.json({ obrasTeatros });
});

// Agrega esta ruta después de las rutas existentes
app.get('/api/usuarios', (req, res) => {
    res.json({ usuarios });
});

//Muestra los usuarios creados
app.get('/', (req, res) => {
    res.send('Lanzado Correctamente')
})

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor lanzado en http://localhost:${port}`);
});