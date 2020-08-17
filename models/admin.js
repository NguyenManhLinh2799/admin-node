const client = require('../db');

class Admin {
    constructor(id, username, password, full_name, email) {
        this.id = parseInt(id, 10);
        this.username = username;
        this.password = password;
        this.full_name = full_name;
        this.email = email;
    }

    static login(username) {
        return {
            text: 'SELECT * FROM admins WHERE username = $1',
            values: [username]
        }
    }

    getProfile() {
        return {
            text: 'SELECT username, full_name, email FROM admins WHERE id = $1',
            values: [this.id]
        }
    }

    static changeProfile(full_name, email, username) {
        return {
            text: 'UPDATE admins SET full_name = $1, email = $2 WHERE username = $3',
            values: [full_name, email, username]
        }
    }

    static changePassword(newPassword, id) {
        return {
            text: 'UPDATE admins SET password = $1 WHERE id = $2',
            values: [newPassword, parseInt(id, 10)]
        }
    }

    static getUsers() {
        return {
            text: 'SELECT users.*, COUNT(*) AS count_note'+
            ' FROM users INNER JOIN usernote ON users.id = usernote."user"'+
            ' GROUP BY users.id'
        }
    }

    static getUser(id) {
        return {
            text: 'SELECT users.*, COUNT(*) AS count_note'+
            ' FROM users INNER JOIN usernote ON users.id = usernote."user"'+
            ' WHERE users.id = $1'+
            ' GROUP BY users.id',
            values: [parseInt(id, 10)]
        }
    }

    static ban(id) {
        return {
            text: "UPDATE users SET isbanned = true WHERE id = $1",
            values: [parseInt(id, 10)]
        }
    }

    static unban(id) {
        return {
            text: "UPDATE users SET isbanned = false WHERE id = $1",
            values: [parseInt(id, 10)]
        }
    }
}

module.exports = Admin;