const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();


io.on('connection', (client) => {

    client.on('openChat', ( user, callback ) => {
        if( !user.name || !user.sala ) {
            return callback({
                error: true,
                message: 'Name/Sala is required'
            });
        }

        client.join(user.sala);

        let usersArray = users.addUser( client.id, user.name, user.sala );

        client.broadcast.to(user.sala).emit('userList', users.getUsersRoom(user.sala));
        client.broadcast.to(user.sala).emit('createMessage', createMessage('Admin', `${user.name} se unió`));
        
        callback(users.getUsersRoom(user.sala));
    });


    client.on('createMessage', (data, callback) => {

        let user = users.getUser(client.id);

        let message = createMessage( user.name, data.message);

        client.broadcast.to(user.sala).emit('createMessage', message);

        callback( message );
    });

    client.on('disconnect', () => {

        console.log('disconnect all users',users.getUsers());

        console.log( 'disconnect client id', client.id );
        let deletedUser = users.deleteUser( client.id );
        console.log('User borrar', deletedUser);

        client.broadcast.to(deletedUser.sala).emit('createMessage', createMessage('Admin', `${deletedUser.name} salió`));

        client.broadcast.to(deletedUser.sala).emit('userList', users.getUsersRoom(deletedUser.sala));
    });

    // Privates messages
    client.on('privateMessage', (data) => {
        let user = users.getUser( client.id );

        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));


    });


});