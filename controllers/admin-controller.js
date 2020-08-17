const passport = require('passport');
const Admin = require('../models/admin');

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
	res.render('profile', { user: req.user });
}
