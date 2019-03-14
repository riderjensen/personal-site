const DaySave = require('../models/daySave');

module.exports = {
	getAllItems: async () => {
		const resp = await DaySave.find()

		const newArray = [];

		for (let i = 0; i < resp.length; i++) {
			if (resp[i].items != undefined) {
				const obj = {
					id: resp[i]._id,
					updatedAt: resp[i].updatedAt,
					createdAt: resp[i].createdAt,
					items: {}
				}
				for (let item in resp[i].items) {
					obj.items[item.split('/')[1]] = {
						...resp[i].items[item]
					}
				}
				newArray.push(obj)
			}
		}
		return newArray;
	},
	getOneById: async (args) => {
		const resp = await DaySave.findById(args.id)
		if (!resp) throw new error('We cant find an item in the DB with this ID');
		let newObj = {
			id: resp._id,
			createdAt: resp.createdAt,
			updatedAt: resp.updatedAt,
			items: {}
		};
		for (let item in resp.items) {
			newObj.items[item.split('/')[1]] = resp.items[item]
		}
		return newObj;
	},
	getSubName: async (args) => {
		const subName = `r/${args.name}`;
		const newObj = {
			com: 0,
			found: 0
		};
		const resp = await DaySave.find()
		for (let i = 0; i < resp.length; i++) {
			if (resp[i].items != undefined && resp[i].items[subName] != undefined) {
				newObj.com += resp[i].items[subName].com;
				newObj.found += resp[i].items[subName].found;
			}
		}
		return newObj
	},
	getRange: async (args) => {
		const resp = await DaySave.find({
			"createdAt": {
				"$gte": new Date(parseInt(args.start)),
				"$lt": args.end != undefined ? new Date(parseInt(args.end) + 1) : new Date(2020, 1, 10)
			}
		})

		const newArray = [];

		for (let i = 0; i < resp.length; i++) {
			if (resp[i].items != undefined) {
				const obj = {
					id: resp[i]._id,
					updatedAt: resp[i].updatedAt,
					createdAt: resp[i].createdAt,
					items: {}
				}
				for (let item in resp[i].items) {
					obj.items[item.split('/')[1]] = {
						...resp[i].items[item]
					}
				}
				newArray.push(obj)
			}
		}
		return newArray;
	},
	getCombinedRange: async (args) => {
		const resp = await DaySave.find({
			"createdAt": {
				"$gte": new Date(parseInt(args.start)),
				"$lt": args.end != undefined ? new Date(parseInt(args.end) + 1) : new Date(2020, 1, 10)
			}
		}).limit(100)
		const obj = {
			items: {

			}
		}

		for (let i = 0; i < resp.length; i++) {
			if (resp[i] !== undefined && resp[i].items !== undefined) {
				for (let item in resp[i].items) {
					if (resp[i].items[item] !== null) {
						if (obj.items[item.split('/')[1]] === null || obj.items[item.split('/')[1]] == undefined) {
							obj.items[item.split('/')[1]] = {
								com: 0,
								found: 0
							}
						} else {
							obj.items[item.split('/')[1]].com += resp[i].items[item].com === null ? 0 : resp[i].items[item].com
							obj.items[item.split('/')[1]].found += resp[i].items[item].found === null ? 0 : resp[i].items[item].found
						}
					}
				}
			}
		}
		return obj;

	},
	deleteDataPoint: async (args) => {
		const resp = await DaySave.findByIdAndDelete(args.id);
		return resp ? true : false;
	},
	deleteSubDataPoint: async (args) => {
		const resp = await DaySave.findById(args.id);
		if (!resp) return false;
		delete resp.items[`r/${args.sub}`];
		resp.markModified('items');
		const saveResp = await resp.save();
		return saveResp ? true : false;
	},
	createNewItem: async () => {
		const newItem = new DaySave({
			items: {}
		});
		newItem.items['r/funny'] = {
			com: 0,
			found: 0
		}
		newItem.markModified('items');
		const resp = await newItem.save();
		return resp;
	},
	editItem: async (args) => {
		const resp = await DaySave.findById(args.id);
		if (!resp) throw new Error('Cant find this item in the DB, try a different ID');
		resp.items === undefined ? resp.items = {} : null;
		if (resp.items.hasOwnProperty(`r/${args.sub}`)) {
			resp.items[`r/${args.sub}`].com += args.completedFound.com;
			resp.items[`r/${args.sub}`].found += args.completedFound.found;
		} else {
			resp.items[`r/${args.sub}`] = args.comFound
		}
		resp.markModified('items');
		const saveResp = await resp.save();
		return saveResp ? true : false;
	}
};