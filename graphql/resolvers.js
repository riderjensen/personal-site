const DaySave = require('../models/daySave');

module.exports = {
	hello: async () => {
		return {
			text: 'Zip',
			number: 69
		}
	},
	getNames: async () => {
		const resp = await DaySave.find();
		console.log(resp[0].items['r/zoop'])
		return resp.map(item => item)
	}
};