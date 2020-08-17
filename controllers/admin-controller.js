const client = require('../db');
const passport = require('passport');

// manage admin
exports.manageAdmin = (req, res) => {
	client.connect();

	client.query('SELECT * FROM admin WHERE issuper = false', (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			console.log(result.rows);
			res.render('manage-admin', { admins: result.rows });
		}
		client.end();
	});
}

// login
exports.login = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })(req, res, next);
}

// logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
}
