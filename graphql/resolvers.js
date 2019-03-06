const DaySave = require('../models/daySave');

module.exports = {
	getNames: async () => {
		const resp = await DaySave.find();
		return resp.map(item => item)
	},
	getOneById: async (args) => {
		const resp = await DaySave.findById(args.id);
		if (!resp) throw new error('We cant find an item in the DB with this ID');
		return resp;
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
		const theSub = `r/${args.sub}`;

		const resp = await DaySave.find({
			"createdAt": {
				"$gte": new Date(parseInt(args.start)),
				"$lt": args.end != undefined ? new Date(parseInt(args.end) + 1) : new Date(2020, 1, 10)
			}
		})

		const newArray = [];

		for (let i = 0; i < resp.length; i++) {
			if (resp[i].items != undefined && resp[i].items[theSub] != undefined) {
				const obj = {
					com: resp[i].items[theSub].com,
					found: resp[i].items[theSub].found
				}
				newArray.push(obj)
			}
		}
		return newArray;
	},
	getCopmbinedRange: async (args) => {
		const theSub = `r/${args.sub}`;

		const resp = await DaySave.find({
			"createdAt": {
				"$gte": new Date(parseInt(args.start)),
				"$lt": args.end != undefined ? new Date(parseInt(args.end)) : new Date(2020, 1, 10)
			}
		})

		let newObject = {
			com: 0,
			found: 0
		};
		for (let i = 0; i < resp.length; i++) {
			if (resp[i].items != undefined && resp[i].items[theSub] != undefined) {
				newObject.com += resp[i].items[theSub].com
				newObject.found += resp[i].items[theSub].found
			}
		}
		return newObject
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
			console.log(resp.items)
		} else {
			resp.items[`r/${args.sub}`] = args.comFound
		}
		resp.markModified('items');
		const saveResp = await resp.save();
		return saveResp ? true : false;
	}
};


// sample queries

// query zipZap{
// 	getNames{
// 		id
// 		createdAt
// 	}
// }

// query getRange{
// 	getRange(start: "1551901377407" end: "1551901377407" sub: "funny") {
// 		com
// 		found
// 	}
// }

// query getCombined{
// 	getCopmbinedRange(start: "1551752554719" end: "1551761554799" sub: "funny") {
// 		com
// 		found
// 	}
// }

// query getOne{
// 	getOneById(id: "5c8022c1649be444bcc21cdb"){
// 		id,
// 			createdAt
// 	}
// }

// mutation deleteOne{
// 	deleteDataPoint(id: "5c8022c1649be444bcc21cdb")
// }

// mutation deleteSubOne{
// 	deleteSubDataPoint(id: "5c7de03ac7326e595bcc8cd1", sub: "news")
// }

// mutation createANewOne{
// 	createNewItem{
// 		id
// 	}
// }

// mutation editOne{
// 	editItem(id: "5c8022c1649be444bcc21cdb" sub: "funny" completedFound: {
// 		com: 10,
// 		found: 5
// 	})
// }