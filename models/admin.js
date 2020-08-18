const client = require('../db');

class Admin {
    constructor(id, full_name, username, email, password) {
        this.id = parseInt(id, 10);
        this.full_name = full_name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.issuper = false;
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

    static getUserStats(by) {
        var select = 'EXTRACT(YEAR FROM created_at) AS yy';
        var groupBy = 'yy';

        if (by == 'month') {
            select += ',EXTRACT(MONTH FROM created_at) AS mm';
            groupBy += ',mm';
        } else if (by == 'day') {
            select += ',EXTRACT(MONTH FROM created_at) AS mm,EXTRACT(DAY FROM created_at) AS dd';
            groupBy += ',mm,dd';
        }

        select += ',COUNT(id) AS count_user';

        return {
            text: 'SELECT ' + select + ' FROM users GROUP BY ' + groupBy + ' ORDER BY ' + groupBy
        }
    }

    static getNoteStats() {
        return {
            text: 'SELECT created_at, COUNT(id) as count_note'+
            ' FROM notes GROUP BY created_at ORDER BY created_at'
        }
    }
}

module.exports = Admin;