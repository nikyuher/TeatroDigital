document.addEventListener('DOMContentLoaded', function () {
    $('.letraTextoGeneral').on('click', '.cajaGenero', function (e) {
        e.preventDefault();

        // Obtener el enlace (a) dentro del div
        var linkElement = $(this).find('a');

        // Obtener la URL base del enlace
        var urlBase = linkElement.attr('href');

        // Obtener el nombre de la obra desde el atributo data-nombre
        var nombreObra = $(this).data('nombre');

        // Construir la nueva URL agregando el parámetro 'obra'
        var nuevaURL = urlBase + '?obra=' + nombreObra;

        console.log('Nueva URL:', nuevaURL);

        // Redirigir a la nueva URL
        window.location.href = nuevaURL;
    });
    // Obtener el nombre de la obra de la URL
    var params = new URLSearchParams(window.location.search);
    var nombreObra = params.get('obra');

    // Realizar una solicitud a la API para obtener detalles de la obra
    $.ajax({
        url: `http://localhost:3000/api/obrasTeatro/nombre/${nombreObra}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Actualizar los elementos en comprar.html con los detalles de la obra
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
});
