const DaySave = require('../models/daySave');

exports.getAll = (req, res, next) => {
	// return all results
	DaySave.find().limit(100).then(items => {
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


exports.findOne = (req, res, next) => {
	const theId = req.params.id;

	if (theId != null) {
		DaySave.findById(theId).then(item => {
			res.status(201).send(item);
		})
	} else {
		res.status(500).send({
			message: 'Missing items you want to update'
		});
	}


}

exports.editOne = (req, res, next) => {
	// get the id and edit the information
	const theId = req.params.id;

	const newItems = req.body.items;


	if (newItems != null || newItems != undefined) {
		DaySave.findOneAndUpdate(theId, {
			items: newItems,
		}).then(item => {
			res.status(201).send(item);
		})
	} else {
		res.status(500).send({
			message: 'Missing items you want to update'
		});
	}

}

exports.deleteOne = (req, res, next) => {
	// get the id and delete the one
	const theId = req.params.id;
	DaySave.findByIdAndDelete(theId).then(response => {
		if (!response) {
			return res.status(500).send({
				message: 'Error in deleting'
			});
		}
		res.status(200).send(response);
	});

}


exports.createOne = (req, res, next) => {
	// get the id and delete the one
	const newItems = req.body.items;
	let myNewItem;
	if (newItems) {
		myNewItem = new DaySave({
			items: newItems
		});
	} else {
		myNewItem = new DaySave({
			items: {}
		});
	}
	myNewItem.save().then(response => {
		if (!response) {
			return res.status(500).send({
				message: 'Error in creating'
			});
		}
		res.status(201).send(response);
	});
}