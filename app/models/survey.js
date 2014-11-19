var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Surveychema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    desc: { type: String},
    questions: { type: String},
    all: { type: String },
		static_page_name: { type: String },
		create_at  :  { type: Date, default: Date.now }
});

// expose enum on the model, and provide an internal convenience reference 
var reasons = Surveychema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

Surveychema.statics.find_list = function(conditions, cb) {
	this.find (conditions, function(err,surveys){
    if (err) return cb(err);

    // make sure the user exists
    if (!surveys) {
        return cb(null, null, reasons.NOT_FOUND);
    }
		
		cb(surveys);
	});
}
/**
 * 更新生成试卷信息到试卷表
 */ 
Surveychema.statics.update_static_page_name_by_name = function(static_page_name, survey_name, cb) {
    this.findOne({ name: survey_name }, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

				user.static_page_name = static_page_name
				user.save(cb);        
    });
};



module.exports = mongoose.model('Survey', Surveychema);