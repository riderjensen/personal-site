const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
	items: {
		type: Object,
		required: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('DaySave', daySchema);