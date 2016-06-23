// app/models/user.js
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        index: {
            unique: true
        }
    },
    password: {
        type: String, 
        required: true
    },
    roles: [String],
    token: String,
    created: Date,
    updated: Date
});

function md5(msg) {
    return crypto.createHash('md5').update(msg).digest('hex');
}

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.created) {
        user.created = new Date();
    } else {
        user.updated = new Date();
    }
    if (!user.isModified('password')) {
        return next();
    }
    user.password = md5(user.password);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    if (cb && typeof cb === 'function') {
        return cb(md5(this.password) === md5(candidatePassword));
    }
};

var User =  mongoose.modle('users', UserSchema);
module.exports = User;
