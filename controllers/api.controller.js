const DaySave = require('../models/daySave');

exports.getAll = (req, res, next) => {
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
	const rangeArray = range.split('-');
	console.log(rangeArray[0]);
	console.log(rangeArray[1]);
	// use rangeArray to find the start and end and then return the JSON back to the user
}