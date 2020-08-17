const client = require('../db');

class Admin {
    constructor(id, username, password, fullname, email) {
        this.id = parseInt(id, 10);
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
    }

    static login(username) {
        return {
            text: 'SELECT * FROM admin WHERE username = $1',
            values: [username]
        }
    }

    getProfile() {
        return {
            text: 'SELECT username, fullname, email FROM admin WHERE id = $1',
            values: [this.id]
        }
    }
}

module.exports = Admin;