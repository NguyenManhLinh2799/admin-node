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

    static changeProfile(fullname, email, username) {
        return {
            text: 'UPDATE admin SET fullname = $1, email = $2 WHERE username = $3',
            values: [fullname, email, username]
        }
    }

    static changePassword(newPassword, id) {
        return {
            text: 'UPDATE admin SET password = $1 WHERE id = $2',
            values: [newPassword, parseInt(id, 10)]
        }
    }
}

module.exports = Admin;