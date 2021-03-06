var socket = io();

var params = new URLSearchParams( window.location.search );

if ( !params.has('name') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error( 'El  nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('openChat', user, function( resp ) {
        renderUsers(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('createMessage', function(message) {

    renderMessages(message, false);

});

// Listen when user log in and logout to chat
socket.on('userList', function( users ) {
    renderUsers(users);
});

// privates message
socket.on('privateMessage', function( message ){
    console.log('Mensaje privado', message);
});