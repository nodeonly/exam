var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Surveychema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    desc: { type: String},
    questions: { type: String},
    all: { type: String },
		create_at  :  { type: Date, default: Date.now }
});


module.exports = mongoose.model('Survey', Surveychema);