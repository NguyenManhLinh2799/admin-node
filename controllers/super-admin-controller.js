const client = require('../db');

// manage admin
exports.manageAdmin = (req, res) => {
	client.query('SELECT * FROM admin WHERE issuper = false', (err, result) => {
		if (err) {
			console.log(err.stack);
		} else {
			res.render('manage-admin', { admins: result.rows });
		}
	});
}