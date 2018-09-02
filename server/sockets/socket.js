const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();


io.on('connection', (client) => {

    client.on('openChat', ( user, callback ) => {
        console.log(user);
        if( !user.name || !user.sala ) {
            return callback({
                error: true,
                message: 'Name/Sala is required'
            });
        }

        client.join(user.sala);

        let usersArray = users.addUser( client.id, user.name );

        client.broadcast.emit('userList', users.getUsers());

        callback(usersArray);
    });


    client.on('createMessage', (data) => {

        let user = users.getUser(client.id);

        let message = createMessage( user.name, data.message);

        client.broadcast.emit('createMessage', message);

    });

    client.on('disconnect', () => {
        let deletedUser = users.deleteUser( client.id );

        client.broadcast.emit('createMessage', createMessage('Admin', `${deletedUser.name} salió`));

        client.broadcast.emit('userList', users.getUsers());
    });

    // Privates messages
    client.on('privateMessage', (data) => {
        let user = users.getUser( client.id );

        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));


    });


});