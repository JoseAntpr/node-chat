

class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, sala ){
        let user = { id, name, sala };

        this.users.push(user);

        return this.users;
    }

    getUser( id ) {
        let user = this.users.filter( u => {
            return u.id == id;
        })[0];

        return user;
    }

    getUsers() {
        return this.users;
    }

    getUsersRoom ( room ) {
        // TODO
    }

    deleteUser( id ) {

        let deletedUser = this.getUser(id);

        this.users = this.users.filter( u => {
            return u.id != id;
        });

        return deletedUser;
    }
    
}

module.exports = {
    Users
}