

class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name ){
        let user = { id, name };

        this.users.push(user);

        return this.users;
    }

    getUser( id ) {
        let user = this.users.filter( u => {
            return u.id = id;
        })[0];

        return person;
    }

    getUsers() {
        return this.users;
    }

    getUsersRoom ( room ) {
        // TODO
    }

    deleteUser( id ) {

        let deletedUser = this.getUser(id);

        this.users.filter( u => {
            return u.id != id;
        });

        return deletedUser;
    }
    
}

module.exports = {
    Users
}