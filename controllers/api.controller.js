const DaySave = require('../models/daySave');

exports.getAll = (req, res, next) => {
	// return all results
	DaySave.find().then(items => {
		if (items == null) {
			res.status(500).send('The db is null for some reason');
		} else {
			res.status(200).send(items);
		}
	});
}

exports.getRange = (req, res, next) => {
	const range = req.params.id;
	const rangeArray = range.split('$');

	const firstDate = rangeArray[0].split('-');
	const secondDate = rangeArray[1].split('-');

	// format YEAR-MM-DD$YEAR-MM-DD
	// 2018-10-21$2019-10-21

	DaySave.find({
			"createdAt": {
				"$gte": new Date(firstDate[0], firstDate[1] - 1, firstDate[2]),
				"$lt": rangeArray[1] != undefined ? new Date(secondDate[0], secondDate[1] - 1, secondDate[2]) : new Date(2020, 1, 10)
			}
		}).then(items => {
			if (items == null) {
				res.status(500).send('The db is null for some reason');
			} else {
				res.status(200).send(items);
			}
		})
		.catch(err => console.log(err));
}