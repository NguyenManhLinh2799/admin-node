const SuperAdmin = require('../models/super-admin');
const client = require('../db');

// manage admin
exports.manageAdmin = (req, res) => {
	var query = SuperAdmin.getAdmin();
	client.query(query, (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			res.render('manage-admin', { user: req.user, admins: result.rows });
		}
	});
}