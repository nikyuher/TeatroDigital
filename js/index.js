$(document).ready(function () {
    // Recupera el nombre del usuario almacenado en sessionStorage
    var nombreUsuario = sessionStorage.getItem('nombreUsuario');

    // Verifica si hay un nombre de usuario almacenado
    if (nombreUsuario) {
        // Muestra el nombre del usuario en la página Index.html
        $('.Usuario').text(nombreUsuario);
    }
});