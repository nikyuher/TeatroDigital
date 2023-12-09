document.addEventListener('DOMContentLoaded', function () {

    /*Si hay un evento en la clase redirige a una nueva pestaña*/
    $('.letraTextoGeneral').on('click', '.cajaGenero', function (e) {
        e.preventDefault();

        /* Obtener Valores */
        var linkElement = $(this).find('a');
        var urlBase = linkElement.attr('href');
        var nombreObra = $(this).data('nombre');

        /* Construir la nueva URL */
        var nuevaURL = urlBase + '?obra=' + nombreObra;

        /* Redirigir a la nueva URL */
        window.location.href = nuevaURL;
    });

    /* Obtener el nombre de la obra de la URL */
    var params = new URLSearchParams(window.location.search);
    let nombreObra = params.get('obra');
    console.log('Nombre de la obra:', nombreObra);
    /* Realizar una solicitud a la API para obtener valores de la obra*/

    $.ajax({
        url: `http://localhost:3000/api/obrasTeatro/nombre/${nombreObra}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('.contImagenObraPopular').html(`<img src="/imagenes/${data.imagen}" alt="${data.imagen}">`);
            $('#tituloObra').text(data.nombre);
            $('#descripcionCompra').text(data.descripcion);
            $('#inputPrecio').val(data.precio);
            $('#inputNombreObra').val(data.nombre);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    // Variable global para almacenar el estado de los botones
    let estadoBotones = {};

    // Asigna el evento click a los botones y agrega el valor al atributo data-nombre-obra
    $('.contenedorBloques button').each(function () {
        let valorBoton = $(this).text();
        let nombreObraBoton = nombreObra.replace(/\s+/g, '') + valorBoton;

        // Recupera el estado almacenado previamente
        let estadoGuardado = localStorage.getItem('estadoBotones');
        estadoBotones = estadoGuardado ? JSON.parse(estadoGuardado) : {};

        // Verifica si hay un color guardado para este botón
        if (estadoBotones[nombreObraBoton] === 'color-rojo') {
            $(this).addClass('color-rojo').css('background-color', 'red');
        }

        // Agrega el valor del botón al atributo data-nombre-obra
        $(this).attr('data-nombre-obra', nombreObraBoton);

        $(this).on('click', function () {
            let sitioAsiento = $(this).text();
            $('#inputSitioAsiento').val(sitioAsiento);

            // Actualiza el atributo data-nombre-obra del botón de compra
            $("#comprar").attr('data-nombre-obra', nombreObraBoton);
        });
    });

    
    // Comprar asiento con API
    $("#comprar").click(function (e) {
        e.preventDefault();

        // Obtener valores de los campos del formulario
        let usuario = $('#Usuario').text();
        let obra = $("#inputNombreObra").val();
        let asiento = $("#inputSitioAsiento").val();
        let precio = $("#inputPrecio").val();

        // Obtener el nombre de la obra directamente del botón de compra clickeado
        let nombreDeLaObra = $(this).attr('data-nombre-obra');
        console.log(nombreDeLaObra);

        // Realizar la solicitud al servidor
        $.ajax({
            url: 'http://localhost:3000/api/reservas/comprar',
            method: 'POST',
            data: { usuario, obra, asiento, precio },
            success: function (response) {
                if (response.mensaje === 'Reserva realizada') {

                    alert(response.mensaje);
                    $('button[data-nombre-obra="' + nombreDeLaObra + '"]').addClass('color-rojo');

                    // Guardar el estado actualizado después de realizar una reserva
                    estadoBotones[nombreDeLaObra] = 'color-rojo';
                    localStorage.setItem('estadoBotones', JSON.stringify(estadoBotones));
                } else {
                    alert(response.mensaje);
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
});
