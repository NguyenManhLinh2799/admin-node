const SuperAdmin = require('../models/super-admin');
const client = require('../db');

// manage admin
exports.manageAdmin = (req, res) => {
	var query = SuperAdmin.getAdmins();
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			res.render('manage-admin', { user: req.user, admins: result.rows });
		}
	});
}

// create admin
exports.createAdmin = (req, res) => {
	var query = SuperAdmin.createAdmin(req.body.full_name, req.body.username, req.body.email, req.body.password);
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			req.flash('success_msg', 'Tạo Admin thành công');
			res.redirect('/create-admin');
		}
	});
}