const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: { type: String, unique: true },
    password: String,
    active: Boolean,
    token: String
});

module.exports = {
    UserModel: mongoose.model('User', UserSchema)
};
