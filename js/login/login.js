// login register
$(document).ready(function () {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    // Manejar el envío del formulario de registro
    $('#formulario').on('submit', function (e) {
        e.preventDefault();

        const nombre = $('#nombre').val();
        const contrasena = $('#contrasena').val();

        // Realizar una solicitud POST a la API para registrar un nuevo usuario
        $.ajax({
            url: 'http://localhost:3000/api/registro',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre, contrasena }),
            success: function (data) {
                console.log(data);
                $('#respuesta').text(data.mensaje);

                if (data.mensaje === 'Registro exitoso') {
                    window.location.href = 'login.html';
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    // Manejar el envío del formulario de inicio de sesión
    $('#formularioL').on('submit', function (e) {
        e.preventDefault();

        const nombre2 = $('#nombre2').val();
        const contrasena2 = $('#contrasena2').val();

        // Realizar una solicitud POST a la API para iniciar sesión
        $.ajax({
            url: 'http://localhost:3000/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nombre: nombre2, contrasena: contrasena2 }),
            success: function (data) {

                console.log(data);

                $('#respuesta2').text(data.mensaje);

                if (data.mensaje === 'Inicio de sesión exitoso') {

                    sessionStorage.setItem('nombreUsuario', data.nombre);

                    window.location.href = '../Index.html';
                    
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});
