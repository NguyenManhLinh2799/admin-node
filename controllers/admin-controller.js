const passport = require('passport');
const Admin = require('../models/admin');
const client = require('../db');

// login
exports.login = (req, res, next) => {
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

// profile
exports.profile = (req, res) => {
	var admin = new Admin(req.user.id, req.user.username, req.user.password, req.user.fullname, req.user.email);
	var query = admin.getProfile();
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			var profile = result.rows[0];
			res.render('profile', { user: req.user, profile: profile });
		}
	});
}
