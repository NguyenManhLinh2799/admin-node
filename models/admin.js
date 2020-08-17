const client = require('../db');

class Admin {
    constructor(id, username, password, fullname, email, issuper) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.issuper = issuper;
    }

    static login(username) {
        client.query('SELECT * FROM admin WHERE username = $1', [username], (err, result) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(result.rows[0]);
                return result.rows[0]
            }
        })
    }

    getProfile() {
        client.query('SELECT * FROM admin WHERE id = $1', [this.id], (err, result) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(result.rows[0]);
            }
        });
    }
}

module.exports = Admin;