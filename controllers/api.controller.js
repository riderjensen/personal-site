const DaySave = require('../models/daySave');

exports.getAll = (req, res, next) => {
	newDay.save().then(result => {
		DaySave.find().then(items => {
			if (items == null) {
				res.status(500).send('The db is null for some reason');
			} else {
				res.status(200).send(items);
			}
		});
	})
}