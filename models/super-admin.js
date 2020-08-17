const client = require('../db');
const Admin = require('./admin');

class SuperAdmin extends Admin {
    static getAdmin() {
        return {
            text: 'SELECT * FROM admin WHERE issuper = false'
        }
    }
}

module.exports = SuperAdmin;