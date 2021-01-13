const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    givenName: {
        type: String,
        default: ''
    },
    familyName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    googleId: String,
    admin: {
        type: Boolean,
        default: false
    }
});

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;