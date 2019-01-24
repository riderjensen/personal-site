const DaySave = require('../models/daySave');

exports.getAll = (req, res, next) => {
	DaySave.find({}, (items) => {
		console.log(items);
		res.send(items);
	});

}