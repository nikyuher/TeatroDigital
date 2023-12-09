document.addEventListener('DOMContentLoaded', function () {

    /*Busca en todos los section que tengan caracteristicas señaladas*/
    $('section').each(function () {

        const contenedorGeneros = $(this).find('.contenedorGeneros');
        const genero = $(this).find('[data-genero]').data('genero');


        obtenerObrasPorGenero(genero, contenedorGeneros);
    });

    /*Ajax para mostrar las obras por su genero con uso de la api*/
    function obtenerObrasPorGenero(genero, resultadoDiv) {

        $.ajax({
            url: `http://localhost:3000/api/obrasTeatro/${genero}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                mostrarObras(data, resultadoDiv);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    /*Mostrar las obras*/
    function mostrarObras(data, resultadoDiv) {

        resultadoDiv.empty();

        if (data.obrasTeatro && data.obrasTeatro.length > 0) {
            
            data.obrasTeatro.forEach(obra => {

                const obraDiv = $(`<div class="cajaGenero" data-nombre="${obra.nombre}">`);

                obraDiv.html(`
                    <a href="comprar.html">
                    <img src="../imagenes/obras/${obra.imagen}" alt="${obra.nombre}">
                    <p>${obra.nombre}</p>
                    <p>${obra.descripcion}</p>
                    <p>Precio: € ${obra.precio}</p>
                    </a>
                `);
                resultadoDiv.append(obraDiv);
            });
        } else {
            resultadoDiv.text(data.mensaje);
        }
    }

});