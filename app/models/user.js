var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var schema = new mongoose.Schema({
  display_name: String,
	user_name: {type:String,index: { unique: true}},
	password: String,
	desc:String,
	create_at  :  { type: Date, default: Date.now }
});

schema.pre('save', function(next) {
	console.log('user -save pre action...');

	var user = this;

  //产生密码hash当密码有更改的时候(或者是新密码)
  if (!user.isModified('password')) return next();

  // 产生一个salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		console.log(user.password + '=erro='+err);
    if (err) return next(err);

    //  结合salt产生新的hash
    bcrypt.hash(user.password, salt, function(err, hash) {
				console.log(hash + '---erro='+err);
        if (err) return next(err);
				
				console.log('new hash  hash = ' + hash);
        // 使用hash覆盖明文密码
        user.password = hash;
        next();
    });
  });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

schema.methods.findByName = function(cb){
  return this.model('UserModel').find({user_name:this.user_name},cb);
}

schema.methods.is_exist = function(cb){
	return this.model('UserModel').findOne({ user_name:this.user_name,password:this.password }, cb);
}

var UserModel = mongoose.model('UserModel', schema)

module.exports = {
	schema:schema,
	model:UserModel
}