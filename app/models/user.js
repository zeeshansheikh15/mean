var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    id: { type: String},
    photo: { type: String},
    username: { type: String, lowercase: true, required: true},
    password: { type: String},
    email: { type: String, lowercase: true, unique: true },
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
