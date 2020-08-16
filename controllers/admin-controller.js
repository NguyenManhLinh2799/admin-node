const client = require('../db/index');

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