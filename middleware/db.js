const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: String,
    phone: Number,
    email: String,
    password: String,
    location: String
})

const User = mongoose.model("User", UserSchema)

module.exports = User