const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');
const client = require('../db');
client.connect();

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, cb) => {
        var query = Admin.login(username);
        client.query(query, (err, result) => {
            if (err) {
                return cb(err)
            } else {
                const first = result.rows[0];
                cb(null, {
                    id: first.id,
                    username: first.username,
                    password: first.password,
                    fullname: first.fullname,
                    email: first.email,
                    issuper: first.issuper
                });
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        client.query('SELECT * FROM admin WHERE id = $1', [parseInt(id, 10)], (err, results) => {
            if (err) {
                return cb(err)
            }

            cb(null, results.rows[0])
        })
    })
}