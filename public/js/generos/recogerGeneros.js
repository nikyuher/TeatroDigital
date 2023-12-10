document.addEventListener('DOMContentLoaded', function () {

    /* Obtiene la clase y data-genero dentro de la clase puesta */
    $('.cargarContenido').click(function (e) {
        e.preventDefault();
        let genero = $(this).data('genero');
        let clase = $(this).parent().attr('class');

        /* Modifica la URL para incluir los parámetros establecidos */
        let nuevaURL = $(this).attr('href') + '?clase=' + clase + '&genero=' + genero;

        /* Redirige a la nueva URL */
        window.location.href = nuevaURL;
    });

    /* Verificar si hay parámetros en la URL */
    let params = new URLSearchParams(window.location.search);
    let clase = params.get('clase');
    let genero = params.get('genero');

    /* Si hay parámetros, actualizar el contenido del div */
    if (clase && genero) {
        $('.tituloGeneroSelec h1').text(genero);
        $('.contenedorObras').html('<div class="contenedorObras ' + clase + '" data-genero="' + genero + '"><div class="contenedorGeneros"></div></div>');
    }
});
