const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();


io.on('connection', (client) => {

    client.on('openChat', ( user, callback ) => {
        if( !user.name ) {
            return callback({
                error: true,
                message: 'Name is required'
            });
        }

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

        console.log(deletedUser);

        client.broadcast.emit('createMessage', createMessage('Admin', `${deletedUser.name} salió`));

        client.broadcast.emit('userList', users.getUsers());
    });


});