const client = require('../db');
const Admin = require('./admin');

class SuperAdmin extends Admin {
    static getAdmin() {
        return {
            text: 'SELECT * FROM admins WHERE issuper = false'
        }
    }
}

module.exports = SuperAdmin;