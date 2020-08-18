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
	var admin = new Admin(req.user.id, req.user.username, req.user.password, req.user.full_name, req.user.email);
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

// change profile
exports.changeProfile = (req, res) => {
	var full_name = req.body.full_name;
	var email = req.body.email;
	var username = req.body.username;
	var query = Admin.changeProfile(full_name, email, username);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			req.flash('success_msg', 'Cập nhật hồ sơ thành công');
			res.redirect('/profile');
		}
	});
}

// change password
exports.changePassword = (req, res) => {
	var newPassword = req.body.new;
	var id = req.user.id;
	var query = Admin.changePassword(newPassword, id);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			req.flash('success_msg', 'Đổi mật khẩu thành công');
			res.redirect('/change-password');
		}
	});
}

// manage user
exports.manageUser = (req, res) => {
	var query = Admin.getUsers();
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			var users = result.rows;
			res.render('manage-user', { user: req.user, users: users });
		}
	});
}

// user info
exports.userInfo = (req, res) => {
	var query = Admin.getUser(req.params.id);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			var info = result.rows[0];
			res.render('info-user', { user: req.user, info: info });
		}
	});
}

// ban user
exports.banUser = (req, res) => {
	var query = Admin.ban(req.params.id);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			req.flash('success_msg', 'Tài khoản đã bị khóa');
			res.redirect('/info-user/' + req.params.id);
		}
	});
}

// unban user
exports.unbanUser = (req, res) => {
	var query = Admin.unban(req.params.id);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			req.flash('success_msg', 'Tài khoản đã được mở khóa');
			res.redirect('/info-user/' + req.params.id);
		}
	});
}

// user stats
exports.userStats = (req, res) => {
	var query = Admin.getUserStats(req.query.by);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			var stats = [];
			var sum = 0;
			for (var i = 0; i < result.rows.length; i++) {
				var stat = {}
				// Group by
				if (req.query.by == 'year') {
					stat.time = result.rows[i].yy;
				} else if (req.query.by == 'month') {
					stat.time = result.rows[i].mm + '/' + result.rows[i].yy;
				} else {
					stat.time = result.rows[i].dd + '/' + result.rows[i].mm + '/' + result.rows[i].yy;
				}
				// Count user
				stat.count_user = result.rows[i].count_user;
				// Sum user incremental
				sum += parseInt(result.rows[i].count_user);
				stat.sum = sum;
				// Push
				stats.push(stat);
			}
			res.render('stats-user', { user: req.user, stats: stats, by: req.query.by });
		}
	});
}

// user stats handle
exports.userStatsHandle = (req, res) => {
	res.redirect('/stats-user?by=' + req.body.by);
}

// note stats
exports.noteStats = (req, res) => {
	var query = Admin.getNoteStats(req.query.by);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			var stats = [];
			var sum = 0;
			for (var i = 0; i < result.rows.length; i++) {
				var stat = {}
				// Group by
				if (req.query.by == 'year') {
					stat.time = result.rows[i].yy;
				} else if (req.query.by == 'month') {
					stat.time = result.rows[i].mm + '/' + result.rows[i].yy;
				} else {
					stat.time = result.rows[i].dd + '/' + result.rows[i].mm + '/' + result.rows[i].yy;
				}
				// Count note
				stat.count_note = result.rows[i].count_note;
				// Sum note incremental
				sum += parseInt(result.rows[i].count_note);
				stat.sum = sum;
				// Push
				stats.push(stat);
			}
			res.render('stats-note', { user: req.user, stats: stats, by: req.query.by });
		}
	});
}

// note stats handle
exports.noteStatsHandle = (req, res) => {
	res.redirect('/stats-note?by=' + req.body.by);
}
