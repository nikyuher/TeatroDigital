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
const reservasUsuario = [];

/*
+----------------------------+
|                            |
| Api Crear e Iniciar Cuenta | 
+----------------------------+

*/

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

/*

+----------------------------+
|                            |
|    Api Obras de Teatro     | 
+----------------------------+

*/

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

/*

+----------------------------+
|                            |
|     Api Reserva Obra       | 
+----------------------------+

*/

//Realizar Reservas
app.post('/api/reservas/comprar', (req, res) => {
    const { usuario, obra, asiento, precio } = req.body;

    const Usuario = usuarios.find(u => u.nombre === usuario);

    if (Usuario) {
        const verificar = reservasUsuario.find(u => u.obra === obra && u.asiento === asiento);

        if (verificar) {
            res.json({ mensaje: 'Ese asiento ya esta reservado' });
        } else {
            reservasUsuario.push({ usuario, obra, asiento, precio });
            res.json({ mensaje: 'Reserva realizada' });
        }
    } else {
        res.json({ mensaje: 'No has Iniciado Sesion' });
    }

});


// Mostrar reservas de usuario
app.get('/api/reservas/:usuario', (req, res) => {
    const usuario = req.params.usuario;

    const reservasDelUsuario = reservasUsuario.filter(u => u.usuario === usuario);

    if (reservasDelUsuario.length > 0) {
        res.json({ reservasUsuario: reservasDelUsuario });
    } else {
        res.json({ mensaje: `No existen reservas para el usuario ${usuario}` });
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

//Mostrar Reservas
app.get('/api/reservas', (req, res) => {
    res.json({ reservasUsuario });
});

//Muestra los usuarios creados
app.get('/', (req, res) => {
    res.send('Lanzado Correctamente')
})

// Inicia el servidor
app.listen(port, () => {
    console.log(`API lanzada en http://localhost:${port}`);
});