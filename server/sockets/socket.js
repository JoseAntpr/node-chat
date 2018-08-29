const { io } = require('../server');
const { Users } = require('../classes/users');

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

    client.on('disconnect', () => {
        let deletedUser = users.deleteUser( client.id );

        console.log(deletedUser);

        client.broadcast.emit('createMessage', { user: 'Admin', message: `${deletedUser.name} abandono el chat`});

        client.broadcast.emit('userList', users.getUsers());
    });


});