var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator')


var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
    })
]

var emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isEmail',
        passIfEmpty: true,
        message: 'Email not valid',
    })
]

var passValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'password should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]


var UserSchema = new Schema({
    id: { type: String},
    photo: { type: String},
    username: { type: String, required: true, validate: nameValidator },
    password: { type: String, validate: passValidator},
    email: { type: String, lowercase: true, unique: true, validate: emailValidator  },
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.plugin(titlize, {
    paths: [ 'username' ]
});

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
    })
]

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
