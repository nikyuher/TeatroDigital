document.addEventListener('DOMContentLoaded', function () {
    $('.cargarContenido').click(function (e) {
        e.preventDefault();
        var genero = $(this).data('genero');
        var clase = $(this).parent().attr('class');

        // Modificar la URL para incluir los parámetros de clase y data-genero
        var nuevaURL = $(this).attr('href') + '?clase=' + clase + '&genero=' + genero;

        // Redirigir a la nueva URL
        window.location.href = nuevaURL;
    });

    // Verificar si hay parámetros en la URL
    var params = new URLSearchParams(window.location.search);
    var clase = params.get('clase');
    var genero = params.get('genero');

    // Si hay parámetros, actualizar el contenido del div
    if (clase && genero) {
        $('.tituloGeneroSelec h1').text(genero);
        $('.contenedorObras').html('<div class="contenedorObras ' + clase + '" data-genero="' + genero + '"><div class="contenedorGeneros"></div></div>');
    }
});