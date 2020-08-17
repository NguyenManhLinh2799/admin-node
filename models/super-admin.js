const client = require('../db');
const Admin = require('./admin');

class SuperAdmin extends Admin {
    static getAdmins() {
        return {
            text: 'SELECT * FROM admins WHERE issuper = false'
        }
    }

    static createAdmin(full_name, username, email, password) {
        return {
            text: 'INSERT INTO admins(full_name, username, email, password, issuper)'+
            ' VALUES($1, $2, $3, $4, $5)',
            values: [full_name, username, email, password, false]
        }
    }
}

module.exports = SuperAdmin;