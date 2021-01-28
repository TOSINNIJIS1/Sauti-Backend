const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    fname: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: Number, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        validate: [emailValidator, 'incorrect email format']
    },
    password: { 
        type: String,
        required: true
    },
    location: String

})

function emailValidator (value) {
    return /^.+@.+\..+$/.test(value)
}

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next();

    } catch (error) {
        next (error);
    }
}) 

userSchema.methods.isPasswordValid = async function (value) {
    try {
        return await bcrypt.compare(value, this.password)

    } catch (error) {
        throw new Error(error)
    }
}


const User = mongoose.model("User", userSchema)

module.exports = User