var socket = io();

var params = new URLSearchParams( window.location.search );

if ( !params.has('name')) {
    window.location = 'index.html';
    throw new Error( 'El  nombre es necesario');
}

var user = {
    name: params.get('name')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('openChat', user, function( resp ) {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('createMessage', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Listen when user log in and logout to chat
socket.on('userList', function( users ) {
    console.log(users);
});

// privates message
socket.on('privateMessage', function( message ){
    console.log('Mensaje privado', message);
});