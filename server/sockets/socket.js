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

        callback(usersArray);
    });


});