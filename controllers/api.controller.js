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
		}).then(returns => {
			if (returns == null) {
				res.status(500).send('The db is null for some reason');
			} else {
				let newObject = {};
				for (let i = 0; i < returns.length; i++) {
					for (let property in returns[i].items) {
						if (newObject[property]) {
							newObject[property].com += returns[i].items[property]['com'];
							newObject[property].found += returns[i].items[property]['found'];
						} else {
							newObject[property] = returns[i].items[property];
						}

					}
				}

				let dataArray = [];

				for (let property in newObject) {
					let addObject = {
						label: property,
						y: newObject[property]['com'] / newObject[property]['found']
					};
					dataArray.push(addObject);
				}


				res.status(200).send(dataArray);
			}
		})
		.catch(err => console.log(err));
}
